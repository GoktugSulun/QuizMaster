import express from 'express';
import AuthController from '../controllers/AuthController.ts';

const app = express();

// Get authenticated user
app.get('/', AuthController.get);

// Edit authenticated user
app.put('/', AuthController.edit);

// Login
app.post('/login', AuthController.login);

// Register
app.post('/register', AuthController.register);

export default app;  