import { authorizedUserId } from "../index.ts";
import Helpers from "../utils/Helpers.ts";
import { type IResponse } from "../types/Types.ts";
import { type IComplete, type IEnd, type IGetAlreadyStarted, type IStart } from "../constants/Types/QuizSession/QuizSessionType.ts";
import { ResponseType } from "../constants/Types/Common/CommonType.ts";
import { IStartResponse } from "../constants/Types/QuizSession/QuizSessionResponseType.ts";
import { QuizSessionEnums, QuizStatusEnums } from "../constants/Enums/Enums.ts";
import QuizSession from "../models/QuizSession.ts";
import Quiz from "../models/Quiz.ts";

class QuizSessionService {
   static async start(params: IStart): Promise<ResponseType<IStartResponse>> {
      try {
         const { quizId } = params;

         const isQuizExisted = await Quiz.exists({ _id: quizId });
         if (!isQuizExisted) {
           return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
           }
         }
 
         const quizSessions = await QuizSession.find({ quizId, userId: authorizedUserId });
         console.log(quizSessions, " quizSessions");
         
         if (!quizSessions) {
            return {
               type: true,
               message: `User can start to solve the quiz with id '${quizId}`,
               data: {
                  status: QuizStatusEnums.START_NEW_QUIZ,
               }
            }
         }

         const isCompletedAllQuizSessions = quizSessions.every((quizSession) => quizSession.status === QuizSessionEnums.COMPLETED)
         if (isCompletedAllQuizSessions) {
            return {
               type: true,
               message: `User can start to solve the quiz with id '${quizId}`,
               data: {
                  status: QuizStatusEnums.START_NEW_QUIZ,
               }
            }
         }

         const incompletedQuizSession = quizSessions.find((quizSession) => quizSession.status === QuizSessionEnums.STARTED)
         if (!incompletedQuizSession) {
            return {
               type: false,
               message: `Incompleted quiz session couldn't find for quiz with id '${quizId}'`
            }
         }

         return {
            type: true,
            message: 'User has incompleted quiz!',
            data: {
               status: QuizStatusEnums.CONTINUE_STARTED_QUIZ,
               totalRepeat: incompletedQuizSession.totalAttempt,
               totalAttempt: incompletedQuizSession.totalRepeat
            }
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async complete(params: IComplete): Promise<IResponse> {
      try {
         console.log("complete quiz session");

         return {
            type: true,
            message: 'complete quiz session',
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async end(params: IEnd): Promise<IResponse> {
      try {
         console.log("end quiz session");

         return {
            type: true,
            message: 'end quiz session',
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async getAlreadyStarted(params: IGetAlreadyStarted): Promise<IResponse> {
      try {
         console.log("getAlreadyStarted quiz session");

         return {
            type: true,
            message: 'getAlreadyStarted quiz session',
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default QuizSessionService;