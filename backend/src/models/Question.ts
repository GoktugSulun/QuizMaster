import mongoose, { Types } from 'mongoose';
import { IOptionSchema, optionSchema } from './Option.ts';
import { CorrectOptionEnums, PointEnums, QuestionEnums } from '../constants/Enums/Enums.ts';

interface IQuestionSchema {
   id: Types.ObjectId;
   createdAt: Date;
   updatedAt: Date;
   quizId: String;
   name: String;
   optionType: CorrectOptionEnums | null;
   point: PointEnums;
   type: QuestionEnums;
   options: IOptionSchema[],
   isRemoved: Boolean;
}

export const questionSchema = new mongoose.Schema<IQuestionSchema>({
   quizId: {
      type: String,
      required: true
   },
   name: { 
      type: String, 
      trim: true, 
      required: true 
   },
   optionType: {
      type: String || null,
      enum: Object.values(CorrectOptionEnums),
   },
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
   options: {
      type: [optionSchema],
      required: true
   },
   isRemoved: {
      type: Boolean,
      required: true,
      default: false
   }
}, { timestamps: true });

const Question = mongoose.model<IQuestionSchema>('Question', questionSchema);
export default Question;