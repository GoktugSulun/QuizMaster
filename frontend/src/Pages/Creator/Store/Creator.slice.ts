import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VisibilityEnums, type QuestionWithIdType, type QuizWithIdType } from '../Model/Creator.model';

const NAME = 'Creator';

type InitialStateTypes = {
  isOpenQuizSettingsModal: boolean;
  quiz: QuizWithIdType,
  questions: QuestionWithIdType[]
}

const initialState: InitialStateTypes = {
  isOpenQuizSettingsModal: true,
  quiz: {
    id: "",
    name: "",
    description: "",
    visibility: VisibilityEnums.PUBLIC,
    image: null,
    totalTime: 0
  },
  questions: []
};

const CreatorSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setIsOpenQuizSettingsModal: (state, action: PayloadAction<"OPEN" | "CLOSE" | "TOGGLE">) => {
      const valueMap = {
        "TOGGLE": !state.isOpenQuizSettingsModal,
        "OPEN": true,
        "CLOSE": false
      }
      state.isOpenQuizSettingsModal = valueMap[action.payload];
    },
    setQuiz: (state, action: PayloadAction<QuizWithIdType>) => {
      state.quiz = action.payload;
    },
    setQuestions: (state, action: PayloadAction<QuestionWithIdType[]>) => {
      state.questions = action.payload;
    }
  },  
});

const { reducer, actions } = CreatorSlice;

export const CreatorActions = actions;
export default { [NAME]: reducer };