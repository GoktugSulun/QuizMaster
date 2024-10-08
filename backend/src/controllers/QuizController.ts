import { type Request, type Response } from "express";
import QuizService from '../services/QuizService.ts';
import Helpers from '../utils/Helpers.ts';
import { IDelete, type ICreate, type IEdit } from "../constants/Types/Quiz/QuizType.ts";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { QuizTypeEnums } from "../constants/Enums/Enums.ts";
import AuthenticatedUser from "../utils/AuthenticatedUser.ts";
import { createQuizValidation, editQuizValidation } from "../validations/QuizValidation.ts";

class QuizController {
  static async get(req: Request, res: Response) {
    try {
      const { page=1, limit=10, isRemoved=false, type=QuizTypeEnums.ALL } = req.query;

      const validTypes = Object.values(QuizTypeEnums);
      const isValidType = validTypes.includes(type as unknown as QuizTypeEnums);
      if (!isValidType) {
        return Helpers.responseMessage(res, false, "Invalid 'Type' field! It must be one of the QuizTypeEnums values.");
      }

      const params = { 
        page: Number(page), 
        limit: Number(limit), 
        type: type as QuizTypeEnums,
        isRemoved: isRemoved === "true",
      };
      const result = await QuizService.get(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const params = { 
        id: req.params.id, 
        isRemoved: false
      };
      const result = await QuizService.getById(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async getByIdWithQuestions(req: Request, res: Response) {
    if (!req.params.id) { 
      return Helpers.responseMessage(res, false, "'Id' field is required!");
    }
    try {
      const params = { 
        id: req.params.id, 
        isRemoved: false
      };
      const result = await QuizService.getByIdWithQuestions(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async create(req: Request, res: Response) {
    const body = req.body?.data
      ? { 
        ...(JSON.parse(req.body.data)), 
        creatorId: AuthenticatedUser.getUserId(), 
        uuid: req.uuid,
        multer_image: req.multer_image
      }
      : {
        ...req.body, 
        creatorId: AuthenticatedUser.getUserId()
      }
    const validation = createQuizValidation(body);
    if (!validation.type) {
      Helpers.responseMessage(res, false, validation.message);
      return;
    }

    try {
      const result = await QuizService.create(validation.data);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async edit(req: Request, res: Response) {
    const body = req.body?.data
    ? { 
      ...(JSON.parse(req.body.data)), 
      uuid: req.uuid,
      multer_image: req.multer_image
    }
    : {
      ...req.body
    }
    const validation = editQuizValidation({ id: req.params.id, body });
    if (!validation.type) {
      Helpers.responseMessage(res, false, validation.message);
      return;
    }

    try {
      const result = await QuizService.edit(validation.data);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async delete(req: Request, res: Response) {
    if (!req.params.id) { 
      return Helpers.responseMessage(res, false, "'Id' field is required!");
    }
    try {
      const params = { id: req.params.id } as IDelete;
      const result = await QuizService.delete(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }

  static async getRulesById(req: Request, res: Response) {
    if (!req.params.id) { 
      return Helpers.responseMessage(res, false, "'Id' field is required!");
    }
    try {
      const params = { 
        id: req.params.id, 
        isRemoved: false
      };
      const result = await QuizService.getRulesById(params);
      Helpers.responseJSON(res, result);
    } catch (error) {
      const err = error as IError;
      Helpers.responseMessage(res, false, err.message);
    }
  }
}
  
export default QuizController;