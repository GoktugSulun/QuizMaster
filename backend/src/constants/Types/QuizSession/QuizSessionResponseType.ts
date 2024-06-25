
import { CorrectOptionEnums, PointEnums, QuestionEnums, QuizSessionEnums, QuizStatusEnums } from "../../Enums/Enums";
import { type IQuizResponse } from "../Quiz/QuizResponseTypes";
import { type IAnswer } from "./QuizSessionType";

export type IStartResponse = { 
   status: QuizStatusEnums.START_NEW_QUIZ,
   quiz: IQuizSessionQuizResponse
} | {
   status: QuizStatusEnums.CONTINUE_STARTED_QUIZ;
   maxAttempt: number;
   totalAttempt: number;
   quiz: IQuizSessionQuizResponse
}  | {
   status: QuizStatusEnums.EXCEED_ATTEMPT;
   maxAttempt: number;
   totalAttempt: number;
}| {
   status: QuizStatusEnums.TIMEOUT;
   startTime: number;
   totalTime: number;
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