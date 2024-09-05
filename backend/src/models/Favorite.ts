import mongoose from 'mongoose';
import { type IFavoriteSchema } from '../constants/Types/Favorite/FavoriteType';

export const favoriteSchema = new mongoose.Schema<IFavoriteSchema>({
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

const Favorite = mongoose.model<IFavoriteSchema>('Favorite', favoriteSchema);
export default Favorite;