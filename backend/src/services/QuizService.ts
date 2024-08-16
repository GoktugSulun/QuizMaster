import Helpers from "../utils/Helpers.ts";
import Quiz from "../models/Quiz.ts";
import Favorite from "../models/Favorite.ts";
import Save from "../models/Save.ts";
import { type IEdit, type ICreate, type IGet, type IGetById, type IGetAll, IDelete, IGetRulesById } from "../constants/Types/Quiz/QuizType.ts";
import { type IResponse } from "../types/Types.ts";
import { type IQuizRules, type IQuizWithQuestions, type IQuizResponse } from "../constants/Types/Quiz/QuizResponseTypes.ts";
import FavoriteService from "./FavoriteService.ts";
import { QuestionEnums, QuizTypeEnums, VisibilityEnums } from "../constants/Enums/Enums.ts";
import SaveService from "./SaveService.ts";
import QuestionService from "./QuestionService.ts";
import { IQuestion } from "../constants/Types/Question/QuestionResponseType.ts";
import { ResponseType } from "../constants/Types/Common/CommonType.ts";
import QuizSessionService from "./QuizSessionService.ts";
import AuthenticatedUser from "../utils/AuthenticatedUser.ts";

class QuizService {
  static async getAll(params: IGetAll): Promise<IResponse> {
    try {
      const { page, limit, isRemoved, creatorId, visibility, haveQuestions=false } = params;
      const skip = page === 1 ? 0 : (page - 1) * limit;

      const quizData = await Quiz
        .find({ 
          isRemoved, 
          ...(creatorId ? { creatorId } : {}),
          ...(visibility ? { visibility } : {})
        })
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);
      
      let filteredQuizData = quizData;
      if (haveQuestions) {
        const quizDataWithQuestions = await Promise.all(quizData.map(async (quiz) => {
          const questionServiceResult = await QuestionService.get({ quizId: quiz.id, isRemoved: false });
          if (!questionServiceResult.type) {
            throw Error(questionServiceResult.message)
          }
          return questionServiceResult.data?.length > 0 ? quiz : null;
        }))
  
        filteredQuizData = quizDataWithQuestions.filter((quiz) => quiz !== null);
      }

      const data = await Promise.all(filteredQuizData.map(async (quiz) => {
        const favoriteData = await Favorite.findOne({ quizId: quiz.id, userId: AuthenticatedUser.getUserId(), isRemoved: false });
        const saveData = await Save.findOne({ quizId: quiz.id, userId: AuthenticatedUser.getUserId(), isRemoved: false });

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
              const result = await QuizService.getAll({ page, limit, isRemoved, visibility: VisibilityEnums.PUBLIC, haveQuestions: true });
              if (!result.type) {
                throw new Error(result.message);
              }
              return result.data;
            }
            case QuizTypeEnums.FAVORITES: {
              const result = await FavoriteService.getFavoriteQuizzes({ page, limit });
              if (!result.type) {
                throw new Error(result.message);
              }
              return result.data;
            }
            case QuizTypeEnums.SAVED: {
              const result = await SaveService.getSavedQuizzes({ page, limit });
              if (!result.type) {
                throw new Error(result.message);
              }
              return result.data;
            }
            case QuizTypeEnums.COMPLETED: {
              const sessionService = await QuizSessionService.getAllCompletedSessionId({ page, limit });
              if (!sessionService.type) {
                throw new Error(sessionService.message);
              }
              const results = await Promise.all(sessionService.data.map(async (quizId) =>  {
                const res = await QuizService.getById({ id: quizId, isRemoved: false });
                if (!res.type) {
                  return null
                }
                return res.data;
              }))
              const filteredResult = results.filter((result) => result !== null);
              return filteredResult;
            }
            case QuizTypeEnums.CREATED: {
              const result = await QuizService.getAll({ page, limit, isRemoved, creatorId: AuthenticatedUser.getUserId() });
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
      const { id, isRemoved, creatorId } = params;

      const quizData = await Quiz.findOne({ _id: id, isRemoved, ...(creatorId ? { creatorId } : {}) });
      const favoriteData = await Favorite.findOne({ quizId: id, userId: AuthenticatedUser.getUserId(), isRemoved: false });
      const saveData = await Save.findOne({ quizId: id, userId: AuthenticatedUser.getUserId(), isRemoved: false });

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

  static async getByIdWithQuestions(params: IGetById): Promise<ResponseType<IQuizWithQuestions>> {
    try {
      const { id, isRemoved } = params;

      const quizData = await Quiz.findOne({ _id: id, creatorId: AuthenticatedUser.getUserId(), isRemoved });
      if (!quizData) {
        return {
          type: false,
          message: `Quiz with id '${id}' couldn't find!`,
        }
      }

      const questionServiceResult = await QuestionService.get({ quizId: id, isRemoved: false });
      if (!questionServiceResult.type) {
        return {
          type: false,
          message: questionServiceResult.message
        }
      }

      const favoriteData = await Favorite.findOne({ quizId: id, userId: AuthenticatedUser.getUserId(), isRemoved: false });
      const saveData = await Save.findOne({ quizId: id, userId: AuthenticatedUser.getUserId(), isRemoved: false });
      
      const data = {
        ...quizData.toJSON(),
        isFavorite: !!favoriteData,
        isSaved: !!saveData,
        questions: questionServiceResult.data
      } as IQuizWithQuestions;

      return {
        type: true,
        message: `Quiz with id '${id}' has been fetched with its questions successfully`,
        data
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async create(params: ICreate): Promise<IResponse> {
    try {
      const { uuid, multer_image, ...quizData } = params;
      const newQuizData = { ...quizData };

      const image = Helpers.createImagePath(multer_image);
      newQuizData.image = image;
      
      const quiz = new Quiz(newQuizData);
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
      const { body, id } = params;
      const { uuid, multer_image, isRemovedImage, ...currentQuizData } = body;
      const quizData = { ...currentQuizData }

      const quiz = await Quiz.findById(id)
      if (!quiz) {
        return {
          type: false,
          message: `Quiz with id '${id}' couldn't found!`
        }
      }

      if (isRemovedImage) {
        const image = Helpers.getDefaultImagePath();
        quizData.image = image;
      } else {
        if (currentQuizData.image) {
          const image = Helpers.createImagePath(multer_image);
          quizData.image = image;
        } else {
          quizData.image = quiz.image
        }
      }
      
      const data = await Quiz.findByIdAndUpdate(
        { _id: id }, 
        { $set: { ...quizData, creatorId: AuthenticatedUser.getUserId() } },
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

  static async delete(params: IDelete): Promise<IResponse> {
    try {
      const { id } = params;
      
      await Quiz.findByIdAndUpdate({ _id: id }, { isRemoved: true });
      
      return { 
        type: true, 
        message: `Quiz with id '${id}' has been deleted successfully!`, 
      };

    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async getRulesById(params: IGetRulesById): Promise<IResponse> {
    try {
      const { id, isRemoved } = params;

      const quiz = await QuizService.getById({ id, isRemoved });
      if (!quiz.type) {
        return {
          type: false,
          message: quiz.message
        }
      }

      const questions = await QuestionService.get({ quizId: id, isRemoved: false });
      if (!questions.type) {
        return {
          type: false,
          message: questions.message
        }
      }
      
      const questionData = questions.data as IQuestion[];
      const numberOfQuestions = questionData.length;
      const initial = {
        multipleChoice: false,
        trueFalse: false,
        shortAnswer: false,
      }
      
      const {
        multipleChoice,
        trueFalse,
        shortAnswer,
      } = questionData.reduce((acc, question) => {
        if (question.type === QuestionEnums.MULTIPLE_CHOICE) {
          return { ...acc, multipleChoice: true }
        }

        if (question.type === QuestionEnums.TRUE_FALSE) {
          return { ...acc, trueFalse: true }
        }

        if (question.type === QuestionEnums.SHORT_ANSWER) {
          return { ...acc, shortAnswer: true }
        }

        return acc;
      }, initial);
      
      const data: IQuizRules = {
        ...quiz.data,
        numberOfQuestions: numberOfQuestions,
        questionTime: null,
        repeat: 1,
        multipleChoice,
        trueFalse,
        shortAnswer,
      };

      return {
        type: true,
        message: `Quiz rules with id '${id}' has been fetched successfully`,
        data
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }
}
  
export default QuizService;