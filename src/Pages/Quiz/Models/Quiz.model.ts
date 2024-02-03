export type Option = {
   id: number;
   name: string;
   isCorrect: boolean;
}

export type Question = {
   id: number;
   name: string;
   image?: string;
   options: Option[]
}

export type Answer = {
   questionId: number,
} & ( 
   { answerId: number | null, answer?: never } 
   | { answerId?: never, answer: string | null }
)


