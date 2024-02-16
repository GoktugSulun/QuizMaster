export enum QuestionEnums {
   MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
   TRUE_FALSE = 'TRUE_FALSE',
   FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK'
}

export enum PointEnums {
   STANDART = 'STANDART',
   DOUBLE_UP = 'DOUBLE_UP',
}

export enum CorrectOptionEnums {
   SINGLE_OPTION = 'SINGLE_OPTION',
   MULTIPLE_OPTIONS = 'MULTIPLE_OPTIONS',
}

export type OptionType = {
   id?: string | number;
   name: string; 
   isCorrect: boolean;
}

export type QuestionType = {
   id?: string | number;
   name: string;
   options: OptionType[];
   type: QuestionEnums;
   point: PointEnums;
   optionType: CorrectOptionEnums;
}