
export interface IGetAll {
   isRemoved: boolean;
   page: number;
   limit: number;
}

export interface IMarkAsSaved {
   quizId: string;
}

export interface IUnmarkAsSaved {
   quizId: string;
}

export interface IGetSavedQuizzes {
   isRemoved?: boolean;
   page: number;
   limit: number;
}