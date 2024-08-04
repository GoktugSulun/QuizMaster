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

export type PayloadTypes = {
   [actionName: string]: any
};

export type UserType = {
   name: string;
   surname: string;
   email: string;
   password: string;
   id: string;
   createdAt: string;
   updatedAt: string;
   isRemoved: false;
}

export type RequestResultType = {
   actionName: string;
   loadingValue: boolean;
   requestStatusValue: HttpResponseEnums;
   errorValue: any | null;
   payloadValue: { data: any, value: any };
}

export type InitialStateTypes = {
   authorizedUser: UserType;
   notifications: NotificationTypes[];
   isOpenSidebar: boolean;
   loadings: LoadingTypes;
   requestStatuses: RequestStatusTypes;
   errors: ErrorTypes;
   payloads: PayloadTypes;
}