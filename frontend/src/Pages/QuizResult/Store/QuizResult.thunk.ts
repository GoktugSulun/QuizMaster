import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { type QuizResultType, type ResultType } from "../Types/QuizResultTypes";
import { QuizResultActions } from "./QuizResult.slice";

const QuizResultThunks = {
   getQuizResult: (quizResultId: string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ_RESULTS}/${quizResultId}`,
      key: 'getQuizResult',
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizResultType;
         thunkAPI.dispatch(QuizResultActions.setQuizResult(payload));
      }
   }),
   getAllSessions: (quizId: string) => request({
      method: 'GET',
      url: `${ApiURL.ALL_QUIZ_RESULTS}/${quizId}`,
      key: 'getAllSessions',
      success: ({ data, thunkAPI }) => {
         const payload = data as ResultType[];
         thunkAPI.dispatch(QuizResultActions.setAllResults(payload));
      }
   })
};

export default QuizResultThunks;
