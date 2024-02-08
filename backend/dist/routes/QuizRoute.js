import express from 'express';
import { QuizController } from '../controllers';
const app = express();
app.get('/', QuizController.getAll);
app.get('/:id', QuizController.getById);
// app.post('/', QuizController.create);
// app.put('/:id', QuizController.edit);
// app.delete('/:id', QuizController.delete);
export default app;
