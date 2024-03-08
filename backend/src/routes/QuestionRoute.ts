import express from 'express';
import QuestionController from '../controllers/QuestionController.ts';

const app = express();

// Get
// app.get('/', QuestionController.get);
// app.get('/:id', QuestionController.getById);

// Create
app.post('/', QuestionController.create);

export default app;  