import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import Quiz from "../models/Quiz.ts";
import { authorizedUserId } from "../index.ts";
import { VisibilityEnums } from "../constants/Enums/Enums.ts";
import Favorite from "../models/Favorite.ts";
import Save from "../models/Save.ts";
import { type IEdit, type ICreate, type IGetAll, type IGetById, IMarkAsFavorite, type IUnmarkAsFavorite, type IMarkAsSaved, type IUnmarkAsSaved } from "../constants/Types/Quiz/QuizType.ts";

class QuizService {
  static async getAll(params: IGetAll): Promise<IResponse> {
    const { isRemoved } = params;

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

  static async getById(params: IGetById): Promise<IResponse> {
    const { id } = params;
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

  static async create(params: ICreate): Promise<IResponse> {
    try {
      const quizData = params;
      
      const quiz = new Quiz(quizData);
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

  static async edit(params: IEdit): Promise<IResponse> {
    try {
      const { body: quizData, id } = params;
      
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

  static async markAsFavorite(params: IMarkAsFavorite): Promise<IResponse> {
    try {
      const { quizId } = params;

      const isQuizExisted = await Quiz.exists({ _id: quizId });
      console.log(isQuizExisted, ' isQuizExisted');
      
      if (!isQuizExisted) {
        return {
          type: false,
          message: `Quiz with id '${quizId}' couldn't find!`,
        }
      }

      const isExisted = await Favorite.exists({ userId: authorizedUserId, quizId, isRemoved: false });
      if (isExisted) {
        return { 
          type: false, 
          message: `Quiz with id '${quizId}' has been already add to favorites!`,
        };
      }

      const newFavoriteData = new Favorite({ quizId, userId: authorizedUserId });
      await newFavoriteData.save();
      
      return { 
        type: true, 
        message: `Quiz with id '${quizId}' has been added to favorites successfully!`,
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async unmarkAsFavorite(params: IUnmarkAsFavorite): Promise<IResponse> {
    try {
      const { quizId } = params;

      const isQuizExisted = await Quiz.exists({ _id: quizId });
      if (!isQuizExisted) {
        return {
          type: false,
          message: `Quiz with id '${quizId}' couldn't find!`,
        }
      }

      const isExisted = await Favorite.exists({ userId: authorizedUserId, quizId, isRemoved: false });
      if (!isExisted) {
        return { 
          type: false, 
          message: `Quiz with id '${quizId}' hasn't been add to favorites yet!`,
        };
      }
      
      await Favorite.findByIdAndUpdate(
        { _id: quizId }, 
        { $set: { isRemoved: true } },
        { returnOriginal: false }
      );
      
      return { 
        type: true, 
        message: `Quiz with id '${quizId}' has been removed from favorites`
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async markAsSaved(params: IMarkAsSaved): Promise<IResponse> {
    try {
      const { quizId } = params;

      const isQuizExisted = await Quiz.exists({ _id: quizId });
      if (!isQuizExisted) {
        return {
          type: false,
          message: `Quiz with id '${quizId}' couldn't find!`,
        }
      }

      const isExisted = await Favorite.exists({ userId: authorizedUserId, quizId, isRemoved: false });
      if (isExisted) {
        return { 
          type: false, 
          message: `Quiz with id '${quizId}' has been already saved!`,
        };
      }
      
      const newSavedData = new Save({ quizId, userId: authorizedUserId });
      await newSavedData.save();
      
      return { 
        type: true, 
        message: `Quiz with id '${quizId}' has been saved successfully!`,
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async unmarkAsSaved(params: IUnmarkAsSaved): Promise<IResponse> {
    try {
      const { quizId } = params;

      const isQuizExisted = await Quiz.exists({ _id: quizId });
      if (!isQuizExisted) {
        return {
          type: false,
          message: `Quiz with id '${quizId}' couldn't find!`,
        }
      }

      const isExisted = await Favorite.exists({ userId: authorizedUserId, quizId, isRemoved: false });
      if (!isExisted) {
        return { 
          type: false, 
          message: `Quiz with id '${quizId}' hasn't been saved yet!`,
        };
      }
      
      const data = await Save.findByIdAndUpdate(
        { _id: quizId }, 
        { $set: { isRemoved: true } },
        { returnOriginal: false }
      );
      
      return { 
        type: true, 
        message: `Quiz with id '${quizId}' has been removed from saves`,
        data
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default QuizService;