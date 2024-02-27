import { Request } from "express";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import Quiz from "../models/Quiz.ts";
import { authorizedUserId } from "../index.ts";
import { VisibilityEnums } from "../enums/Enums.ts";

class QuizService {
  static async getAll(): Promise<IResponse> {
    const data = await Quiz.find({ visibility: VisibilityEnums.PUBLIC });

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
    const data = await Quiz.find({ _id: id, creatorId: authorizedUserId });

    try {
      return {
        type: true,
        message: `Quiz with id '${id}' has been fetched successfully`,
        data: data[0] || {}
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async create(req: Request): Promise<IResponse> {
    try {
      const quizData = req.body as typeof Quiz;
      
      const quiz = new Quiz({ ...quizData, creatorId: authorizedUserId });
      const data = await quiz.save();
      
      return { 
        type: true, 
        message: 'Quiz has been created successfully', 
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async edit(req: Request): Promise<IResponse> {
    try {
      const quizData = req.body as typeof Quiz;
      const { id } = req.params;
      
      const data = await Quiz.findByIdAndUpdate(
        { _id: id }, 
        { $set: { ...quizData, creatorId: authorizedUserId } },
        { returnOriginal: false }
      );
      
      return { 
        type: true, 
        message: `Quiz with id '${id}' has been updated successfully!`, 
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default QuizService;