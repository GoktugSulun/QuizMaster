import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const NAME = 'Creator';

type InitialStateTypes = {
  isOpenQuizSettingsModal: boolean;
}

const initialState: InitialStateTypes = {
  isOpenQuizSettingsModal: true,
};

const CreatorSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setIsOpenQuizSettingsModal: (state, action: PayloadAction<"OPEN" | "CLOSE" | "TOGGLE">) => {
      const valueMap = {
        "TOGGLE": !state.isOpenQuizSettingsModal,
        "OPEN": true,
        "CLOSE": false
      }
      state.isOpenQuizSettingsModal = valueMap[action.payload];
    }
  },
});

const { reducer, actions } = CreatorSlice;

export const CreatorActions = actions;
export default { [NAME]: reducer };