import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware.ts';
import QuizSessionController from '../controllers/QuizSessionController.ts';

const app = express();

// Get
app.get('/alreadyStarted/:id', AuthMiddleware, QuizSessionController.getAlreadyStarted);

// Start
app.get('/start/:id', AuthMiddleware, QuizSessionController.start);

// Finish
app.post('/complete', AuthMiddleware, QuizSessionController.complete);
app.post('/end', AuthMiddleware, QuizSessionController.end);

export default app;  