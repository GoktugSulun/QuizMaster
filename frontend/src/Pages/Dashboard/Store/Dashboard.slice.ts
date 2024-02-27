import { QuizWithIdType } from '@/Pages/Creator/Model/Creator.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const NAME = 'Dashboard';

export type CreatedQuizType = Omit<QuizWithIdType, "image"> & { image: string | null }

type InitialStateTypes = {
  quizzes: CreatedQuizType[]
}

const initialState: InitialStateTypes = {
  quizzes: []
};

const DashboardSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<CreatedQuizType[]>) => {
      state.quizzes = action.payload;
    }
  },
});

const { reducer, actions } = DashboardSlice;

export const DashboardActions = actions;
export default { [NAME]: reducer };