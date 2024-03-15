import express from 'express';
import UserController from '../controllers/UserController.ts';

const app = express();

// Get
app.get('/', UserController.get);

// Login
app.post('/login', UserController.login);

// Register
app.post('/register', UserController.register);

export default app;  