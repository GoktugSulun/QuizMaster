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
        message: 'All comments has been fetched',
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
      // const { name } = req.body;
      const dummy = {
        name: 'quiz-1',
        description: 'quiz-1 description',
        total_time: 3000,
        questions: [
          {
            name: 'Quetion-1',
            options: [
              { name: 'Option-1', isCorrect: true },
              { name: 'Option-2', isCorrect: false },
              { name: 'Option-3', isCorrect: false },
              { name: 'Option-4', isCorrect: false },
            ]
          }
        ]
      }
  
      const quiz = new Quiz(dummy);
      return quiz.save()
        .then((data) => ({ type: true, message: 'create', data }))
        .catch((error) => Helpers.responseError(error));


      // return {
      //   type: true,
      //   message: 'getById',
      //   data
      // };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default QuizService;