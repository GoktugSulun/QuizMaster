import Helpers from "../utils/Helpers.ts";
import Quiz from "../models/Quiz.ts";
import { authorizedUserId } from "../index.ts";
import Favorite from "../models/Favorite.ts";
import Save from "../models/Save.ts";
import { type IEdit, type ICreate, type IGet, type IGetById, type IGetAll } from "../constants/Types/Quiz/QuizType.ts";
import { type IResponse } from "../types/Types.ts";
import { type IQuizResponse } from "../constants/Types/Quiz/QuizResponseTypes.ts";
import FavoriteService from "./FavoriteService.ts";
import { QuizTypeEnums, VisibilityEnums } from "../constants/Enums/Enums.ts";
import SaveService from "./SaveService.ts";

class QuizService {
  static async getAll(params: IGetAll): Promise<IResponse> {
    try {
      const { page, limit, isRemoved, creatorId, visibility } = params;
      const skip = page === 1 ? 0 : (page - 1) * limit;

      const quizData = await Quiz
        .find({ 
          isRemoved, 
          ...(creatorId ? { creatorId } : {}),
          ...(visibility ? { visibility } : {}),
        })
        .skip(skip)
        .limit(limit);
      
      const data = await Promise.all(quizData.map(async (quiz) => {
        const favoriteData = await Favorite.findOne({ quizId: quiz.id, userId: authorizedUserId, isRemoved: false });
        const saveData = await Save.findOne({ quizId: quiz.id, userId: authorizedUserId, isRemoved: false });

        return {
          ...quiz.toJSON(),
          isFavorite: !!favoriteData,
          isSaved: !!saveData,
        }
      }));

      return {
        type: true,
        message: `All quizzes has been fetched`,
        data
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async get(params: IGet): Promise<IResponse> {
    try {
      const { page, limit, type, isRemoved } = params;

      const data = await (
        async () => {
          switch (type) {
            case QuizTypeEnums.ALL: {
              const result = await QuizService.getAll({ page, limit, isRemoved, visibility: VisibilityEnums.PUBLIC });
              if (!result.type) {
                throw new Error(result.message);
              }
              return result.data;
            }
            case QuizTypeEnums.FAVORITES: {
              const result = await FavoriteService.getFavoriteQuizzes({ page, limit, isRemoved });
              if (!result.type) {
                throw new Error(result.message);
              }
              return result.data;
            }
            case QuizTypeEnums.SAVED: {
              const result = await SaveService.getSavedQuizzes({ page, limit, isRemoved });
              if (!result.type) {
                throw new Error(result.message);
              }
              return result.data;
            }
            case QuizTypeEnums.COMPLETED: {
              console.log('get completed quizzes');
            }
            case QuizTypeEnums.CREATED: {
              const result = await QuizService.getAll({ page, limit, isRemoved, creatorId: authorizedUserId });
              if (!result.type) {
                throw new Error(result.message);
              }
              return result.data;
            }
            default:
              throw new Error(`Invalid quiz type, it must be one of the QuizTypeEnums!`);
          }
        }
      )();  

      return {
        type: true,
        message: 'Quizzes has been fetched',
        data
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async getById(params: IGetById): Promise<IResponse> {
    try {
      const { id, isRemoved } = params;

      const quizData = await Quiz.findOne({ _id: id, creatorId: authorizedUserId, isRemoved });
      const favoriteData = await Favorite.findOne({ quizId: id, userId: authorizedUserId, isRemoved: false });
      const saveData = await Save.findOne({ quizId: id, userId: authorizedUserId, isRemoved: false });

      if (!quizData) {
        return {
          type: false,
          message: `Quiz with id '${id}' couldn't find!`,
        }
      }
      
      const data = {
        ...quizData.toJSON(),
        isFavorite: !!favoriteData,
        isSaved: !!saveData,
      } as IQuizResponse;

      return {
        type: true,
        message: `Quiz with id '${id}' has been fetched successfully`,
        data
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
}
  
export default QuizService;