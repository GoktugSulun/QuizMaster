import { CorrectOptionEnums, PointEnums, QuestionEnums, QuizStatusEnums, VisibilityEnums } from "@/Constants/Enums";
import { type QuizWithQuestions, type QuizWithIdType } from "@/Pages/Creator/Types/CreatorTypes";
import { type QuizSessionResponse } from "@/Pages/Quiz/Types/QuizTypes";

export type QuizRules = Omit<QuizWithIdType, "image"> & {
   image: null | string;
   numberOfQuestions: number;
   questionTime: number | null;
   repeat: number | null;
   multipleChoice: boolean;
   shortAnswer: boolean;
   trueFalse: boolean;
}

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

export type StartQuizResponseTypes = { 
   status: QuizStatusEnums.START_NEW_QUIZ;
   quiz: QuizWithQuestions; // Todo: Service'den dönen tipi düzeltiğinde burayı da düzelt, "isCorrect" datası gelmemeli
   quizSession: QuizSessionResponse;
} | {
   status: QuizStatusEnums.CONTINUE_STARTED_QUIZ;
   quiz: QuizWithQuestions; // Todo: Service'den dönen tipi düzeltiğinde burayı da düzelt, "isCorrect" datası gelmemeli
   quizSession: QuizSessionResponse;
} | {
   status: QuizStatusEnums.EXCEED_ATTEMPT;
   maxAttempt: number;
   totalAttempt: number;
   date: Date;
} | {
   status: QuizStatusEnums.TIMEOUT;
   startTime: number;
   totalTime: number;
   date: Date;
}