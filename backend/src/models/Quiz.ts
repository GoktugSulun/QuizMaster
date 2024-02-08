import mongoose from 'mongoose';
import { questionSchema } from './Question.ts';

const quizSchema = new mongoose.Schema({
   name: { 
      type: String, 
      trim: true, 
      required: true 
   },
   description: { 
      type: String, 
      trim: true, 
      required: true 
   },
   total_time: { 
      type: Number, 
      required: true 
   },
   questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;