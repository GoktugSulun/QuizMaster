import { QuizTypeEnums, RouteEnums } from "@/Constants/Enums";

export type ActivePathnameTypes = RouteEnums.FEED | RouteEnums.FAVORITES | RouteEnums.SAVED | RouteEnums.COMPLETED | RouteEnums.CREATED;

export type TooltipTypes = {
   delete: boolean;
   edit: boolean;
   favorite: boolean;
   save: boolean;
}

export type getQuizzesTypes = { 
   type: QuizTypeEnums, 
   page: number, 
   limit: number, 
}

export type markQuizAsFavoriteTypes = { 
   quizId: string; 
}

export type unmarkQuizAsFavoriteTypes = string;

export type markQuizAsSavedTypes = { 
   quizId: string; 
}

export type unmarkQuizAsSavedTypes = string;

export type deleteQuizTypes = string;