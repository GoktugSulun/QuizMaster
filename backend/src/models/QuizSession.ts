import mongoose, { Types } from 'mongoose';
import { QuizSessionEnums } from '../constants/Enums/Enums';
import { IAnswer } from '../constants/Types/QuizSession/QuizSessionType';

interface IQuizSessionSchema {
   id: Types.ObjectId;   
   createdAt: Date;
   updatedAt: Date;
   quizId: string;
   userId: string;
   status: QuizSessionEnums;
   startTime: number;
   totalTime: number;
   maxAttempt: number;
   totalAttempt: number;
   answers: IAnswer[];
}

export const quizSessionSchema = new mongoose.Schema<IQuizSessionSchema>({
   quizId: { 
      type: String,
      required: true,
   },
   userId: { 
      type: String,
      required: true,
   },
   status: {
      type: String,
      enum: Object.values(QuizSessionEnums),
      default: QuizSessionEnums.STARTED,
      required: true,
   },
   startTime: {
      type: Number,
      required: true,
      default: new Date().getTime()
   },
   totalTime: {
      type: Number,
      required: true
   },
   maxAttempt: {
      type: Number,
      required: true,
      default: 1,
   },
   totalAttempt: {
      type: Number,
      required: true,
      default: 1
   },
   answers: {
      type: [{
         questionId: { 
           type: String, 
           required: true 
         },
         answerId: { 
           type: String, 
           required: true 
         }
       }],
      required: true,
      default: []
   },
}, { timestamps: true });

const QuizSession = mongoose.model<IQuizSessionSchema>('QuizSession', quizSessionSchema);
export default QuizSession;