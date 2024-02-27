import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import QuizRoute from './routes/QuizRoute.ts';

//For env File 
dotenv.config();

// Mongoose config
mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
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

// app.use('/Auth', AuthRoute);
app.use(`/v1/quizzes`, QuizRoute);

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