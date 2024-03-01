import express from 'express';
import QuizController from '../controllers/QuizController.ts';

const app = express();

// Get
app.get('/all', QuizController.getAll);
app.get('/:id', QuizController.getById);

// Create
app.post('/', QuizController.create);

// Edit
app.put('/:id', QuizController.edit);

// Like
app.post('/markAsFavorite', QuizController.markAsFavorite);
app.put('/unmarkAsFavorite/:id', QuizController.unmarkAsFavorite);

// Save
app.post('/markAsSaved', QuizController.markAsSaved);
app.put('/unmarkAsSaved/:id', QuizController.unmarkAsSaved);

export default app;  