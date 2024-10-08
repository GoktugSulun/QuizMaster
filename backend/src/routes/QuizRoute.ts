import express from 'express';
import QuizController from '../controllers/QuizController.ts';
import FavoriteController from '../controllers/FavoriteController.ts';
import SaveController from '../controllers/SaveController.ts';
import AuthMiddleware from '../middlewares/AuthMiddleware.ts';
import { GenerateUuidMiddleware, MulterMiddleware } from '../middlewares/index.ts';

const app = express();

// Get
app.get('/', AuthMiddleware(true), QuizController.get);
app.get('/:id', QuizController.getById);
app.get('/:id/withQuestions', QuizController.getByIdWithQuestions);
app.get('/:id/rules', QuizController.getRulesById);

// Create
app.post('/', AuthMiddleware(), GenerateUuidMiddleware, MulterMiddleware.single('files'), QuizController.create);

// Edit
app.put('/:id', AuthMiddleware(), GenerateUuidMiddleware, MulterMiddleware.single('files'), QuizController.edit);

// Favorite
app.post('/markAsFavorite', AuthMiddleware(), FavoriteController.markAsFavorite);
app.put('/unmarkAsFavorite/:id', AuthMiddleware(), FavoriteController.unmarkAsFavorite);

// Save
app.post('/markAsSaved', AuthMiddleware(), SaveController.markAsSaved);
app.put('/unmarkAsSaved/:id', AuthMiddleware(), SaveController.unmarkAsSaved);

// Delete
app.delete('/:id', AuthMiddleware(), QuizController.delete);

export default app;  