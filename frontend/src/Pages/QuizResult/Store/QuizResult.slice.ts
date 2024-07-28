import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuizResultType } from "../Types/QuizResultTypes";

const NAME = 'QuizResult';

type InitialStateTypes = {
   quizResult: QuizResultType
}

const initialState: InitialStateTypes = {
   quizResult: {}
};

const QuizResultSlice = createSlice({  
   name: NAME,
   initialState,
   reducers: {
      setQuizResult: (state, action: PayloadAction<QuizResultType>) => {
         state.quizResult = action.payload;
      }
   },
});

const { reducer, actions } = QuizResultSlice;

export const QuizResultActions = actions;
export default { [NAME]: reducer };