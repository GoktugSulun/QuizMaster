
import { CorrectOptionEnums, PointEnums, QuestionEnums, QuizSessionEnums, QuizStatusEnums } from "../../Enums/Enums";
import { type IQuizWithQuestions, type IQuizResponse } from "../Quiz/QuizResponseTypes";
import { ICreateResult } from "../QuizResult/QuizResultResponseType";
import { type IAnswer } from "./QuizSessionType";

export type IStartResponse = { 
   status: QuizStatusEnums.START_NEW_QUIZ;
   quiz: IQuizWithQuestions; // Todo: IQuizSessionQuizResponse => bunu kullan service kısmından düzenleme yaptıktan sonra "isCorrect" göndermemek için
   quizSession: IQuizSessionResponse;
} | {
   status: QuizStatusEnums.CONTINUE_STARTED_QUIZ;
   quiz: IQuizWithQuestions; // Todo: IQuizSessionQuizResponse => bunu kullan service kısmından düzenleme yaptıktan sonra "isCorrect" göndermemek için
   quizSession: IQuizSessionResponse;
}  | {
   status: QuizStatusEnums.EXCEED_ATTEMPT;
   maxAttempt: number;
   totalAttempt: number;
   date: Date;
}| {
   status: QuizStatusEnums.TIMEOUT;
   startTime: number;
   totalTime: number;
   date: Date;
}

export type IQuizSessionResponse = {
   id: string;   
   createdAt: Date;
   updatedAt: Date;
   quizId: string;
   userId: string;
   status: QuizSessionEnums;
   startTime: number;
   totalTime: number;
   maxAttempt: number;
   totalAttempt: number;
   answers: IAnswer[];
}

export interface IQuizSessionQuizResponse extends IQuizResponse {
   questions: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      quizId: String;
      name: String;
      optionType: CorrectOptionEnums | null;
      point: PointEnums;
      type: QuestionEnums;
      options: {
         id: string;
         createdAt: Date;
         updatedAt: Date;
         name: String;
      }[],
      isRemoved: Boolean;
   }[]
}

export interface IStartedQuizSessionResponse {
   quiz: IQuizWithQuestions;
   quizSession: IQuizSessionResponse;
}

export interface ICompleteResponse extends ICreateResult {
   id: string;
   createdAt: Date;
   updatedAt: Date;
}