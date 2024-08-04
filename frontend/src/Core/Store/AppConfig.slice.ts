import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HttpResponseEnums } from '../Constants/Enums';
import { type RequestResultType, type InitialStateTypes, type UserType } from './AppConfigTypes';

const NAME = 'AppConfig';

const defaultAuthorizedUser: UserType = {
  id: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  createdAt: "",
  updatedAt: "",
  isRemoved: false
}

const initialState: InitialStateTypes = {
  authorizedUser: defaultAuthorizedUser,
  notifications: [],
  isOpenSidebar: false,
  loadings: {},
  requestStatuses: {},
  errors: {},
  payloads: {}
};

const AppConfigSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    enqueueSnackbar: (state, action) => {
      const newNotification = {
        message: action.payload?.message || '',
        options: {
          ...(action.payload?.options || {}),
          key: crypto.randomUUID(),
          variant: action.payload?.options?.variant || 'success'
        }
      };      
      state.notifications.push(newNotification);
    },
    setIsOpenSidebar: (state, action: PayloadAction<"CLOSE" | "OPEN" | "TOGGLE">) => {
      const valueMap = {
        "TOGGLE": !state.isOpenSidebar,
        "OPEN": true,
        "CLOSE": false
      }
      state.isOpenSidebar = valueMap[action.payload];
    },
    closeSnackbar: (state, action) => {
      state.notifications = state.notifications.filter((notification) => notification.options.key !== action.payload);
    },
    setRequestResult: (state, action: PayloadAction<RequestResultType>) => {
      const { actionName, loadingValue, requestStatusValue, errorValue, payloadValue } = action.payload;
      state.loadings[actionName] = loadingValue;
      state.requestStatuses[actionName] = requestStatusValue;
      state.errors[actionName] = errorValue;
      state.payloads[actionName] = payloadValue;
    },
    setIdle: (state, action) => {
      const { actionName } = action.payload;
      state.requestStatuses[actionName] = HttpResponseEnums.IDLE;
      state.errors[actionName] = null;
      state.loadings[actionName] = false;
    },
    setAuthorizedUser: (state, action: PayloadAction<UserType>) => {
      state.authorizedUser = action.payload;
    },
    resetAuthorizedUser: (state) => {
      state.authorizedUser = defaultAuthorizedUser;
    }
  }
});

const { actions, reducer } = AppConfigSlice;

export const AppConfigActions = actions;
export default { [NAME]: reducer };
// export default reducer;