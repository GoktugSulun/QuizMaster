import express from 'express';
import QuizController from '../controllers/QuizController.ts';
import FavoriteController from '../controllers/FavoriteController.ts';
import SaveController from '../controllers/SaveController.ts';

const app = express();

// Get
app.get('/all', QuizController.getAll);
app.get('/:id', QuizController.getById);

// Create
app.post('/', QuizController.create);

// Edit
app.put('/:id', QuizController.edit);

// Favorite
app.post('/markAsFavorite', FavoriteController.markAsFavorite);
app.put('/unmarkAsFavorite/:id', FavoriteController.unmarkAsFavorite);

// Save
app.post('/markAsSaved', SaveController.markAsSaved);
app.put('/unmarkAsSaved/:id', SaveController.unmarkAsSaved);

export default app;  