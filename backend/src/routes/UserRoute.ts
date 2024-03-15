import express from 'express';
import UserService from '../services/UserService.ts';

const app = express();

// Login
app.post('/login', UserService.login);

// Register
app.post('/register', UserService.register);

export default app;  