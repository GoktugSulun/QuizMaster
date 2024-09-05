import mongoose, { Types } from 'mongoose';
import { IQuestionsWithResults } from '../constants/Types/QuizResult/QuizResultType';
import { PointEnums, QuestionEnums } from '../constants/Enums/Enums';

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
         point: {
            type: String,
            enum: Object.values(PointEnums),
            required: true
         },
         type: {
            type: String,
            enum: Object.values(QuestionEnums),
            required: true
         },
         options: [{
            id: { type: String, required: true },
            name: { type: String, required: true },
            userAnswer: { type: String, required: false },
            isCorrect: { type: Boolean, required: true },
         }],
      }],
      required: true
   }
}, { timestamps: true });

const QuizResult = mongoose.model<IQuizResult>('QuizResult', quizResultSchema);
export default QuizResult;