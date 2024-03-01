import { Request, Response } from "express";
import QuizService from '../services/QuizService.ts';
import Helpers from '../utils/Helpers.ts';
import { authorizedUserId } from "../index.ts";
import { type ICreate, type IEdit, type IMarkAsFavorite, type IMarkAsSaved, type IUnmarkAsFavorite } from "../constants/Types/Quiz/QuizType.ts";
import { VisibilityEnums } from "../constants/Enums/Enums.ts";

interface IError {
  type: boolean;
  message: string;
}

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

  static async markAsFavorite(req: Request, res: Response) {
    try {
      // Todo : Validate req.body
      const params = req.body as IMarkAsFavorite;
      const result = await QuizService.markAsFavorite(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async unmarkAsFavorite(req: Request, res: Response) {
    if (!req.params.id) { 
      return Helpers.responseMessage(res, false, "'Id' field is required!");
    }
    try {
      const params = { quizId: req.params.id } as IUnmarkAsFavorite;
      const result = await QuizService.unmarkAsFavorite(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async markAsSaved(req: Request, res: Response) {
    try {
      // Todo : Validate req.body
      const params = req.body as IMarkAsSaved;
      const result = await QuizService.markAsSaved(params);
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
      const result = await QuizService.unmarkAsSaved(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }
}
  
export default QuizController;