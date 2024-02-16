export enum QuestionEnums {
   MULTIPLE_CHOICE = 'Multiple Choice',
   TRUE_FALSE = 'True/False',
   FILL_IN_THE_BLANK = 'Filling the Blank'
}

export enum PointEnums {
   STANDART = 'Standart',
   DOUBLE_UP = 'Double Up',
}

export enum CorrectOptionEnums {
   SINGLE_OPTION = 'Single Option',
   MULTIPLE_OPTIONS = 'Multiple Options',
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