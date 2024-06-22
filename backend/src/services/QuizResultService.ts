import Helpers from "../utils/Helpers.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import { type IGetById, type IGetAll } from "../constants/Types/QuizResult/QuizResultType.ts";
import { type IGetResultById, type IQuizResultId } from "../constants/Types/QuizResult/QuizResultResponseType.ts";

class QuizResultService {
   static async getAll(params: IGetAll): Promise<ResponseType<IQuizResultId[]>> {
      try {
         console.log("quiz result service getAll");
         
         return { 
            type: true, 
            message: 'quiz result service getAll', 
            data: []
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async getById(params: IGetById): Promise<ResponseType<IGetResultById>> {
      try {
         console.log("quiz result service getById");
         
         return { 
            type: true, 
            message: 'quiz result service getById', 
            data: {} as IGetResultById
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default QuizResultService;