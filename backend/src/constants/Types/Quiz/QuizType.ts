import { VisibilityEnums } from "../../Enums/Enums";

export interface IGetAll {
   isRemoved: boolean;
}

export interface IGetById {
   id: string;
   isRemoved: boolean;
}

export interface ICreate {
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: File | null;
   totalTime: number;
   creatorId: string;
}

export interface IEdit {
   body: ICreate;
   id: string;
}

export interface IMarkAsFavorite {
   quizId: string;
}

export interface IUnmarkAsFavorite {
   quizId: string;
}

export interface IMarkAsSaved {
   quizId: string;
}

export interface IUnmarkAsSaved {
   quizId: string;
}