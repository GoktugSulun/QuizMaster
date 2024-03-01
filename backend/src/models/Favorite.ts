import mongoose from 'mongoose';

export const favoriteSchema = new mongoose.Schema({
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

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;