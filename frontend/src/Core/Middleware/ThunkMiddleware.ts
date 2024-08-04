import { type Middleware } from '@reduxjs/toolkit';
import { HttpResponseEnums, ThunkEnums } from '../Constants/Enums';
import { AppConfigActions } from '../Store/AppConfig.slice';

type Action = {
  type: string;
  payload?: any;
}

type ActionStatus = "pending" | "fulfilled" | "rejected";

const getStatus = (actionStatus: ActionStatus): HttpResponseEnums => {
  switch (actionStatus) {
  case "pending":
    return HttpResponseEnums.LOADING;
  case "fulfilled":
    return HttpResponseEnums.SUCCESS;
  case "rejected":
    return HttpResponseEnums.FAILURE;
  default:
    throw new Error('Unknown parameter!');
  }
};

const thunkMiddleware: Middleware = (store) => (next) => (action: Action) => {

  if (!action.type.includes('request')) {
    next(action);
    return;
  }
  
  console.log(action, " ACTİON");
  
  const [, actionName, actionStatus] = action.type.split('/');

  store.dispatch(AppConfigActions.setRequestResult({ 
    actionName, 
    loadingValue: actionStatus === ThunkEnums.PENDING, 
    requestStatusValue: getStatus(actionStatus as ActionStatus),
    errorValue: actionStatus === ThunkEnums.REJECTED ? action.payload : null,
    payloadValue: action.payload || null
  }));

  next(action);
};

export default thunkMiddleware;