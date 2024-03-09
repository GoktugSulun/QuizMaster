import { OptionsObject, SnackbarKey } from "notistack";
import { HttpResponseEnums } from "../Constants/Enums";

export type NotificationTypes = {
   message: string,
   options: OptionsObject & { key: SnackbarKey },
}

export type LoadingTypes = {
   [actionName: string]: boolean;   
}

export type RequestStatusTypes = {
   [actionName: string]: HttpResponseEnums.IDLE 
      | HttpResponseEnums.LOADING 
      | HttpResponseEnums.SUCCESS 
      | HttpResponseEnums.FAILURE;
}

export type ErrorTypes = {
   [actionName: string]: string | null;
}

export type InitialStateTypes = {
   notifications: NotificationTypes[];
   isOpenSidebar: boolean;
   loadings: LoadingTypes;
   requestStatuses: RequestStatusTypes;
   errors: ErrorTypes
}