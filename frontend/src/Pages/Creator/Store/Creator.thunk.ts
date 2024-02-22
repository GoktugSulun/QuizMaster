import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { CreatorActions } from "./Creator.slice";
import { type QuizType, type QuizWithIdType } from "../Model/Creator.model";

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
   })
};

export default CreatorThunks;
