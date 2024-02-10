import { Request } from "express";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import Option from "../models/Option.ts";
import { type ObjectId } from "mongodb";
import { QuestionEnums } from "../enums/Enums.ts";

class OptionService {
  static async getAll(): Promise<IResponse> {
    const data = await Option.find();

    try {
      return {
        type: true,
        message: 'All options has been fetched',
        data
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

  static async create({ questionId, type }: { questionId: ObjectId, type: QuestionEnums }): Promise<IResponse> {
    try {

      // Todo : According to type, create options (Multiple Choice - True/False - Fill the Blank - Matching and so on)
      const data = [
         { questionId: questionId, name: '', isCorrect: false },
         { questionId: questionId, name: '', isCorrect: false },
         { questionId: questionId, name: '', isCorrect: false },
         { questionId: questionId, name: '', isCorrect: false },
      ];
      
      return { 
        type: true, 
        message: 'Options has been created successfully!', 
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default OptionService;