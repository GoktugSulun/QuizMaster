import { authorizedUserId } from "../index.ts";
import { type IMarkAsFavorite, type IGetAll, type IUnmarkAsFavorite } from "../constants/Types/Favorite/FavoriteType.ts";
import Favorite from "../models/Favorite.ts";
import Quiz from "../models/Quiz.ts";
import { type IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";

class FavoriteService {
   static async getAll(params: IGetAll): Promise<IResponse> {
      try {
         const { page, limit, isRemoved } = params;

         // Todo : get favorites

         return {
            type: true,
            message: 'All quizzes has been fetched',
            data: null
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async markAsFavorite(params: IMarkAsFavorite): Promise<IResponse> {
      try {
         const { quizId } = params;

         const isQuizExisted = await Quiz.exists({ _id: quizId });
         if (!isQuizExisted) {
            return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
            }
         }

         const isExisted = await Favorite.exists({ userId: authorizedUserId, quizId, isRemoved: false });
         if (isExisted) {
            return { 
               type: false, 
               message: `Quiz with id '${quizId}' has been already add to favorites!`,
            };
         }

         const newFavoriteData = new Favorite({ quizId, userId: authorizedUserId });
         await newFavoriteData.save();
         
         return { 
            type: true, 
            message: `Quiz with id '${quizId}' has been added to favorites successfully!`,
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async unmarkAsFavorite(params: IUnmarkAsFavorite): Promise<IResponse> {
      try {
         const { quizId } = params;

         const isQuizExisted = await Quiz.exists({ _id: quizId });
         if (!isQuizExisted) {
            return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
            }
         }

         const isExisted = await Favorite.exists({ userId: authorizedUserId, quizId, isRemoved: false });
         if (!isExisted) {
            return { 
               type: false, 
               message: `Quiz with id '${quizId}' hasn't been add to favorites yet!`,
            };
         };
         
         await Favorite.findOneAndUpdate(
            { quizId, userId: authorizedUserId, isRemoved: false }, 
            { $set: { isRemoved: true } },
         );
         
         return { 
            type: true, 
            message: `Quiz with id '${quizId}' has been removed from favorites`
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default FavoriteService;