import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type StartQuizResponseTypes, type QuizRules } from "../Types/QuizRulesTypes";
import { VisibilityEnums } from '@/Pages/Creator/Types/CreatorTypes';

const NAME = 'QuizRules';

type InitialStateTypes = {
   quizRules: QuizRules,
   startQuizResponse: StartQuizResponseTypes | null
}

const initialState: InitialStateTypes = {
   quizRules: {
      id: '',
      userId: "", 
      createdAt: "", 
      updatedAt: "", 
      isRemoved: false,
      name: "",
      description: "",
      visibility: VisibilityEnums.PRIVATE,
      image: null,
      totalTime: 0,
      maxAttempt: 1,
      numberOfQuestions: 0,
      questionTime: null,
      repeat: null,
      multipleChoice: false,
      trueFalse: false,
      shortAnswer: false,
   },
   startQuizResponse: null
};

const QuizRulesSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      reset: () => initialState,
      setQuizRules: (state, action: PayloadAction<QuizRules>) => {
         state.quizRules = action.payload;
      },
      setStartQuizResponse: (state, action: PayloadAction<StartQuizResponseTypes>) => {
         state.startQuizResponse = action.payload;
      },
   },
});

const { reducer, actions } = QuizRulesSlice;

export const QuizRulesActions = actions;
export default { [NAME]: reducer };