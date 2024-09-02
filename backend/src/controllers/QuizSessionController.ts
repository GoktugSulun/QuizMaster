import Helpers from "../utils/Helpers.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import QuizSessionService from "../services/QuizSessionService.ts";
import { completeQuizSessionValidation, endQuizSessionValidation, saveQuizSessionValidation, startQuizSessionValidation } from "../validations/QuizSessionValidation.ts";

class QuizSessionController {
   static async start(req: Request, res: Response) {
      const validation = startQuizSessionValidation(req.body);
      if (!validation.type) {
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuizSessionService.start(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async complete(req: Request, res: Response) {
      const validation = completeQuizSessionValidation(req.body);
      if (!validation.type) {
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuizSessionService.complete(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async end(req: Request, res: Response) {
      const validation = endQuizSessionValidation(req.body);
      if (!validation.type) {
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuizSessionService.end(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async save(req: Request, res: Response) {
      const validation = saveQuizSessionValidation(req.body);
      if (!validation.type) {
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuizSessionService.save(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default QuizSessionController;