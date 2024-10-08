import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type QuizResultType, type ResultType } from "../Types/QuizResultTypes";
import { VisibilityEnums } from '@/Constants/Enums';

const NAME = 'QuizResult';

type InitialStateTypes = {
   quizResult: QuizResultType,
   allResults: ResultType[]
}

const initialState: InitialStateTypes = {
   quizResult: {
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
      questionsWithResults: [],
      quiz: {
         id: "",
         createdAt: null,
         updatedAt: null,
         name: "",
         description: "",
         visibility: VisibilityEnums.PUBLIC,
         image: "",
         totalTime: 0,
         creatorId: "",
         maxAttempt: 0,
         isRemoved: false,
      },
   },
   allResults: []
};

const QuizResultSlice = createSlice({  
   name: NAME,
   initialState,
   reducers: {
      setQuizResult: (state, action: PayloadAction<QuizResultType>) => {
         state.quizResult = action.payload;
      },
      setAllResults: (state, action: PayloadAction<ResultType[]>) => {
         state.allResults = action.payload;
      }
   },
});

const { reducer, actions } = QuizResultSlice;

export const QuizResultActions = actions;
export default { [NAME]: reducer };