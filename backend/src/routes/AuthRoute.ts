import express from 'express';
import AuthController from '../controllers/AuthController.ts';
import MulterMiddleware from '../middlewares/MulterMiddleware.ts';
import AuthMiddleware from '../middlewares/AuthMiddleware.ts';
import { GenerateUuidMiddleware } from '../middlewares/index.ts';

const app = express();

// Get authenticated user
app.get('/', AuthController.get);

// Edit authenticated user
app.put('/:id', AuthMiddleware(), GenerateUuidMiddleware, MulterMiddleware.single('files'), AuthController.edit);

// Login
app.post('/login', AuthController.login);

// Register
app.post('/register', AuthController.register);

export default app;  