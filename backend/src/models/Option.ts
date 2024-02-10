import mongoose from 'mongoose';

export const optionSchema = new mongoose.Schema({
   question_id: {
      type: Number,
      required: true
   },
   name: { 
      type: String, 
      trim: true, 
      required: true 
   },
   isCorrect: { 
      type: Boolean,
      required: true
   },
});

const Option = mongoose.model('Option', optionSchema);
export default Option;