import { request } from "@/Core/Request";
import { ApiURL } from "@/Constants/ApiURL";
import { QuizRulesActions } from "./QuizRules.slice";
import { type QuizRules } from "../Types/QuizRulesTypes";
import { QuizActions } from "@/Pages/Quiz/Store/Quiz.slice";

export const QuizRulesThunks = {
   getQuizRulesById: (id: string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ}/${id}/rules`,
      key: 'getQuizRulesById',
      success: ({ data, thunkAPI }) => {
         const quizRules = data as QuizRules;
         thunkAPI.dispatch(QuizRulesActions.setQuizRules(quizRules));
      },
   }),
   startQuiz: (payload: { quizId: string }) => request({
      method: 'POST',
      url: ApiURL.START_QUIZ_SESSION,
      key: 'startQuiz',
      payload,
      success: ({ data, thunkAPI }) => {
         const quizRules = data; // todo: type oluştur
         console.log(quizRules, " quizRules");
         
         // thunkAPI.dispatch(QuizActions.setQuiz(data));
      },
   })
}