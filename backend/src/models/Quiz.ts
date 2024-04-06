import mongoose, { Types } from 'mongoose';
import { VisibilityEnums } from '../constants/Enums/Enums.ts';

interface IQuizSchema {
   id: Types.ObjectId;
   createdAt: Date;
   updatedAt: Date;
   name: string;
   description: string;
   totalTime: number;
   visibility: VisibilityEnums;
   image: string | null;
   creatorId: string;
   isRemoved: boolean;
}

export const quizSchema = new mongoose.Schema<IQuizSchema>({
   name: { 
      type: String, 
      trim: true, 
      minLength: [3, "Name must have minimum three(3) characters"],
      maxLength: [40, "Name must have maximum forty(40) characters"],
      required: [true, 'Name is a required field'],
   },
   description: { 
      type: String, 
      trim: true, 
      minLength: [10, "Description must have minimum ten(10) characters"],
      maxLength: [150, "Description must have maximum hundred(100) characters"],
      required: true,
   },
   totalTime: { 
      type: Number, 
      required: true 
   },
   visibility: {
      type: String,
      enum: Object.values(VisibilityEnums),
      required: true
   },
   image: {
      type: String || null,
      default: null
   },
   creatorId: {
      type: String,
      required: true
   },
   isRemoved: {
      type: Boolean,
      required: true,
      default: false
   }
}, { timestamps: true });

const Quiz = mongoose.model<IQuizSchema>('Quiz', quizSchema);
export default Quiz;