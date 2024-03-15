import express from 'express';
import AuthController from '../controllers/AuthController.ts';

const app = express();

// Get
app.get('/', AuthController.get);

// Login
app.post('/login', AuthController.login);

// Register
app.post('/register', AuthController.register);

export default app;  