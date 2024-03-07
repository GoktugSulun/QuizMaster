import { VisibilityEnums } from "@/Pages/Creator/Types/CreatorTypes";

export interface IQuizResponse {
   id: string;
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: string | null;
   totalTime: number;
   creatorId: string;
   isFavorite: boolean;
   isSaved: boolean;
   createdAt: string;
   updatedAt: string;
}
