import { Request } from "express";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";

class QuizService {
  static async getAll(): Promise<IResponse> {
    
    try {
      return {
        type: true,
        message: 'All comments has been fetched',
        data: []
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async getById(req: Request): Promise<IResponse> {
    const { id } = req.params;

    try {
      return {
        type: true,
        message: 'getById',
        data: {}
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default QuizService;