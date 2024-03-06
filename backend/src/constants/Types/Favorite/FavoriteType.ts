
export interface IGetAll {
   isRemoved: boolean;
   page: number;
   limit: number;
}

export interface IMarkAsFavorite {
   quizId: string;
}

export interface IUnmarkAsFavorite {
   quizId: string;
}