import { PointEnums, QuestionEnums } from "../../Enums/Enums";

export interface IQuestionsWithResults { 
   id: string; 
   name: string; 
   selectedOptionId: string; 
   point: PointEnums,
   type: QuestionEnums,
   options: { 
      id: string; 
      name: string; 
      userAnswer?: string;
      isCorrect: boolean 
   }[]; 
}

export interface IGetAll {
   quizId: string;
}

export interface IGetById {
   quizResultId: string;
}

export interface IAnswer { 
   questionId: string; 
   answerId: string; 
   answers?: never;
}

export interface IShortAnswer {
   questionId: string; 
   answers: {
      answerId: string;
      text: string;
   }[]; 
   answerId?: never;
}

export interface ICreate { 
   quizId: string; 
   quizSessionId: string;
   answers: (IAnswer | IShortAnswer)[];
   completeTime: number; 
}