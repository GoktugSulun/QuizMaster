import express from 'express';
import QuestionController from '../controllers/QuestionController.ts';
import AuthMiddleware from '../middlewares/AuthMiddleware.ts';

const app = express();

// Create
app.post('/', AuthMiddleware, QuestionController.create);

// Edit
app.put('/:quizId', AuthMiddleware, QuestionController.edit);

export default app;  