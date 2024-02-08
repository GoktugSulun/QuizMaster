import mongoose from 'mongoose';
import { optionSchema } from './Option.ts';

export const questionSchema = new mongoose.Schema({
   name: { 
      type: String, 
      trim: true, 
      required: true 
   },
   time: { 
      type: Number
   },
   options: [optionSchema]
});

const Question = mongoose.model('Question', questionSchema);
export default Question;