import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VisibilityEnums, type QuestionWithIdType, type QuizWithIdType } from '../Model/Creator.model';

const NAME = 'Creator';

type InitialStateTypes = {
  isOpenQuizSettingsModal: boolean;
  quiz: QuizWithIdType,
  questions: QuestionWithIdType[]
}

const initialState: InitialStateTypes = {
  isOpenQuizSettingsModal: false,
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
      console.log('girdim => ', action.payload);
      
      state.quiz = {
        id: "111",
        name: "aaa",
        description: "bbb",
        visibility: VisibilityEnums.PUBLIC,
        image: null,
        totalTime: 23232
      };
    },
    setQuestions: (state, action: PayloadAction<QuestionWithIdType[]>) => {
      state.questions = action.payload;
    }
  },  
});

const { reducer, actions } = CreatorSlice;

export const CreatorActions = actions;
export default { [NAME]: reducer };
// export default reducer;