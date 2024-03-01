import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IQuiz } from '../../../../../common/ApiModels';

const NAME = 'Dashboard';

type InitialStateTypes = {
  quizzes: IQuiz[]
}

const initialState: InitialStateTypes = {
  quizzes: []
};

const DashboardSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<IQuiz[]>) => {
      state.quizzes = action.payload;
    },
    setQuiz: (state, action: PayloadAction<IQuiz>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.id);
      state.quizzes[index] = action.payload;
    },
    updateFavoriteField: (state, action: PayloadAction<{ quizId: string, value: boolean; }>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.quizId);
      state.quizzes[index].isFavorite = action.payload.value;
    },
    updateSaveField: (state, action: PayloadAction<{ quizId: string, value: boolean; }>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.quizId);
      state.quizzes[index].isSaved = action.payload.value;
    }
  },
});

const { reducer, actions } = DashboardSlice;

export const DashboardActions = actions;
export default { [NAME]: reducer };