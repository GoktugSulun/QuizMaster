import { type ICreate } from "../constants/Types/Question/QuestionType.ts";
import Question from "../models/Question.ts";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";

class QuestionService {
   static async create(params: ICreate[]): Promise<IResponse> {
      try {
        console.log(1);
        
        const data = await Question.insertMany(params);
        console.log(2);
         
        return { 
          type: true, 
          message: 'Questions has been created successfully!', 
          data
        };

      } catch (error) {
         return Helpers.responseError(error)
      }
  }
}
  
export default QuestionService;