
export type OptionType = {
   id?: string;
   name: string; 
   isCorrect: boolean;
}

export type QuestionType = {
   id?: string;
   name: string;
   options: OptionType[];
}

export type ActiveSlideType = QuestionType & { index: number; }