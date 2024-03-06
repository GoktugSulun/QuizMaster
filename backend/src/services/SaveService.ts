import { authorizedUserId } from "../index.ts";
import Quiz from "../models/Quiz.ts";
import { type IMarkAsSaved, type IGetAll, IUnmarkAsSaved } from "../constants/Types/Save/SaveType.ts";
import { type IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import Save from "../models/Save.ts";

class SaveService {
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

         const isExisted = await Save.exists({ userId: authorizedUserId, quizId, isRemoved: false });
         if (isExisted) {
            return { 
               type: false, 
               message: `Quiz with id '${quizId}' has been already saved!`,
            };
         }
         
         const newSavedData = new Save({ quizId, userId: authorizedUserId });
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

         const isExisted = await Save.exists({ userId: authorizedUserId, quizId, isRemoved: false });
         if (!isExisted) {
            return { 
               type: false, 
               message: `Quiz with id '${quizId}' hasn't been saved yet!`,
            };
         }
         
         await Save.findOneAndUpdate(
            { quizId, userId: authorizedUserId, isRemoved: false }, 
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