import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IQuizResponse } from '@/Constants/ResponseTypes';
import { RouteEnums } from '@/Constants/Enums';
import { type ActivePathnameTypes } from '../Types/DashboardTypes';

const NAME = 'Dashboard';

type InitialStateTypes = {
  page: number;
  limit: number;
  canBeMoreQuiz: boolean;
  activePathname: ActivePathnameTypes,
  quizzes: IQuizResponse[];
}

const initialState: InitialStateTypes = {
  quizzes: [],
  page: 1,
  limit: 10,
  activePathname: RouteEnums.FEED,
  canBeMoreQuiz: true
};

const DashboardSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<IQuizResponse[]>) => {
      state.quizzes = [...state.quizzes, ...action.payload];
      if (action.payload.length < state.limit) {
        state.canBeMoreQuiz = false;
      }
    },
    setQuiz: (state, action: PayloadAction<IQuizResponse>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.id);
      state.quizzes[index] = action.payload;
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
    },
    updateFavoriteField: (state, action: PayloadAction<{ quizId: string, value: boolean; }>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.quizId);
      state.quizzes[index].isFavorite = action.payload.value;
    },
    updateSaveField: (state, action: PayloadAction<{ quizId: string, value: boolean; }>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.quizId);
      state.quizzes[index].isSaved = action.payload.value;
    },
    setPage: (state, action: PayloadAction<{ newPage: number; }>) => {
      state.page = action.payload.newPage;
      if (action.payload.newPage === 1) {
        state.quizzes = [];
        state.canBeMoreQuiz = true;
      }
    },
    setActivePathname: (state, action: PayloadAction<ActivePathnameTypes>) => {
      state.activePathname = action.payload;
      state.quizzes = [];
      state.canBeMoreQuiz = true;
    }
  },
});

const { reducer, actions } = DashboardSlice;

export const DashboardActions = actions;
export default { [NAME]: reducer };