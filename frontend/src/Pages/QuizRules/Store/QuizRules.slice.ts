import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type QuizRules } from "../Types/QuizRulesTypes";

const NAME = 'QuizRules';

type InitialStateTypes = {
   quizRules: QuizRules
}

const initialState: InitialStateTypes = {
   quizRules: {}
};

const QuizRulesSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      setQuizRules: (state, action: PayloadAction<QuizRules>) => {
         state.quizRules = action.payload;
      },
   },
});

const { reducer, actions } = QuizRulesSlice;

export const QuizRulesActions = actions;
export default { [NAME]: reducer };