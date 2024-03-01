import { VisibilityEnums } from "./Enums";

export interface IQuiz {
   id: string;
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: string | null;
   totalTime: number;
   isFavorite: boolean;
   isSaved: boolean;
   createdAt: string;
   updatedAt: string;
}
