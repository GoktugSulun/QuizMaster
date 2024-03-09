import { CorrectOptionEnums, PointEnums, QuestionEnums, VisibilityEnums } from "../../Enums/Enums";

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
   createdAt: Date;
   updatedAt: Date;
}

export interface IQuizWithQuestions extends IQuizResponse {
   questions: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      quizId: String;
      name: String;
      optionType: CorrectOptionEnums | null;
      point: PointEnums;
      type: QuestionEnums;
      options: {
         id: string;
         createdAt: Date;
         updatedAt: Date;
         name: String;
         isCorrect: boolean;
      }[],
      isRemoved: Boolean;
   }[]
}
