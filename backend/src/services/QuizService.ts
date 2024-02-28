import { Request } from "express";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import Quiz from "../models/Quiz.ts";
import { authorizedUserId } from "../index.ts";
import { VisibilityEnums } from "../enums/Enums.ts";
import Like from "../models/Like.ts";
import Save from "../models/Save.ts";

class QuizService {
  static async getAll(req: Request): Promise<IResponse> {
    const isRemoved = req.query.isRemoved === "true";

    const data = await Quiz.find({ visibility: VisibilityEnums.PUBLIC, isRemoved });

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
      // Todo : type tanımla
      const quizData = req.body;
      
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
      // Todo : type tanımla
      const quizData = req.body;
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

  static async like(req: Request): Promise<IResponse> {
    try {
      const { quizId } = req.body as { quizId: string; };

      const newLikedData = new Like({ quizId, userId: authorizedUserId });
      const data = await newLikedData.save();
      
      return { 
        type: true, 
        message: `Quiz with id '${quizId}' has been liked successfully!`,
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async unlike(req: Request): Promise<IResponse> {
    try {
      const { id } = req.params as { id: string; };
      
      const data = await Like.findByIdAndUpdate(
        { _id: id }, 
        { $set: { isRemoved: true } },
        { returnOriginal: false }
      );
      
      return { 
        type: true, 
        message: `You have removed your like from quiz with id '${id}'`,
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async save(req: Request): Promise<IResponse> {
    try {
      const { quizId } = req.body as { quizId: string; };
      
      const newSavedData = new Save({ quizId, userId: authorizedUserId });
      const data = await newSavedData.save();
      
      return { 
        type: true, 
        message: `Quiz with id '${quizId}' has been saved successfully!`,
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async unsave(req: Request): Promise<IResponse> {
    try {
      const { id } = req.params as { id: string; };
      
      const data = await Save.findByIdAndUpdate(
        { _id: id }, 
        { $set: { isRemoved: true } },
        { returnOriginal: false }
      );
      
      return { 
        type: true, 
        message: `You have removed your save from quiz with id '${id}'`,
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default QuizService;