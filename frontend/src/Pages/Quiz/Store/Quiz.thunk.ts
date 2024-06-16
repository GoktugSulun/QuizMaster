import { request } from "@/Core/Request";
import { QuizActions } from "./Quiz.slice";
import { ApiURL } from "@/Constants/ApiURL";
import { QuizWithQuestions } from "@/Pages/Creator/Types/CreatorTypes";

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
}