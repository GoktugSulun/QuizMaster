
export type OptionType = {
   id?: string | number;
   name: string; 
   isCorrect: boolean;
}

export type QuestionType = {
   id?: string | number;
   name: string;
   options: OptionType[];
}