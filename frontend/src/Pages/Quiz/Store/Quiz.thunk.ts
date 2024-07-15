import { request } from "@/Core/Request";
import { QuizActions } from "./Quiz.slice";
import { ApiURL } from "@/Constants/ApiURL";
import { type QuizWithQuestions } from "@/Pages/Creator/Types/CreatorTypes";
import { type CompleteQuizSessionType, type SaveQuizSessionType } from "../Types/QuizTypes";

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
   saveQuizSession: (payload: SaveQuizSessionType) => request({
      method: 'PUT',
      url: `${ApiURL.QUIZ_SESSION}/save`,
      key: 'saveQuizSession',
      payload,
      success: () => {
         // TODO : bu parametereyi sil
         console.log("success saving");
      },
   }),
   completeQuizSession: (payload: CompleteQuizSessionType) => request({
      method: 'PUT',
      url: `${ApiURL.QUIZ_SESSION}/complete`,
      key: 'completeQuizSession',
      payload,
      success: ({ data, thunkAPI }) => {
         console.log(data, " data");
         console.log("success saving");
      },
   }),
}