import { Request } from "express";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import Quiz from "../models/Quiz.ts";

class QuizService {
  static async getAll(): Promise<IResponse> {
    const data = await Quiz.find();

    try {
      return {
        type: true,
        message: 'All quizzes has been fetched',
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

  static async create(req: Request): Promise<IResponse> {
    try {
      const quizData = req.body;
      
      const quiz = new Quiz(quizData);
      const data = await quiz.save();
      
      return { 
        type: true, 
        message: 'Quiz has been created successfully!', 
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default QuizService;