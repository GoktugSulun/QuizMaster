interface IOption {
   name: String;
   isCorrect: boolean;
}

export interface ICreate {
   quizId: String;
   name: String;
   options: IOption[];
}