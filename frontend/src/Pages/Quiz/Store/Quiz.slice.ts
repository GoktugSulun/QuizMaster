import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Answer } from '../Types/QuizTypes';
import { VisibilityEnums, type QuizWithQuestions } from '@/Pages/Creator/Types/CreatorTypes';

const NAME = 'Quiz';

type InitialStateTypes = {
   quiz: QuizWithQuestions,
   answers: Answer[]
}

const initialState: InitialStateTypes = {
   quiz: {
      id: "", 
      userId: "", 
      createdAt: "", 
      updatedAt: "", 
      isRemoved: false,
      questions: [],
      name: "",
      description: "",
      visibility: VisibilityEnums.PRIVATE,
      image: null,
      totalTime: 0,
   },
   answers: []// data for backend
};

const QuizSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      setQuiz: (state, action: PayloadAction<QuizWithQuestions>) => {
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