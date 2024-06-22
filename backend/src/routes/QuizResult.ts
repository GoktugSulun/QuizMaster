import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware.ts';
import QuizResultController from '../controllers/QuizResultController.ts';

const app = express();

// Get
app.get('/all/:id', AuthMiddleware, QuizResultController.getAll);
app.get('/:id', AuthMiddleware, QuizResultController.getById);

export default app;  