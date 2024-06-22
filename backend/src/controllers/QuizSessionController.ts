import Helpers from "../utils/Helpers.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { type IStart, type IComplete, type IEnd } from "../constants/Types/QuizSession/QuizSessionType.ts";
import QuizSessionService from "../services/QuizSessionService.ts";

class QuizSessionController {
   static async start(req: Request, res: Response) {
      try {
         // Todo : Validate req.body
         const params = req.body as IStart;
         const result = await QuizSessionService.start(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async complete(req: Request, res: Response) {
      try {
         // Todo : Validate req.body
         const params = req.body as IComplete;
         const result = await QuizSessionService.complete(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async end(req: Request, res: Response) {
      try {
         // Todo : Validate req.body
         const params = req.body as IEnd;
         const result = await QuizSessionService.end(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async getAlreadyStarted(req: Request, res: Response) {
      if (!req.params.id) { 
         return Helpers.responseMessage(res, false, "'Id' field is required!");
      }
      try {
         const params = { quizId: req.params.id };
         const result = await QuizSessionService.getAlreadyStarted(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default QuizSessionController;