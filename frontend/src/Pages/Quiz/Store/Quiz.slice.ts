import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type QuizSessionResponse, type Answer, type QuizResultResponse } from '../Types/QuizTypes';
import { QuestionEnums, VisibilityEnums, type QuizWithQuestions } from '@/Pages/Creator/Types/CreatorTypes';

const NAME = 'Quiz';

type InitialStateTypes = {
   quiz: QuizWithQuestions;
   quizSession: QuizSessionResponse;
   answers: Answer[];
   isOpenInfoModal: boolean;
   quizResultResponse: QuizResultResponse
}

const quizInitialState = {
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
   image: "",
   totalTime: 0
}

const quizSessionInitialState = {
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
}

const quizResultInitialState = {
   id: "",
   createdAt: null,
   updatedAt: null,
   quizId: "",
   userId: "",
   totalQuestion: 0,
   totalCorrect: 0,
   totalWrong: 0,
   totalBlank: 0,
   grade: 0,
   spentDuration: 0,
   totalDuration: 0,
   completedDate: null,
   questionsWithResults: []
}

const initialState: InitialStateTypes = {
   quiz: quizInitialState,
   quizSession: quizSessionInitialState,
   answers: [], // data for backend
   isOpenInfoModal: false,
   quizResultResponse: quizResultInitialState
};

const QuizSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      reset: () => initialState,
      setQuiz: (state, action: PayloadAction<QuizWithQuestions>) => {
         state.quiz = action.payload;
         if (!state.answers.length) {
            state.answers = action.payload.questions.map((question) => {
               const shortAnswer = question.type === QuestionEnums.SHORT_ANSWER;
               if (shortAnswer) {
                  return { questionId: question.id, answers: [] };
               }
               return { questionId: question.id, answerId: null };
            })
         }
      },
      setAnswer: (state, action: PayloadAction<Answer>) => {
         const { questionId } = action.payload;
         const index = state.answers.findIndex((answer) => answer.questionId === questionId)
         state.answers[index] = action.payload;
      },
      setAnswers: (state, action: PayloadAction<Answer[]>) => {
         const newAnswers = action.payload;
         state.answers = state.answers.map((answer) => {
            const newAnswer = newAnswers.find((newAnswer) => newAnswer.questionId === answer.questionId);
            if (newAnswer) {
               return newAnswer;
            } else {
               return answer;
            }
         })
      },
      setQuizSession: (state, action: PayloadAction<QuizSessionResponse>) => {
         state.quizSession = action.payload;
      },
      setIsOpenInfoModal: (state, action: PayloadAction<"CLOSE" | "OPEN" | "TOGGLE">) => {
         const valueMap = {
           "TOGGLE": !state.isOpenInfoModal,
           "OPEN": true,
           "CLOSE": false
         }
         state.isOpenInfoModal = valueMap[action.payload];
      },
      setQuizResultResponse: (state, action: PayloadAction<QuizResultResponse>) => {
         state.quizResultResponse = action.payload;
      } 
   },
});

const { reducer, actions } = QuizSlice;

export const QuizActions = actions;
export default { [NAME]: reducer };