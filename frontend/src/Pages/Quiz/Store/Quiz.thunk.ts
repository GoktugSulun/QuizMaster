import { request } from "@/Core/Request";
import { QuizActions } from "./Quiz.slice";
import { ApiURL } from "@/Constants/ApiURL";
import { type QuizWithQuestions } from "@/Pages/Creator/Types/CreatorTypes";
import { type QuizAlreadyStarted } from "../Types/QuizTypes";

export const QuizThunks = {
   getQuizByIdWithQuestions: (id: string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ}/${id}/withQuestions`,
      key: 'getQuizByIdWithQuestions',
      success: ({ data, thunkAPI }) => {
         const quiz = data as QuizWithQuestions;
         thunkAPI.dispatch(QuizActions.setQuiz(quiz));
      },
   }),
   getQuizAlreadyStarted: (id: string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ_SESSION}/alreadyStarted/${id}`,
      key: 'getQuizAlreadyStarted',
      success: ({ data, thunkAPI }) => {
         const quiz = data as QuizAlreadyStarted;
         thunkAPI.dispatch(QuizActions.setQuizSession(quiz.quizSession));
      },
   }),
}