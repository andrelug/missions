import express from 'express';
import path from 'path';

// Controllers Imports
import basicController from './controllers/basicController';
import userController from './controllers/userController';
import postController from './controllers/postController';

const api = express();

// User api
api.post('/signup', userController.post);

// Post api
api.post('/post', postController.post);

export default api;
