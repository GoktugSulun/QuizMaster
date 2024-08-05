import { Types } from "mongoose";

export interface IFavoriteSchema {
   id: Types.ObjectId,
   createdAt: Date;
   updatedAt: Date;
   userId: string;
   quizId: string;
   isRemoved: boolean;
}

export interface IGetAll {
   isRemoved: boolean;
   page: number;
   limit: number;
}

export interface IGetFavoriteQuizzes {
   isRemoved?: boolean;
   page: number;
   limit: number;
}

export interface IMarkAsFavorite {
   quizId: string;
}

export interface IUnmarkAsFavorite {
   quizId: string;
}