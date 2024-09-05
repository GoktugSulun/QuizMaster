import Helpers from "../utils/Helpers.ts";
import SaveService from "../services/SaveService.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { markSavedValidation } from "../validations/QuizValidation.ts";

class SaveController {
   static async markAsSaved(req: Request, res: Response) {
      const validation = markSavedValidation(req.body);
      if (!validation.type) {
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await SaveService.markAsSaved(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async unmarkAsSaved(req: Request, res: Response) {
      if (!req.params.id) { 
         return Helpers.responseMessage(res, false, "'Id' field is required!");
      }
      try {
         const params = { quizId: req.params.id };
         const result = await SaveService.unmarkAsSaved(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default SaveController;