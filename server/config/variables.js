const config = {};

config.db = 'mongodb://localhost:27017/missions';

config.auth = {
    facebook: {
        'clientID'      : '299433410536125', // your App ID
        'clientSecret'  : '62c5703e20a2298dd12f0bfa089ecc97', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    }
}

export default config;
