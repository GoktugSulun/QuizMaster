import { authorizedUserId } from "../index.ts";
import Helpers from "../utils/Helpers.ts";
import { type ICreateQuizSession, type IComplete, type IEnd, type IStart, type ICreate, type ISave, type IGetAllCompletedSession } from "../constants/Types/QuizSession/QuizSessionType.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import { type ICompleteResponse, type IQuizSessionResponse, type IStartResponse } from "../constants/Types/QuizSession/QuizSessionResponseType.ts";
import { QuizSessionEndEnums, QuizSessionEnums, QuizStatusEnums } from "../constants/Enums/Enums.ts";
import QuizSession from "../models/QuizSession.ts";
import Quiz from "../models/Quiz.ts";
import QuizService from "./QuizService.ts";
import { IQuizWithQuestions } from "../constants/Types/Quiz/QuizResponseTypes.ts";
import QuizResultService from "./QuizResultService.ts";
import { type ICreate as ICreateResult } from "../constants/Types/QuizResult/QuizResultType.ts";

class QuizSessionService {
   static async getAllCompletedSessionId(params: IGetAllCompletedSession): Promise<ResponseType<string[]>> {
      try {
         const { page, limit } = params;
         const skip = page === 1 ? 0 : (page - 1) * limit;

         const allCompletedSessions = await QuizSession
            .find({ 
               status: { $in: [QuizSessionEnums.COMPLETED, QuizSessionEnums.TIMEOUT, QuizSessionEnums.EXCEED_ATTEMPT] } 
            })
            .sort({ createdAt: "desc" })
            .skip(skip)
            .limit(limit);

         const data = allCompletedSessions.reduce<string[]>((acc, current) => {
            if (acc.includes(current.quizId)) {
               return acc;
            }
            return [...acc, current.quizId];
         }, [])

         return {
            type: true,
            message: "Completed quiz sessions has been fetched successfully",
            data
         }
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async create(params: ICreate): Promise<ResponseType<IQuizSessionResponse>> {
      try {
         const { quizId } = params;

         const quiz = await Quiz.findOne({ _id: quizId, isRemoved: false }); 
         if (!quiz) {
           return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
           }
         }

         const activeQuizSession = await QuizSession.findOne({ quizId, userId: authorizedUserId, status: QuizSessionEnums.STARTED }); 
         if (activeQuizSession) {
           return {
               type: false,
               message: `There is already quiz session for quiz id with '${quizId}'`,
           }
         }

         const newQuizSessionData: ICreateQuizSession = {
            quizId,
            userId: authorizedUserId,
            answers: [],
            startTime: new Date().getTime(),
            status: QuizSessionEnums.STARTED,
            maxAttempt: quiz.maxAttempt,
            totalAttempt: 1,
            totalTime: quiz.totalTime
         }

         const newQuizSession = new QuizSession(newQuizSessionData);
         const data = await newQuizSession.save();

         return {
            type: true,
            message: `Quiz session has been started`,
            data
         }
      } catch (error) {
         return Helpers.responseError(error)
      }
   }
   
   static async start(params: IStart): Promise<ResponseType<IStartResponse>> {
      try {
         const { quizId } = params;

         const quiz = await Quiz.findOne({ _id: quizId, isRemoved: false }); 
         if (!quiz) {
           return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
           }
         }

         // Get quizWithQuestions to use it for START_NEW_QUIZ and CONTINUE_STARTED_QUIZ
         const quizServiceResult = await QuizService.getByIdWithQuestions({ id: quizId, isRemoved: false });
         if (!quizServiceResult.type) {
            return {
               type: false,
               message: quizServiceResult.message 
            }
         }

         // Todo: IQuizSessionQuizResponse tipini kullan ve optionlar içinde isCorrect dönme
         const quizWithQuestions = quizServiceResult.data as IQuizWithQuestions;

         const quizSessions = await QuizSession.find({ quizId, userId: authorizedUserId });
         if (!quizSessions) {
            const result = await QuizSessionService.create({ quizId });
            if (!result.type) {
               return {
                  type: false,
                  message: result.message
               }
            }
            
            return {
               type: true,
               message: `Quiz session has been created`,
               data: {
                  status: QuizStatusEnums.START_NEW_QUIZ,
                  quiz: quizWithQuestions,
                  quizSession: result.data
               }
            }
         }

         const isCompletedAllQuizSessions = quizSessions.every((quizSession) => 
            quizSession.status === QuizSessionEnums.COMPLETED || quizSession.status === QuizSessionEnums.TIMEOUT || quizSession.status === QuizSessionEnums.EXCEED_ATTEMPT)
         if (isCompletedAllQuizSessions) {
            const result = await QuizSessionService.create({ quizId });
            if (!result.type) {
               return {
                  type: false,
                  message: result.message
               }
            }

            return {
               type: true,
               message: `Quiz session has been created`,
               data: {
                  status: QuizStatusEnums.START_NEW_QUIZ,
                  quiz: quizWithQuestions,
                  quizSession: result.data
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
         
         // convert from millisecond to second
         const diff = (new Date().getTime() - incompletedQuizSession.startTime) / 1000; 
         const isTimeout = Math.ceil(diff) >= incompletedQuizSession.totalTime;
         
         if (isTimeout) {
            const endServiceResult = await QuizSessionService.end({ quizId, status: QuizSessionEndEnums.TIMEOUT });
            if (!endServiceResult.type) {
               return {
                  type: false,
                  message: endServiceResult.message
               }
            }
            
            return {
               type: true,
               message: `Quiz session has timed out!`,
               data: {
                  status: QuizStatusEnums.TIMEOUT,
                  startTime: incompletedQuizSession.startTime,
                  totalTime: incompletedQuizSession.totalTime,
                  date: incompletedQuizSession.createdAt
               }
            }
         }

         const exceedAttempt = incompletedQuizSession.totalAttempt === incompletedQuizSession.maxAttempt;
         if (exceedAttempt) {
            const endServiceResult = await QuizSessionService.end({ quizId, status: QuizSessionEndEnums.EXCEED_ATTEMPT });
            if (!endServiceResult.type) {
               return {
                  type: false,
                  message: endServiceResult.message
               }
            }

            return {
               type: true,
               message: `Quiz session has been ended because you exceeded your attempt!`,
               data: {
                  status: QuizStatusEnums.EXCEED_ATTEMPT,
                  totalAttempt: incompletedQuizSession.totalAttempt,
                  maxAttempt: incompletedQuizSession.maxAttempt,
                  date: incompletedQuizSession.createdAt
               }
            }
         }

         const data = await QuizSession.findOneAndUpdate(
            { quizId, userId: authorizedUserId, status: QuizSessionEnums.STARTED }, 
            { $set: { totalAttempt: incompletedQuizSession.totalAttempt + 1 } },
            { new: true }
         );
         if (!data) {
            return {
               type: false,
               message: "Error occurs when increasing the attempt count!"
            }
         }

         return {
            type: true,
            message: `Attempt: ${data.totalAttempt}/${data.maxAttempt}`,
            data: {
               status: QuizStatusEnums.CONTINUE_STARTED_QUIZ,
               quiz: quizWithQuestions,
               quizSession: data
            }
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async complete(params: IComplete): Promise<ResponseType<ICompleteResponse>> {
      try {
         const { quizId, quizSessionId, answers, completeTime } = params;

         const isQuizExisted = await Quiz.exists({ _id: quizId });
         if (!isQuizExisted) {
           return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
           }
         }

         await QuizSession.findOneAndUpdate(
            { quizId, userId: authorizedUserId, status: QuizSessionEnums.STARTED }, 
            { $set: { status: QuizSessionEnums.COMPLETED } },
         );

         const resultParams: ICreateResult = { quizId, quizSessionId, answers, completeTime  }
         const result = await QuizResultService.create(resultParams);
         if (!result.type) {
            return {
               type: false,
               message: result.message
            }
         }
         return {
            type: true,
            message: 'Quiz session has been completed successfully',
            data: result.data as ICompleteResponse
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async end(params: IEnd): Promise<ResponseType<IQuizSessionResponse>> {
      try {
         const { quizId } = params;

         const quiz = await Quiz.findOne({ _id: quizId, isRemoved: false }); 
         if (!quiz) {
           return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
           }
         }

         const newStatus = params?.status || QuizSessionEndEnums.COMPLETED;
         const data = await QuizSession.findOneAndUpdate(
            { quizId, userId: authorizedUserId, status: QuizSessionEnums.STARTED }, 
            { $set: { status: newStatus } },
            { new: true }
         );

         if (!data) {
            return {
               type: false,
               message: "Error occurs when ending quiz session"
            }
         }
         
         return {
            type: true,
            message: `Quiz session has been ended because status is ${newStatus}`,
            data
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async save(params: ISave): Promise<ResponseType<null>> {
      try {
         const { quizId, quizSessionId, answers } = params;

         const quiz = await Quiz.findOne({ _id: quizId, isRemoved: false }); 
         if (!quiz) {
           return {
               type: false,
               message: `Quiz with id '${quizId}' couldn't find!`,
           }
         }

         await QuizSession.findOneAndUpdate(
            { quizId, userId: authorizedUserId, status: QuizSessionEnums.STARTED }, 
            { $set: { answers } },
         );
         
         return {
            type: true,
            message: `Answers has been saved successfully`,
            data: null
         };
      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default QuizSessionService;