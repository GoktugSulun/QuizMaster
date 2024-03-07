import mongoose from 'mongoose';

export const saveSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true,
   },
   quizId: {
      type: String,
      required: true,
   },
   isRemoved: {
      type: Boolean,
      required: true,
      default: false
   }
}, { timestamps: true });

const Save = mongoose.model('Save', saveSchema);
export default Save;