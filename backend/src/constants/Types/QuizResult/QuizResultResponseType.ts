import { type IQuizResponse } from "../Quiz/QuizResponseTypes";
import { type IQuestionsWithResults } from "./QuizResultType";

export interface IQuizResultId {
   quizId: string;
}

export interface IGetResultById {
   id: string;   
   createdAt: Date;
   updatedAt: Date;
   quizId: string;
   userId: string;
   totalQuestion: number;
   totalCorrect: number;
   totalWrong: number;
   totalBlank: number;
   grade: number;
   spentDuration: number;
   totalDuration: number;
   completedDate: Date;
   questionsWithResults: IQuestionsWithResults[];
   quiz: IQuizResponse;
}

export interface ICreateResult {
   quizId: string;
   userId: string;
   totalQuestion: number;
   totalCorrect: number;
   totalWrong: number;
   totalBlank: number;
   grade: number;
   spentDuration: number;
   totalDuration: number;
   completedDate: Date;
   questionsWithResults: IQuestionsWithResults[];
}

export interface IInitialResultState {
   totalCorrect: number,
   totalWrong: number,
   totalBlank: number,
   grade: number,
   questionsWithResults: IQuestionsWithResults[]
}