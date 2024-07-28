export interface IQuestionsWithResults { 
   id: string; 
   name: string; 
   selectedOptionId: string; 
   options: { 
      id: string; 
      name: string; 
      isCorrect: boolean 
   }[]; 
}

export interface IGetAll {
   quizId: string;
}

export interface IGetById {
   quizResultId: string;
}

export interface IAnswer { 
   questionId: string; 
   answerId: string; 
}

export interface ICreate { 
   quizId: string; 
   quizSessionId: string;
   answers: IAnswer[];
   completeTime: number; 
}