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
   quizId: string;
}

export interface IAnswer { 
   questionId: string; 
   answerdId: string; 
}

export interface ICreate { 
   quizId: string; 
   quizSessionId: string;
   answers: IAnswer[];
   completeTime: number; 
}