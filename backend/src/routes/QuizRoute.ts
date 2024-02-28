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
app.post('/like', QuizController.like);
app.put('/unlike/:id', QuizController.unlike);

// Save
app.post('/save', QuizController.save);
app.put('/unsave/:id', QuizController.unsave);

export default app;  