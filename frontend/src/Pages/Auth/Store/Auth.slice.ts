import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const NAME = 'Auth';

type InitialStateTypes = {
   isOpenLoginModal: boolean;
   isOpenRegisterModal: boolean;
}

const initialState: InitialStateTypes = {
  isOpenLoginModal: false,
  isOpenRegisterModal: false
};

const AuthSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      reset: () => initialState,
      setIsOpenLoginModal: (state, action: PayloadAction<"OPEN" | "CLOSE" | "TOGGLE">) => {
         const valueMap = {
         "TOGGLE": !state.isOpenLoginModal,
         "OPEN": true,
         "CLOSE": false
         }
         state.isOpenLoginModal = valueMap[action.payload];
      },
      setIsOpenRegisterModal: (state, action: PayloadAction<"OPEN" | "CLOSE" | "TOGGLE">) => {
         const valueMap = {
         "TOGGLE": !state.isOpenRegisterModal,
         "OPEN": true,
         "CLOSE": false
         }
         state.isOpenRegisterModal = valueMap[action.payload];
      }
   }
});

const { reducer, actions } = AuthSlice;

export const AuthActions = actions;
export default { [NAME]: reducer };