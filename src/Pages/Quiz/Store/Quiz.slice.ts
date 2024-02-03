import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Answer, type Question } from '../Models/Quiz.model';

const NAME = 'Quiz';

type InitialStateTypes = {
   questions: Question[];
   answers: Answer[]
}

const initialState: InitialStateTypes = {
  questions: [],
  answers: []// data for backend
};

const QuizSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      setQuestions: (state, action: PayloadAction<Question[]>) => {
         state.questions = action.payload;
         state.answers = action.payload.map((question) => ({ questionId: question.id, answerId: null }))
      },
      setAnswer: (state, action: PayloadAction<Answer>) => {
         const { questionId } = action.payload;
         const index = state.answers.findIndex((answer) => answer.questionId === questionId)
         state.answers[index] = action.payload;
      }
   },
});

const { reducer, actions } = QuizSlice;

export const QuizActions = actions;
export default { [NAME]: reducer };