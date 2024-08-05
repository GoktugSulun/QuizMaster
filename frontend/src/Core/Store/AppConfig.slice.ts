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
  isOpenDrawer: false,
  loadings: {},
  requestStatuses: {},
  errors: {},
  payloads: {},
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
    setIsOpenDrawer: (state, action: PayloadAction<"CLOSE" | "OPEN" | "TOGGLE">) => {
      const valueMap = {
        "TOGGLE": !state.isOpenDrawer,
        "OPEN": true,
        "CLOSE": false
      }
      state.isOpenDrawer = valueMap[action.payload];
    },
    closeSnackbar: (state, action) => {
      state.notifications = state.notifications.filter((notification) => notification.options.key !== action.payload);
    },
    setRequestResult: (state, action: PayloadAction<RequestResultType>) => {
      const { actionName, loadingValue, requestStatusValue, errorValue, payloadValue } = action.payload;
      state.loadings[actionName] = loadingValue;
      state.requestStatuses[actionName] = requestStatusValue;
      state.errors[actionName] = errorValue;
      if (payloadValue.requestId) {
        if (state.payloads[actionName]) {
          const index = state.payloads[actionName].findIndex((item) => item.requestId === payloadValue.requestId);
          if (index === -1) {
            state.payloads[actionName].push(payloadValue);
          } else {
            state.payloads[actionName].splice(index, 1);
          }
        } else {
          state.payloads[actionName] = [payloadValue];
        }
      }
      
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