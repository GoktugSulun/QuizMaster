import { QuizTypeEnums, RouteEnums } from "@/Constants/Enums";

export type ActivePathnameTypes = RouteEnums.FEED | RouteEnums.FAVORITES | RouteEnums.SAVED | RouteEnums.COMPLETED | RouteEnums.CREATED;

export type TooltipTypes = {
   delete: boolean;
   edit: boolean;
   favorite: boolean;
   save: boolean;
   result: boolean;
}

export type getQuizzesTypes = { 
   type: QuizTypeEnums; 
   page: number; 
   limit: number;
   signal?: AbortSignal
}

export type markQuizAsFavoriteTypes = { 
   quizId: string; 
}

export type unmarkQuizAsFavoriteTypes = {
   quizId: string; 
   updateStore: boolean;
};

export type markQuizAsSavedTypes = { 
   quizId: string; 
}

export type unmarkQuizAsSavedTypes = { 
   quizId: string; 
   updateStore: boolean;
};

export type deleteQuizTypes = string;