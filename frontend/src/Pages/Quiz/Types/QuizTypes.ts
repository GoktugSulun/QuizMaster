import { PointEnums, QuestionEnums, QuizSessionEnums, VisibilityEnums } from "@/Constants/Enums";

export type Option = {
   id: string;
   name: string;
   userAnswer?: string;
   isCorrect: boolean;
}

export type Question = {
   id: string;
   name: string;
   time?: number | null;
   image?: string;
   point: PointEnums;
   type: QuestionEnums;
   options: Option[];
   selectedOptionId?: string;
}

export type Quiz = {
   id: string | null;
   time: number;
   name: string;
   description: string;
   questions: Question[];
}

export type UserShortAnswerType = { answerId: string | null, text: string }

export type ShortAnswerType = {
   answerId?: never;
   answer?: never;
   answers: UserShortAnswerType[];
}

export type MultipleAndTrueFalseAnswerType = { 
   answerId: string | null;
   answer?: never;
   answers?: never;
}

export type Answer = 
   { questionId: string; } 
   & 
   ( 
      ShortAnswerType 
      | MultipleAndTrueFalseAnswerType
      | { 
         answerId?: never; 
         answer: string | null; 
         answers?: never; 
      } 
   )

export type QuizSessionResponse = {
   id: string;   
   createdAt: Date | null;
   updatedAt: Date | null;
   quizId: string;
   userId: string;
   status: QuizSessionEnums | null;
   startTime: number;
   totalTime: number;
   maxAttempt: number;
   totalAttempt: number;
   answers: Answer[];
}

export type QuizType = {
   name: string;
   description: string;
   maxAttempt: number;
   visibility: VisibilityEnums;
   image: File | null;
   totalTime: number;
}

export type QuizWithIdType = QuizType 
   & { 
      id: string; 
      userId: string; 
      createdAt: string; 
      updatedAt: string; 
      isRemoved: boolean;
   }

export type SavedAnswer = {
   questionId: string, 
   answerId: string 
}

export type SaveQuizSessionType = {
   quizSessionId: string;
   quizId: string;
   answers: Answer[];
}

export type CompleteQuizSessionType = {
   quizSessionId: string;
   quizId: string;
   answers: Answer[];
   completeTime: number;
}

export type QuestionsWithResults = { 
   id: string; 
   name: string; 
   selectedOptionId: string; 
   options: { 
      id: string; 
      name: string; 
      isCorrect: boolean 
   }[]; 
}

export type QuizResultResponse = {
   id: string;
   createdAt: Date | null;
   updatedAt: Date | null;
   quizId: string;
   userId: string;
   totalQuestion: number;
   totalCorrect: number;
   totalWrong: number;
   totalBlank: number;
   grade: number;
   spentDuration: number;
   totalDuration: number;
   completedDate: Date | null;
   questionsWithResults: QuestionsWithResults[];
}