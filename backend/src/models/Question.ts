import mongoose from 'mongoose';

export const questionSchema = new mongoose.Schema({
   quizId: {
      type: Number,
      required: true
   },
   name: { 
      type: String, 
      // trim: true, 
      required: true 
   },
   time: { 
      type: Number
   },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;