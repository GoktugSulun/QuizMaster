export interface IQuestionsWithResults { 
   id: string; 
   name: string; 
   selectedOptionId: string; 
   options: { id: string; name: string; isCorrect: boolean }[]; 
}