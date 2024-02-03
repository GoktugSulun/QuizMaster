import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Quiz, type Answer } from '../Models/Quiz.model';

const NAME = 'Quiz';

type InitialStateTypes = {
   quiz: Quiz,
   answers: Answer[]
}

const initialState: InitialStateTypes = {
   quiz: {
      id: null,
      time: 0,
      name: '',
      description: '',
      questions: []
   },
   answers: []// data for backend
};

const QuizSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      setQuiz: (state, action: PayloadAction<Quiz>) => {
         state.quiz = action.payload;
         state.answers = action.payload.questions.map((question) => ({ questionId: question.id, answerId: null }))
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