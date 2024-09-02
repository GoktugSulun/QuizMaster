
import Helpers from "../utils/Helpers.ts";
import QuestionService from "../services/QuestionService.ts";
import { type ICreate, type IEdit } from "../constants/Types/Question/QuestionType.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { createQuestionValidation, editQuestionValidation } from "../validations/QuestionController.ts";

class QuestionController {
   static async create(req: Request, res: Response) {
      const validation = createQuestionValidation(req.body);
      if (!validation.type) {    
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuestionService.create(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async edit(req: Request, res: Response) {
      const validation = editQuestionValidation(req.body);
      if (!validation.type) {    
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await QuestionService.edit(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default QuestionController;