import { CorrectOptionEnums, PointEnums, QuestionEnums } from "../../Enums/Enums";

interface IOption {
   name: String;
   isCorrect: boolean;
}

export interface ICreate {
   quizId: String;
   name: String;
   options: IOption[];
}

export interface IGet {
   quizId: String;
   isRemoved: boolean;
}

export interface IEdit {
   quizId: String;
   questions: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      quizId: String;
      name: String;
      optionType: CorrectOptionEnums | null;
      point: PointEnums;
      type: QuestionEnums;
      isRemoved: Boolean;
      options: {
         id: string;
         createdAt: Date;
         updatedAt: Date;
         name: String;
         isCorrect: boolean;
      }[],
   }[]
}