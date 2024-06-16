import { request } from "@/Core/Request";
import { ApiURL } from "@/Constants/ApiURL";
import { QuizRulesActions } from "./QuizRules.slice";
import { type QuizRules } from "../Types/QuizRulesTypes";

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
}