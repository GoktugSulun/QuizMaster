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
      quizId: string;
      name: string;
      optionType: CorrectOptionEnums | null;
      point: PointEnums;
      type: QuestionEnums;
      options: {
         id: string;
         createdAt: Date;
         updatedAt: Date;
         name: string;
         isCorrect: boolean;
      }[],
      isRemoved: boolean;
   }[]
}

export interface IQuizRules extends IQuizResponse {
   numberOfQuestions: number;
   questionTime: null;
   repeat: number;
   multipleChoice: boolean;
   trueFalse: boolean;
   shortAnswer: boolean;
}
