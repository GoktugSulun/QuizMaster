export type Option = {
   id: number;
   name: string;
   isCorrect: boolean;
}

export type Question = {
   id: number;
   name: string;
   time: number;
   image?: string;
   options: Option[];
   selectedOptionId?: number;
}

export type Quiz = {
   id: number | null;
   time: number;
   name: string;
   description: string;
   questions: Question[];
}

export type Answer = {
   questionId: number,
} & ( 
   { answerId: number | null, answer?: never } 
   | { answerId?: never, answer: string | null }
)


