import { CorrectOptionEnums, PointEnums, QuestionEnums } from "../../Enums/Enums";

export interface IQuestion {
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
   }
}