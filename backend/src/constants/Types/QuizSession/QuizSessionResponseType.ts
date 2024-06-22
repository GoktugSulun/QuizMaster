import { QuizSessionEnums, QuizStatusEnums } from "../../Enums/Enums"
import { type IAnswer } from "./QuizSessionType";

export type IStartResponse = { 
   status: QuizStatusEnums.START_NEW_QUIZ
} | {
   status: QuizStatusEnums.CONTINUE_STARTED_QUIZ;
   maxAttempt: number;
   totalAttempt: number;
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