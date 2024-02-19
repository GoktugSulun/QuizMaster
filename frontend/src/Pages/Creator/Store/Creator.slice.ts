import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const NAME = 'Creator';

type InitialStateTypes = {

}

const initialState: InitialStateTypes = {
  
};

const CreatorSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {

  },
});

const { reducer, actions } = CreatorSlice;

export const CreatorActions = actions;
export default { [NAME]: reducer };