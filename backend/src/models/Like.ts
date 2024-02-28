import mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
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

const Like = mongoose.model('Like', likeSchema);
export default Like;