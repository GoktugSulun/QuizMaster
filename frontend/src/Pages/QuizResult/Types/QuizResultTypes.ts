import { PointEnums, VisibilityEnums } from "@/Constants/Enums";

export type QuestionsWithResultsType = {
   id: string; 
   name: string; 
   selectedOptionId: string; 
   point: PointEnums;
   options: { 
      id: string; 
      name: string; 
      isCorrect: boolean 
   }[]; 
}

export type QuizType = {
   id: string;
   createdAt: Date | null;
   updatedAt: Date | null;
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: string | null;
   totalTime: number;
   creatorId: string;
   maxAttempt: number;
   isRemoved: boolean;
}

export type QuizResultType = {
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
   questionsWithResults: QuestionsWithResultsType[];
   quiz: QuizType;
}

export type ResultType = {
   resultId: string;
   sessionDate: Date | null;
}