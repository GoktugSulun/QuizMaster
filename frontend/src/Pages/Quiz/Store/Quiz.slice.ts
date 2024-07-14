import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type QuizSessionResponse, type Answer } from '../Types/QuizTypes';
import { VisibilityEnums, type QuizWithQuestions } from '@/Pages/Creator/Types/CreatorTypes';

const NAME = 'Quiz';

type InitialStateTypes = {
   quiz: QuizWithQuestions,
   quizSession: QuizSessionResponse,
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
      maxAttempt: 1,
      name: "",
      description: "",
      visibility: VisibilityEnums.PRIVATE,
      image: null,
      totalTime: 0,
   },
   quizSession: {
      id: "",   
      createdAt: null,
      updatedAt: null,
      quizId: "",
      userId: "",
      status: null,
      startTime: 0,
      totalTime: 0,
      maxAttempt: 0,
      totalAttempt: 0,
      answers: []
   },
   answers: [] // data for backend
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
      },
      setQuizSession: (state, action: PayloadAction<QuizSessionResponse>) => {
         state.quizSession = action.payload;
      }
   },
});

const { reducer, actions } = QuizSlice;

export const QuizActions = actions;
export default { [NAME]: reducer };