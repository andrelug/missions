import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import db from './../models/index.js';
import passport from 'passport';
import config from './variables';
import func from './functions';

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.User.findOne({ 'email.primary' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {

                const newUser = new db.User({
            		'email.primary': email
            	});

                newUser.password = newUser.generateHash(password);

                newUser.save().then((successUser) => {
                    return done(null, successUser);
            	}).catch((err) => {
                    if (err)
                        throw err;
                    return done(null, false);
            	});
            }

        });

    });

}));


passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    db.User.findOne({ 'email.primary' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });

}));

passport.use(new FacebookStrategy({

    clientID        : config.auth.facebook.clientID,
    clientSecret    : config.auth.facebook.clientSecret,
    callbackURL     : config.auth.facebook.callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'email', 'first_name', 'last_name', 'gender', 'picture', 'cover', 'locale']

},
// facebook will send back the token and profile
function(req, token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {
        console.log('profile: ' + JSON.stringify(profile))
        if(!req.user) {
            // find the user in the database based on their facebook id
            db.User.findOne({ $or: [{ 'social.facebook.id': profile.id }, { 'email.primary': profile.emails[0].value }] }, function(err, user) {
                // if there is an error, stop everything and return that
                if (err)
                    return done(err);
                // if the user is found, then log them in
                if (user) {
                    // update the current users facebook credentials
                    if(!user.social.id) {
                        user.social.facebook.id    = profile.id;
                    }
                    if(!user.social.facebook.token) {
                        user.social.facebook.token = token;
                    }
                    if(!user.social.facebook.url) {
                        user.social.facebook.url = "https://facebook.com/" + profile.id;
                    }
                    if(!user.email.primary !== profile.emails[0].value) {
                        user.email.others = [];
                        user.email.others.push(profile.emails[0].value)
                    }
                    if(!user.name.first) {
                        user.name.first = profile.name.givenName;
                    }
                    if(!user.name.last) {
                        user.name.last = profile.name.familyName;
                    }
                    if(!user.gender) {
                        user.gender = profile.gender;
                    }
                    if(!user.photo) {
                        user.photo = "http://graph.facebook.com/" + profile.id + "/picture?type=large";
                    }
                    if(!user.name.parsed) {
                        user.name.parsed = func.string_to_slug(profile.name.givenName + ' ' + profile.name.familyName);
                    }

                    user.save().then((successUser) => {
                        return done(null, successUser);
                    }).catch((err) => {
                        if (err)
                            throw err;
                        return done(null, false);
                    });
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new db.User();

                    // set all of the facebook information in our user model
                    newUser.social.facebook.id = profile.id; // set the users facebook id
                    newUser.social.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.social.facebook.url = "https://facebook.com/" + profile.id;

                    // General profile related
                    newUser.name.first = profile.name.givenName;
                    newUser.name.last = profile.name.familyName;
                    newUser.email.primary = profile.emails[0].value;
                    newUser.gender = profile.gender;
                    newUser.name.parsed = func.string_to_slug(profile.name.givenName + ' ' + profile.name.familyName);
                    newUser.photo = "http://graph.facebook.com/" + profile.id + "/picture?type=large";

                    newUser.save().then((successUser) => {
                        return done(null, successUser);
                	}).catch((err) => {
                        if (err)
                            throw err;
                        return done(null, false);
                	});
                }
            });
        } else {
            // user already exists and is logged in, we have to link accounts
            var user            = req.user; // pull the user out of the session

            // update the current users facebook credentials
            user.social.facebook.id    = profile.id;
            user.social.facebook.token = token;
            user.social.facebook.url = "https://facebook.com/" + profile.id;

            if(user.email.primary !== profile.emails[0].value) {
                user.email.others = [];
                user.email.others.push(profile.emails[0].value)
            }
            if(!user.name.first) {
                user.name.first = profile.name.givenName;
            }
            if(!user.name.last) {
                user.name.last = profile.name.familyName;
            }
            if(!user.gender) {
                user.gender = profile.gender;
            }
            if(!user.photo) {
                user.photo = "http://graph.facebook.com/" + profile.id + "/picture?type=large";
            }
            if(!user.name.parsed) {
                user.name.parsed = func.string_to_slug(profile.name.givenName + ' ' + profile.name.familyName);
            }

            user.save().then((successUser) => {
                return done(null, successUser);
            }).catch((err) => {
                if (err)
                    throw err;
                return done(null, false);
            });
        }
    });
}));

export default passport;
