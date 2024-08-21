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

type PayloadType = { 
   requestId: string; 
   data: any; 
   value: any; 
}

export type PayloadTypes = {
   [actionName: string]: PayloadType[]
};

export type UserType = {
   name: string;
   surname: string;
   email: string;
   password: string;
   id: string;
   image: string;
   createdAt: string;
   updatedAt: string;
   isRemoved: false;
}

export type RequestResultType = {
   actionName: string;
   loadingValue: boolean;
   requestStatusValue: HttpResponseEnums;
   errorValue: any | null;
   payloadValue: PayloadType;
}

export type InitialStateTypes = {
   authorizedUser: UserType;
   notifications: NotificationTypes[];
   isOpenSidebar: boolean;
   isOpenDrawer: boolean;
   loadings: LoadingTypes;
   requestStatuses: RequestStatusTypes;
   errors: ErrorTypes;
   payloads: PayloadTypes;
}