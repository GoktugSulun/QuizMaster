import { QuizStatusEnums } from "../../Enums/Enums"

export type IStartResponse = { 
   status: QuizStatusEnums.START_NEW_QUIZ
} | {
   status: QuizStatusEnums.CONTINUE_STARTED_QUIZ;
   totalRepeat: number;
   totalAttempt: number;
}