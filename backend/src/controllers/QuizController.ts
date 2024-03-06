import { type Request, type Response } from "express";
import QuizService from '../services/QuizService.ts';
import Helpers from '../utils/Helpers.ts';
import { authorizedUserId } from "../index.ts";
import { type ICreate, type IEdit } from "../constants/Types/Quiz/QuizType.ts";
import { type IError } from "../constants/Types/Error/ErrorType.ts";

class QuizController {
  static async getAll(req: Request, res: Response) {
    try {
      const params = { isRemoved: req.params.isRemoved === "true" }
      const result = await QuizService.getAll(params);
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
      const params = { 
        id: req.params.id, 
        isRemoved: req.params.isRemoved === "true"
      };
      const result = await QuizService.getById(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      // Todo : Validate req.body
      const params = { ...req.body, creatorId: authorizedUserId } as ICreate;
      const result = await QuizService.create(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async edit(req: Request, res: Response) {
    if (!req.params.id) { 
      return Helpers.responseMessage(res, false, "'Id' field is required!");
    }
    try {
      // Todo : Validate req.body
      const params = { body: req.body, id: req.params.id } as IEdit;
      const result = await QuizService.edit(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }
}
  
export default QuizController;