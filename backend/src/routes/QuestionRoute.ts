import express from 'express';
import QuestionController from '../controllers/QuestionController.ts';

const app = express();

// Get
// app.get('/', QuestionController.get);
// app.get('/:id', QuestionController.getById);

// Create
app.post('/', QuestionController.create);

// Edit
app.put('/:quizId', QuestionController.edit);

export default app;  