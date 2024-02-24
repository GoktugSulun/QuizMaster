import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { CreatorActions } from "./Creator.slice";
import { QuizWithQuestions, type QuizType, type QuizWithIdType, QuestionType, QuestionWithIdType } from "../Model/Creator.model";

const CreatorThunks = {
   createQuiz: (payload: QuizType) => request({
      method: 'POST',
      url: ApiURL.QUIZ,
      payload,
      key: 'createQuiz',
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizWithIdType;
         thunkAPI.dispatch(CreatorActions.setQuiz(payload));
      },
   }),
   editQuiz: ({ id, image: file, ...payload }: Omit<QuizWithIdType, "image"> & { image: File | null } ) => request({
      method: 'PUT',
      url: `${ApiURL.QUIZ}/${id}`,
      key: 'editQuiz',
      payload,
      files: file,
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizWithIdType;
         thunkAPI.dispatch(CreatorActions.setQuiz(payload));
      },
   }),
   getQuizById: (id: number | string) => request({
      method: 'GET',
      url: `${ApiURL.QUIZ}/${id}`,
      key: 'getQuizById',
      success: ({ data, thunkAPI }) => {
         const payload = data as QuizWithIdType;
         thunkAPI.dispatch(CreatorActions.setQuiz(payload));
      },
   }),
   getQuizByIdWithQuestions: (id: number | string) => request({
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
   editQuestions: (payload: QuestionType[] & { id?: string; }) => request({
      method: 'PUT',
      url: `${ApiURL.QUESTION}`,
      key: 'editQuestions',
      payload,
      success: ({ data, thunkAPI }) => {
         const payload = data as QuestionWithIdType[];
         thunkAPI.dispatch(CreatorActions.setQuestions(payload));
      },
   }),
};

export default CreatorThunks;
