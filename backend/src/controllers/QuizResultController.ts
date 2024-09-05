import Helpers from "../utils/Helpers.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import QuizResultService from "../services/QuizResultService.ts";
import { getAllQuizResultValidation, getByIdQuizResultValidation } from "../validations/QuizResultValidation.ts";

class QuizResultController {
   static async getAll(req: Request, res: Response) {
      const validation = getAllQuizResultValidation({ quizId: req.params.id });
      if (!validation.type) {    
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuizResultService.getAll(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async getById(req: Request, res: Response) {
      const validation = getByIdQuizResultValidation({ quizResultId: req.params.id });
      if (!validation.type) {    
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuizResultService.getById(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default QuizResultController;