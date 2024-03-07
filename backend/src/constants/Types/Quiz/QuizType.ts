import { QuizTypeEnums, VisibilityEnums } from "../../Enums/Enums";

export interface IGet {
   page: number;
   limit: number;
   type: QuizTypeEnums
   isRemoved: boolean;
}

export interface IGetById {
   id: string;
   isRemoved: boolean;
}

export interface IGetAll {
   isRemoved: boolean;
   page: number;
   limit: number;
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