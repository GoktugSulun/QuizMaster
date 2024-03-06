import { QuizTypeEnums, VisibilityEnums } from "../../Enums/Enums";

export interface IGetAll {
   isRemoved: boolean;
}

export interface IGetByType {
   isRemoved: boolean;
   type: QuizTypeEnums;
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