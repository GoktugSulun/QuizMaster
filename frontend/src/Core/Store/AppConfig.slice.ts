import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HttpResponseEnums } from '../Constants/Enums';
import { InitialStateTypes } from './AppConfig.model';

const NAME = 'AppConfig';

const initialState: InitialStateTypes = {
  notifications: [],
  isOpenSidebar: true,
  loadings: {},
  requestStatuses: {},
  errors: {}
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
    setRequestResult: (state, action) => {
      const { actionName, loadingValue, requestStatusValue, errorValue } = action.payload;
      state.loadings[actionName] = loadingValue;
      state.requestStatuses[actionName] = requestStatusValue;
      state.errors[actionName] = errorValue;
    },
    setIdle: (state, action) => {
      const { actionName } = action.payload;
      state.requestStatuses[actionName] = HttpResponseEnums.IDLE;
      state.errors[actionName] = null;
      state.loadings[actionName] = false;
    }
  }
});

const { actions, reducer } = AppConfigSlice;

export const AppConfigActions = actions;
export default { [NAME]: reducer };