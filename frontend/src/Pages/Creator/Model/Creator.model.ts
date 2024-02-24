export enum QuestionEnums {
   MULTIPLE_CHOICE = 'Multiple Choice',
   TRUE_FALSE = 'True/False',
   SHORT_ANSWER = 'Short Answer'
}

export enum PointEnums {
   STANDART = 'Standart',
   DOUBLE_UP = 'Double Up',
}

export enum CorrectOptionEnums {
   SINGLE_OPTION = 'Single Option',
   MULTIPLE_OPTIONS = 'Multiple Options',
}

export enum VisibilityEnums {
   PRIVATE = 'Private',
   PUBLIC = 'Public',
}

export type QuizType = {
   name: string;
   description: string;
   visibility: VisibilityEnums;
   image: string | null;
   totalTime: number;
}

export type QuizWithIdType = QuizType & { id: string; }

export type OptionType = {
   name: string; 
   isCorrect: boolean;
}

export type OptionWithIdType = OptionType & { id: string; }

export type QuestionType = {
   name: string;
   options: OptionType[];
   type: QuestionEnums;
   point: PointEnums;
   optionType: CorrectOptionEnums;
}

export type QuestionWithIdType = Omit<QuestionType, "options"> 
   & { id: string; options: OptionWithIdType[] }

export type QuizWithQuestions = QuizWithIdType & {
   questions: QuestionWithIdType[]
}