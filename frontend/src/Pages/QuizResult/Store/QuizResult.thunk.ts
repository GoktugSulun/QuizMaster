import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { QuizResultType } from "../Types/QuizResultTypes";
import { QuizResultActions } from "./QuizResult.slice";

const QuizResultThunks = {
   getQuizResult: (quizResultId: string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ_RESULTS}/${quizResultId}`,
      key: 'getQuizResult',
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizResultType[];
         thunkAPI.dispatch(QuizResultActions.setQuizResult(payload));
      }
   }),
};

export default QuizResultThunks;
