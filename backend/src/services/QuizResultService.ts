import Helpers from "../utils/Helpers.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import { type IGetById, type IGetAll, type ICreate } from "../constants/Types/QuizResult/QuizResultType.ts";
import { type IInitialResultState, type ICreateResult, type IGetResultById, type IQuizResultId } from "../constants/Types/QuizResult/QuizResultResponseType.ts";
import { authorizedUserId } from "../index.ts";
import QuizService from "./QuizService.ts";
import { PointEnums } from "../constants/Enums/Enums.ts";
import QuizResult from "../models/QuizResult.ts";
import QuizSession from "../models/QuizSession.ts";
import Quiz from "../models/Quiz.ts";

class QuizResultService {
   
   static async getAll(params: IGetAll): Promise<ResponseType<IQuizResultId[]>> {
      try {
         const { quizId } = params;
         const quizSessions = await QuizSession.find({ quizId })
         if (!quizSessions || quizSessions.length === 0) {
            return {
               type: false,
               message: `No sessions found for quiz with id: ${quizId}`
            }
         }

         const data = quizSessions.map((session) => ({
            quizSessionId: session.id,
            quizSessionDate: session.createdAt
         })) as IQuizResultId[]
         
         return { 
            type: true, 
            message: `All sessions has been fetched for quiz with id: ${quizId}`, 
            data
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async getById(params: IGetById): Promise<ResponseType<IGetResultById>> {
      try {
         const { quizResultId } = params;
         const quizResult = await QuizResult.findById(quizResultId)
         if (!quizResult) {
            return {
               type: false,
               message: `Quiz result couldn't find with id: ${quizResultId}`
            }
         }

         const quiz = await Quiz.findById(quizResult.quizId)
         if (!quiz) {
            return {
               type: false,
               message: `Quiz couldn't find with id: ${quiz}`
            }
         }
         
         const data = {
            ...quizResult.toJSON(),
            quiz: quiz.toJSON()
         } as IGetResultById
         
         return { 
            type: true, 
            message: 'Quiz result has been fetched successfully', 
            data
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async create(params: ICreate): Promise<ResponseType<ICreateResult>> {
      try {
         const { quizId, quizSessionId, answers, completeTime } = params;

         const quizResult = await QuizService.getByIdWithQuestions({ id: quizId, isRemoved: false, creatorId: authorizedUserId });
         if (!quizResult.type) {
            return {
               type: false,
               message: quizResult.message
            }
         }
         const quiz = quizResult.data;

         const quizSessionResult = await QuizSession.findOne({ _id: quizSessionId }); 
         if (!quizSessionResult) {
           return {
               type: false,
               message: `QuizSession with id '${quizSessionId}' couldn't find for quizId with id '${quizId}'!`,
           }
         }

         const initialResultState: IInitialResultState = {
            totalCorrect: 0,
            totalWrong: 0,
            totalBlank: 0,
            grade: 0,
            questionsWithResults: []
         }
            
         const numberOfQuestion = quiz.questions.reduce((acc, current) => {
            if (current.point === PointEnums.STANDART) {
               return acc + 1;
            } 
            if (current.point === PointEnums.DOUBLE_UP){
               return acc + 2;
            }
            throw new Error("Unknown PointEnums")
         }, 0);

         const result = quiz.questions.reduce((resultState, currentQuestion) => {
            const pointEachQuestion = 100 / numberOfQuestion;
            const targetQuestion = answers.find((answer) => answer.questionId === currentQuestion.id);
            resultState.questionsWithResults = [
               ...resultState.questionsWithResults,
               {
                  id: currentQuestion.id,
                  name: currentQuestion.name,
                  point: currentQuestion.point,
                  selectedOptionId: targetQuestion?.answerId || "",
                  options: currentQuestion.options.map((option) => ({ id: option.id, name: option.name, isCorrect: option.isCorrect }))
               }
            ]
        
            if (targetQuestion?.answerId) {
               const correctAnswer = currentQuestion.options.find((option) => option.isCorrect);
               if (targetQuestion.answerId === correctAnswer?.id) {
                  resultState.totalCorrect++;
                  if (currentQuestion.point === PointEnums.STANDART){
                     resultState.grade += pointEachQuestion;
                  } else if (currentQuestion.point === PointEnums.DOUBLE_UP){
                     resultState.grade += pointEachQuestion * 2;
                  } else {
                    throw new Error("Unknown PointEnums")
                  }
               } else {
                  resultState.totalWrong++;
               }
            } else {
               resultState.totalBlank++;
            }
            return resultState;
         }, initialResultState);
         
         const startTime = new Date(quizSessionResult.toJSON().createdAt).getTime();
         const spentDuration = Math.ceil((completeTime - startTime) / 1000);
         const newData: ICreateResult = {
            quizId,
            userId: authorizedUserId,
            totalQuestion: quiz.questions.length,
            totalCorrect: result.totalCorrect,
            totalWrong: result.totalWrong,
            totalBlank: result.totalBlank,
            grade: result.grade,
            spentDuration,
            totalDuration: quiz.totalTime,
            completedDate: new Date(),
            questionsWithResults: result.questionsWithResults
         }

         const quizResultData = new QuizResult(newData);
         const data = await quizResultData.save();
         
         return { 
            type: true, 
            message: `Result has been created for quiz with id=${quizId}`, 
            data
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default QuizResultService;