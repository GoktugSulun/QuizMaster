import { IUser } from "./UserType";

export interface ILoginResponse {
   token: string;
   user: IUser;
}

export interface IGetResponse extends IUser {}

