export interface IAnswer { 
   questionId: string; 
   answerdId: string; 
}

export interface IStart { 
   quizId: string; 
}

export interface IComplete { 
   quizId: string; 
   answers: IAnswer[]; 
   completeTime: number; 
}

export interface IEnd { 
   quizId: string; 
}

export interface IGetAlreadyStarted { 
   quizId: string; 
}