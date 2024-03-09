import Question from "../models/Question.ts";
import Quiz from "../models/Quiz.ts";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import { type IGet, type ICreate, type IEdit } from "../constants/Types/Question/QuestionType.ts";

class QuestionService {
    static async get(params: IGet): Promise<IResponse> {
      try {
        const { quizId, isRemoved } = params;

        const isQuizExisted = await Quiz.exists({ _id: quizId });
         if (!isQuizExisted) {
            return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
            }
         }

        const data = await Question.find({ quizId, isRemoved });
        
        return { 
          type: true, 
          message: 'Questions has been fetched successfully!', 
          data
        };

      } catch (error) {
        return Helpers.responseError(error)
      }
  }

  static async create(params: ICreate[]): Promise<IResponse> {
    try {
      const data = await Question.insertMany(params);
        
      return { 
        type: true, 
        message: 'Questions has been created successfully!', 
        data
      };

    } catch (error) {
        return Helpers.responseError(error)
    }
  }

  // todo : make it
  static async edit(params: IEdit): Promise<IResponse> {
    try {
      const { quizId, questions  } = params;

      // todo : find all questions belongs to quizId
      // todo : update isRemoved: true for this questions data
      // todo : insert new questions

      // const data = await Quiz.findByIdAndUpdate(
      //   { _id: id }, 
      //   { $set: { ...quizData, creatorId: authorizedUserId } },
      //   { returnOriginal: false }
      // );
        
      return { 
        type: true, 
        message: 'Questions has been created successfully!', 
        data: []
      };

    } catch (error) {
        return Helpers.responseError(error)
    }
  }
}
  
export default QuestionService;