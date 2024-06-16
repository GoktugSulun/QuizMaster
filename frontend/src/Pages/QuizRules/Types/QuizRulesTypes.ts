import { type QuizWithIdType } from "@/Pages/Creator/Types/CreatorTypes";

export type QuizRules = Omit<QuizWithIdType, "image"> & {
   image: null | string;
   numberOfQuestions: number;
   questionTime: number | null;
   repeat: number | null;
   multipleChoice: boolean;
   shortAnswer: boolean;
   trueFalse: boolean;
}