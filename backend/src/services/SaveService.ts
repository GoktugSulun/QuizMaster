import Quiz from "../models/Quiz.ts";
import Helpers from "../utils/Helpers.ts";
import Save from "../models/Save.ts";
import { type IQuizResponse } from "../constants/Types/Quiz/QuizResponseTypes.ts";
import { type IMarkAsSaved, type IGetAll, type IUnmarkAsSaved, type IGetSavedQuizzes } from "../constants/Types/Save/SaveType.ts";
import { type IResponse } from "../types/Types.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import QuizService from "./QuizService.ts";
import AuthenticatedUser from "../utils/AuthenticatedUser.ts";

class SaveService {
   static async getAll(params: IGetAll): Promise<IResponse> {
      try {
         const { page, limit, isRemoved } = params;
         const skip = page === 1 ? 0 : (page - 1) * limit;

         const savedQuizDatas = await Save
            .find({ isRemoved, userId: AuthenticatedUser.getUserId() })
            .skip(skip)
            .limit(limit);

         return {
            type: true,
            message: 'Saved data has been fetched',
            data: savedQuizDatas
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async getSavedQuizzes(params: IGetSavedQuizzes): Promise<ResponseType<IQuizResponse[]>> {
      try {
         const { page, limit, isRemoved } = params;
         const skip = page === 1 ? 0 : (page - 1) * limit;

         const savedQuizDatas = await Save
            .find({ isRemoved, userId: AuthenticatedUser.getUserId() })
            .sort({ createdAt: "desc" })
            .skip(skip)
            .limit(limit);

         const data = await Promise.all(savedQuizDatas.map(async (item) => {
            const quizData = await QuizService.getById({ id: item.quizId, isRemoved: false});
            if (!quizData.type) {
               throw new Error(quizData.message);
            }
            return quizData.data;
         }))

         return {
            type: true,
            message: 'Saved quizzes has been fetched',
            data
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }
   

   static async markAsSaved(params: IMarkAsSaved): Promise<IResponse> {
      try {
         const { quizId } = params;

         const isQuizExisted = await Quiz.exists({ _id: quizId });
         if (!isQuizExisted) {
            return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
            }
         }

         const isExisted = await Save.exists({ userId: AuthenticatedUser.getUserId(), quizId, isRemoved: false });
         if (isExisted) {
            return { 
               type: false, 
               message: `Quiz with id '${quizId}' has been already saved!`,
            };
         }
         
         const newSavedData = new Save({ quizId, userId: AuthenticatedUser.getUserId() });
         await newSavedData.save();
         
         return { 
            type: true, 
            message: `Quiz with id '${quizId}' has been saved successfully!`,
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async unmarkAsSaved(params: IUnmarkAsSaved): Promise<IResponse> {
      try {
         const { quizId } = params;

         const isQuizExisted = await Quiz.exists({ _id: quizId });
         if (!isQuizExisted) {
            return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
            }
         }

         const isExisted = await Save.exists({ userId: AuthenticatedUser.getUserId(), quizId, isRemoved: false });
         if (!isExisted) {
            return { 
               type: false, 
               message: `Quiz with id '${quizId}' hasn't been saved yet!`,
            };
         }
         
         await Save.findOneAndUpdate(
            { quizId, userId: AuthenticatedUser.getUserId(), isRemoved: false }, 
            { isRemoved: true },
         );
         
         return { 
            type: true, 
            message: `Quiz with id '${quizId}' has been removed from saves`
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default SaveService;