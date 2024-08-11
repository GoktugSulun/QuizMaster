import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import QuizRoute from './routes/QuizRoute.ts';
import QuestionRoute from './routes/QuestionRoute.ts';
import AuthRoute from './routes/AuthRoute.ts';
import QuizSessionRoute from './routes/QuizSessionRoute.ts';
import QuizResultRoute from './routes/QuizResultRoute.ts';
import path from 'path';

// TODO : change it later
export const authorizedUserId = "1";
export const defaultImage = "default.png"

//For env File 
dotenv.config();

// Mongoose config
mongoose.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform(_, ret) {
    delete ret._id
  },
});
mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(_, ret) {
    delete ret._id
  },
});

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req: Request, res: Response) => { 
  res.json({
    type: true,
    message: 'Deployment is running :=)'
  });
});

const __dirname = path.resolve();
app.use(express.static(__dirname + '/src/files'));

app.use(`/v1/quizzes`, QuizRoute);
app.use(`/v1/questions`, QuestionRoute);
app.use(`/v1/auth`, AuthRoute);
app.use(`/v1/quizSessions`, QuizSessionRoute);
app.use(`/v1/quizResults`, QuizResultRoute);

try {
  mongoose.connect(process.env.DB_CONNECTION_URL!)
    .then((res) => console.log('Connected to DB'))
    .catch((err) => console.log('err => ', err));
} catch (error) {
  console.log('Failed to connect to DB => ', error)
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});