import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type ActiveSlideType } from '../Model/Creator.model';

const NAME = 'Creator';

type InitialStateTypes = {
   activeSlide: ActiveSlideType
}

const initialState: InitialStateTypes = {
   activeSlide: { 
      index: 0,
      name: "",
      options: []
   }
};

const CreatorSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setActiveSlide: (state, action: PayloadAction<ActiveSlideType>) => {
      state.activeSlide = action.payload;
    }
  },
});

const { reducer, actions } = CreatorSlice;

export const CreatorActions = actions;
export default { [NAME]: reducer };