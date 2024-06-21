import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware.ts';
import QuizSessionController from '../controllers/QuizSessionController.ts';

const app = express();

// Get - "start" and "getAlreadyStarted"
app.get('/start/:id', AuthMiddleware, QuizSessionController.start);
app.get('/alreadyStarted/:id', AuthMiddleware, QuizSessionController.getAlreadyStarted);

// Post - "complete" and "end"
app.post('/complete', AuthMiddleware, QuizSessionController.complete);
app.post('/end', AuthMiddleware, QuizSessionController.end);

export default app;  