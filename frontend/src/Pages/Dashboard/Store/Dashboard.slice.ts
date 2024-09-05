import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IQuizResponse } from '@/Constants/ResponseTypes';
import { VisibilityEnums } from '@/Pages/Creator/Types/CreatorTypes';

const NAME = 'Dashboard';

type InitialStateTypes = {
  page: number;
  limit: number;
  canBeMoreQuiz: boolean;
  quizzes: IQuizResponse[];
  isOpenConfirmModal: boolean;
  targetQuiz: IQuizResponse;
}

const initialState: InitialStateTypes = {
  quizzes: [],
  page: 1,
  limit: 10,
  canBeMoreQuiz: true,
  isOpenConfirmModal: false,
  targetQuiz: {
    id: "",
    name: "",
    description: "",
    visibility: VisibilityEnums.PUBLIC,
    image: "",
    totalTime: 0,
    creatorId: "",
    isFavorite: false,
    isSaved: false,
    createdAt: "",
    updatedAt: "",
  }
};

const DashboardSlice = createSlice({  
  name: NAME,
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<{ data: IQuizResponse[]; page: number; }>) => {
      if (action.payload.page === 1) {
        state.quizzes = action.payload.data;
      } else {
        state.quizzes = [...state.quizzes, ...action.payload.data];
      }
      if (action.payload.data.length < state.limit) {
        state.canBeMoreQuiz = false;
      } else {
        state.canBeMoreQuiz = true;
      }
    },
    setQuiz: (state, action: PayloadAction<IQuizResponse>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.id);
      state.quizzes[index] = action.payload;
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
    },
    updateFavoriteField: (state, action: PayloadAction<{ quizId: string; value: boolean; updateStore?: boolean; }>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.quizId);
      state.quizzes[index].isFavorite = action.payload.value;
      if (action.payload.updateStore) {
        state.quizzes.splice(index, 1);
      }
    },
    updateSaveField: (state, action: PayloadAction<{ quizId: string, value: boolean; updateStore?: boolean; }>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.quizId);
      state.quizzes[index].isSaved = action.payload.value;
      if (action.payload.updateStore) {
        state.quizzes.splice(index, 1);
      }
    },
    setPage: (state, action: PayloadAction<{ newPage: number; }>) => {
      state.page = action.payload.newPage;
    },
    setIsOpenConfirmModal: (state, action: PayloadAction<"OPEN" | "CLOSE" | "TOGGLE">) => {
      const valueMap = {
        "TOGGLE": !state.isOpenConfirmModal,
        "OPEN": true,
        "CLOSE": false
      }
      state.isOpenConfirmModal = valueMap[action.payload];
    },
    setTargetQuiz: (state, action: PayloadAction<IQuizResponse>) => {
      state.targetQuiz = action.payload;
    }
  },
});

const { reducer, actions } = DashboardSlice;

export const DashboardActions = actions;
export default { [NAME]: reducer };