import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VisibilityEnums, type QuestionWithIdType, type QuizWithIdType } from '../Types/CreatorTypes';

const NAME = 'Creator';

type InitialStateTypes = {
  isOpenQuizSettingsModal: boolean;
  isOpenInfoModal: boolean;
  isEditing: boolean;
  quiz: QuizWithIdType,
  questions: QuestionWithIdType[]
}

const initialState: InitialStateTypes = {
  isOpenQuizSettingsModal: false,
  isOpenInfoModal: false,
  isEditing: false,
  quiz: {
    id: "",
    name: "",
    description: "",
    maxAttempt: 1,
    visibility: VisibilityEnums.PUBLIC,
    image: null,
    totalTime: 0,
    createdAt: "", 
    updatedAt: "",
    userId: "",
    isRemoved: false,
  },
  questions: []
};

const CreatorSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    reset: () => initialState,
    setIsOpenQuizSettingsModal: (state, action: PayloadAction<"OPEN" | "CLOSE" | "TOGGLE">) => {
      const valueMap = {
        "TOGGLE": !state.isOpenQuizSettingsModal,
        "OPEN": true,
        "CLOSE": false
      }
      state.isOpenQuizSettingsModal = valueMap[action.payload];
    },
    setIsOpenInfoModal: (state, action: PayloadAction<"OPEN" | "CLOSE" | "TOGGLE">) => {
      const valueMap = {
        "TOGGLE": !state.isOpenInfoModal,
        "OPEN": true,
        "CLOSE": false
      }
      state.isOpenInfoModal = valueMap[action.payload];
    },
    setQuiz: (state, action: PayloadAction<QuizWithIdType>) => {
      state.quiz = action.payload;
    },
    setQuestions: (state, action: PayloadAction<QuestionWithIdType[]>) => {
      state.questions = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },  
});

const { reducer, actions } = CreatorSlice;

export const CreatorActions = actions;
export default { [NAME]: reducer };