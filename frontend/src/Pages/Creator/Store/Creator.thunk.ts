import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { CreatorActions } from "./Creator.slice";
import { type QuizWithQuestions, type QuizType, type QuizWithIdType, type QuestionType, type QuestionWithIdType } from "../Types/CreatorTypes";
import { snackbar } from "@/Core/Utils";

const CreatorThunks = {
   createQuiz: (payload: Omit<QuizType, "image">, files: File | null) => request({
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
   editQuiz: ({ id, image: file, ...payload }: QuizType & { id: string; }) => request({
      method: 'PUT',
      url: `${ApiURL.QUIZ}/${id}`,
      key: 'editQuiz',
      payload,
      files: file,
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
   createQuestions: (payload: QuestionType[]) => request({
      method: 'POST',
      url: `${ApiURL.QUESTION}`,
      key: 'createQuestions',
      payload,
      success: ({ data, thunkAPI }) => {
         const payload = data as QuestionWithIdType[];
         thunkAPI.dispatch(CreatorActions.setQuestions(payload));
      },
   }),
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
