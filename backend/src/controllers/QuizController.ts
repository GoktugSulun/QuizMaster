import { Request, Response } from "express";
import QuizService from '../services/QuizService.ts';
import Helpers from '../utils/Helpers.ts';

class QuizController {
  static async getAll(req: Request, res: Response) {
    try {
      const result = await QuizService.getAll();
      Helpers.responseJSON(res, result);
    } catch (error) {
      if (error instanceof Error) {
        Helpers.responseMessage(res, false, error.message);
      }
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const result = await QuizService.getById(req);
      Helpers.responseJSON(res, result);
    } catch (error) {
      if (error instanceof Error) {
        Helpers.responseMessage(res, false, error.message);
      }
    }
  }
}
  
export default QuizController;