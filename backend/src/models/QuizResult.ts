import mongoose, { Types } from 'mongoose';
import { IQuestionsWithResults } from '../constants/Types/QuizResult/QuizResultType';

interface IQuizResult {
   id: Types.ObjectId;   
   createdAt: Date;
   updatedAt: Date;
   quizId: string;
   userId: string;
   totalQuestion: number;
   totalCorrect: number;
   totalWrong: number;
   totalBlank: number;
   grade: number;
   spentDuration: number;
   totalDuration: number;
   completedDate: Date;
   questionsWithResults: IQuestionsWithResults[] 
}

export const quizResultSchema = new mongoose.Schema<IQuizResult>({
   quizId: { 
      type: String,
      required: true,
   },
   userId: { 
      type: String,
      required: true,
   },
   totalQuestion: {
      type: Number,
      required: true
   },
   totalCorrect: {
      type: Number,
      required: true
   },
   totalWrong: {
      type: Number,
      required: true
   },
   totalBlank: {
      type: Number,
      required: true
   },
   grade: {
      type: Number,
      required: true
   },
   spentDuration: {
      type: Number,
      required: true
   },
   totalDuration: {
      type: Number,
      required: true
   },
   completedDate: {
      type: Date,
      required: true
   },
   questionsWithResults: {
      type: [{
         id: { type: String, required: true },
         name: { type: String, required: true },
         selectedOptionId: { type: String },
         options: [{
            id: { type: String, required: true },
            name: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
         }],
      }],
      required: true
   }
}, { timestamps: true });

const QuizResult = mongoose.model<IQuizResult>('QuizResult', quizResultSchema);
export default QuizResult;