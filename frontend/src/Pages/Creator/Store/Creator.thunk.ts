import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { CreatorActions } from "./Creator.slice";
import { type QuizWithQuestions, type QuizType, type QuizWithIdType, type QuestionType, type QuestionWithIdType, type EditQuizType } from "../Types/CreatorTypes";
import { snackbar } from "@/Core/Utils";

const CreatorThunks = {
   createQuiz: (payload: QuizType, files: File | null) => request({
      method: 'POST',
      url: ApiURL.QUIZ,
      payload,
      files,
      key: 'createQuiz',
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizWithIdType;
         thunkAPI.dispatch(CreatorActions.setQuiz(payload));
      },
   }),
   editQuiz: ({ id, ...payload }: EditQuizType, files: File | null) => request({
      method: 'PUT',
      url: `${ApiURL.QUIZ}/${id}`,
      key: 'editQuiz',
      payload,
      files,
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizWithIdType;
         thunkAPI.dispatch(CreatorActions.setQuiz(payload));
         snackbar("Quiz settings has been updated successfully");
      },
   }),
   getQuizById: (id: string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ}/${id}`,
      key: 'getQuizById',
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizWithIdType;
         thunkAPI.dispatch(CreatorActions.setQuiz(payload));
      },
   }),
   getQuizByIdWithQuestions: (id: string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ}/${id}/withQuestions`,
      key: 'getQuizByIdWithQuestions',
      success: ({ data, thunkAPI }) => {
         const { questions, ...quiz } = data as QuizWithQuestions;
         thunkAPI.dispatch(CreatorActions.setQuiz(quiz));
         thunkAPI.dispatch(CreatorActions.setQuestions(questions));
      },
   }),
   createQuestions: (payload: QuestionType[]) => {
      console.log(payload, " payload");
      
      request({
         method: 'POST',
         url: `${ApiURL.QUESTION}`,
         key: 'createQuestions',
         payload,
         success: ({ data, thunkAPI }) => {
            const payload = data as QuestionWithIdType[];
            thunkAPI.dispatch(CreatorActions.setQuestions(payload));
         },
      })
   },
   editQuestions: (payload: { quizId: string; questions: QuestionWithIdType[] }) => request({
      method: 'PUT',
      url: `${ApiURL.QUESTION}/${payload.quizId}`,
      key: 'editQuestions',
      payload: payload.questions,
      success: ({ data, thunkAPI }) => {
         const payload = data as QuestionWithIdType[];
         thunkAPI.dispatch(CreatorActions.setQuestions(payload));
      },
   })
};

export default CreatorThunks;
