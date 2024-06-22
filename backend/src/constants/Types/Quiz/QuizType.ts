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
   creatorId?: string;
}

export interface IGetAll {
   isRemoved: boolean;
   page: number;
   limit: number;
   creatorId?: string;
   visibility?: VisibilityEnums;
}

export interface ICreate {
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: File | null;
   totalAttempt: number;
   totalTime: number;
   creatorId: string;
}

export interface IEdit {
   body: ICreate;
   id: string;
}

export interface IDelete {
   id: string;
}

export interface IGetRulesById {
   id: string;
   isRemoved: boolean;
}
