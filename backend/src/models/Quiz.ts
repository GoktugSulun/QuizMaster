import mongoose from 'mongoose';

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
   }
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;