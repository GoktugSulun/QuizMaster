import Helpers from "../utils/Helpers.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import QuizResultService from "../services/QuizResultService.ts";

class QuizResultController {
   static async getAll(req: Request, res: Response) {
      if (!req.params.id) { 
         return Helpers.responseMessage(res, false, "'Id' field is required!");
      }
      try {
         const params = { quizId: req.params.id };
         const result = await QuizResultService.getAll(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async getById(req: Request, res: Response) {
      if (!req.params.id) { 
         return Helpers.responseMessage(res, false, "'Id' field is required!");
      }
      try {
         const params = { quizId: req.params.id };
         const result = await QuizResultService.getById(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default QuizResultController;