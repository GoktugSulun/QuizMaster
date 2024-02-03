import { request } from "@/Core/Request";
import { QuizActions } from "./Quiz.slice";
import { type Question } from "../Models/Quiz.model";


export const QuizThunks = {
   getQuestions: () => request({
      url: `/questions`,
      key: 'getQuestions',
      method: 'GET',
      success: ({ data, thunkAPI }) => {
         thunkAPI.dispatch(QuizActions.setQuestions(data));
      }
   }),
}