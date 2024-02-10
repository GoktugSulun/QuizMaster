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
      // const { name } = req.body;
    
      const dummy = {
        name: 'quiz-3',
        description: 'quiz-3 description',
        totalTime: 10000,
        category: 'Software', 
        questions: [
          {
            name: 'Quetion-4',
            options: [
              { name: 'Option-13', isCorrect: true },
              { name: 'Option-14', isCorrect: false },
              { name: 'Option-15', isCorrect: false },
              { name: 'Option-16', isCorrect: false },
            ]
          },
          {
            name: 'Quetion-5',
            options: [
              { name: 'Option-17', isCorrect: false },
              { name: 'Option-18', isCorrect: true },
              { name: 'Option-19', isCorrect: false },
              { name: 'Option-20', isCorrect: false },
            ]
          }
        ]
      };

      // const { quizData, ...questions } = dummy;
  
      const quiz = new Quiz(dummy);
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