import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type QuizRules } from "../Types/QuizRulesTypes";
import { VisibilityEnums } from '@/Pages/Creator/Types/CreatorTypes';

const NAME = 'QuizRules';

type InitialStateTypes = {
   quizRules: QuizRules
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
      totalAttempt: 1,
      numberOfQuestions: 0,
      questionTime: null,
      repeat: null,
      multipleChoice: false,
      trueFalse: false,
      shortAnswer: false,
   }
};

const QuizRulesSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      reset: () => initialState,
      setQuizRules: (state, action: PayloadAction<QuizRules>) => {
         state.quizRules = action.payload;
      },
   },
});

const { reducer, actions } = QuizRulesSlice;

export const QuizRulesActions = actions;
export default { [NAME]: reducer };