import { QuizSessionEndEnums, QuizSessionEnums } from "../../Enums/Enums";

export interface IAnswer { 
   questionId: string; 
   answerdId: string; 
}

export interface IStart { 
   quizId: string; 
}

export interface IComplete { 
   quizId: string; 
   answers: IAnswer[]; 
   completeTime: number; 
}

export interface IEnd { 
   quizId: string; 
   status?: QuizSessionEndEnums
}

export interface ICreateQuizSession {
   quizId: string;
   userId: string;
   status: QuizSessionEnums;
   startTime: number;
   totalTime: number;
   maxAttempt: number;
   totalAttempt: number;
   answers: IAnswer[];
}

export interface ICreate {
   quizId: string;
}

export interface ISave { 
   quizId: string; 
   quizSessionId: string;
   answers: IAnswer[];
}

