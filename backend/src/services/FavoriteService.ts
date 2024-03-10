import { authorizedUserId } from "../index.ts";
import { type IMarkAsFavorite, type IGetAll, type IUnmarkAsFavorite, IFavoriteSchema, IGetFavoriteQuizzes } from "../constants/Types/Favorite/FavoriteType.ts";
import Favorite from "../models/Favorite.ts";
import Quiz from "../models/Quiz.ts";
import { type IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import { type IQuizResponse } from "../constants/Types/Quiz/QuizResponseTypes.ts";
import QuizService from "./QuizService.ts";

class FavoriteService {
   static async getAll(params: IGetAll): Promise<ResponseType<IFavoriteSchema>> {
      try {
         const { page, limit, isRemoved } = params;
         const skip = page === 1 ? 0 : (page - 1) * limit;

         const data = await Favorite
            .find({ isRemoved, userId: authorizedUserId })
            .skip(skip)
            .limit(limit);

         return {
            type: true,
            message: 'Favorite data has been fetched',
            data
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async getFavoriteQuizzes(params: IGetFavoriteQuizzes): Promise<ResponseType<IQuizResponse>> {
      try {
         const { page, limit, isRemoved } = params;
         const skip = page === 1 ? 0 : (page - 1) * limit;

         const favoriteQuizDatas = await Favorite
            .find({ isRemoved, userId: authorizedUserId })
            .sort({ createdAt: "desc" })
            .skip(skip)
            .limit(limit);
         
         const data = await Promise.all(favoriteQuizDatas.map(async (item) => {
            const quizData = await QuizService.getById({ id: item.quizId, isRemoved: false});
            if (!quizData.type) {
               throw new Error(quizData.message);
            }
            return quizData.data;
         }))

         return {
            type: true,
            message: 'Favorite quizzes has been fetched',
            data
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