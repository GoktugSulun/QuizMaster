
import Helpers from "../utils/Helpers.ts";
import QuestionService from "../services/QuestionService.ts";
import { ICreate } from "../constants/Types/Question/QuestionType.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";

class QuestionController {
   static async create(req: Request, res: Response) {
      try {
         const param = req.body as ICreate[];
         const result = await QuestionService.create(param);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default QuestionController;