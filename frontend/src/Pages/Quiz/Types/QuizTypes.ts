import { QuizSessionEnums } from "@/Constants/Enums";

export type Option = {
   id: string;
   name: string;
   isCorrect: boolean;
}

export type Question = {
   id: string;
   name: string;
   time: number | null;
   image?: string;
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

export type Answer = {
   questionId: string,
} & ( 
   { answerId: string | null, answer?: never } 
   | { answerId?: never, answer: string | null }
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
   answers: {
      questionId: string; 
      answerdId: string;
   }[];
}


