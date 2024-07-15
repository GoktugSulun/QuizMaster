import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware.ts';
import QuizSessionController from '../controllers/QuizSessionController.ts';

const app = express();

// Create
app.post('/start', AuthMiddleware, QuizSessionController.start);

// Edit
app.put('/complete', AuthMiddleware, QuizSessionController.complete);
app.put('/end', AuthMiddleware, QuizSessionController.end);
app.put('/save', AuthMiddleware, QuizSessionController.save);

export default app;  