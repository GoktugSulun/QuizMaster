import mongoose from 'mongoose';
import { VisibilityEnums } from '../enums/Enums.ts';

export const quizSchema = new mongoose.Schema({
   name: { 
      type: String, 
      trim: true, 
      required: [true, 'Name is a required field'],
      minLength: [3, "Name must have minimum three(3) characters"],
      maxLength: [40, "Name must have maximum forty(40) characters"],
   },
   description: { 
      type: String, 
      trim: true, 
      required: true,
      minLength: [10, "Description must have minimum ten(10) characters"],
      maxLength: [100, "Description must have maximum hundred(100) characters"],
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
      type: [String, null],
      default: null
   }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;