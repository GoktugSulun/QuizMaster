import { authorizedUserId } from "../index.ts";
import Helpers from "../utils/Helpers.ts";
import { type IResponse } from "../types/Types.ts";
import { type IComplete, type IEnd, type IGetAlreadyStarted, type IStart } from "../constants/Types/QuizSession/QuizSessionType.ts";

class QuizSessionService {
   static async start(params: IStart): Promise<IResponse> {
      try {
         console.log("start quiz session");

         return {
            type: true,
            message: 'start quiz session',
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async complete(params: IComplete): Promise<IResponse> {
      try {
         console.log("complete quiz session");

         return {
            type: true,
            message: 'complete quiz session',
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async end(params: IEnd): Promise<IResponse> {
      try {
         console.log("end quiz session");

         return {
            type: true,
            message: 'end quiz session',
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async getAlreadyStarted(params: IGetAlreadyStarted): Promise<IResponse> {
      try {
         console.log("getAlreadyStarted quiz session");

         return {
            type: true,
            message: 'getAlreadyStarted quiz session',
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default QuizSessionService;