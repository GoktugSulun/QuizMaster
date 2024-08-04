import { type Middleware } from '@reduxjs/toolkit';
import { HttpResponseEnums, ThunkEnums } from '../Constants/Enums';
import { AppConfigActions } from '../Store/AppConfig.slice';

type ArgsType = { data: any, value: any }

type Action = {
  type: string;
  payload: { data: any; value: any } | { error: any } | undefined;
  meta: {
    arg: ArgsType;
    requestId: string;
    requestStatus: string;
  }
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
  
  const [, actionName, actionStatus] = action.type.split('/');

  console.log(action.meta, " ACTION.META");
  

  store.dispatch(AppConfigActions.setRequestResult({ 
    actionName, 
    loadingValue: actionStatus === ThunkEnums.PENDING, 
    requestStatusValue: getStatus(actionStatus as ActionStatus),
    errorValue: actionStatus === ThunkEnums.REJECTED ? action.payload : null,
    payloadValue: {
      requestId: action.meta.requestId || "", 
      data: action.meta.arg.data || null, 
      value: action.meta.arg.value || null 
    }
  }));

  next(action);
};

export default thunkMiddleware;