import { Request, Response } from "express";
import QuizService from '../services/QuizService.ts';
import Helpers from '../utils/Helpers.ts';

interface IError {
  type: boolean;
  message: string;
}

class QuizController {
  static async getAll(req: Request, res: Response) {
    try {
      const result = await QuizService.getAll();
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const result = await QuizService.getById(req);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const result = await QuizService.create(req);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async edit(req: Request, res: Response) {
    try {
      const result = await QuizService.edit(req);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }
}
  
export default QuizController;