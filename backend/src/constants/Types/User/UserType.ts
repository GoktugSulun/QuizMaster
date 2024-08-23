
export interface ILogin {
   email: string;
   password: string;
}

export interface IRegister {
   name: string;
   surname: string;
   email: string;
   password: string;
}

export interface IUser {
   id: string;
   name: string;
   email: string;
   password: string;
   createdAt: Date;
   updatedAt: Date;
   isRemoved: boolean;
}

export interface IGet {
   email?: string;
   password?: string;
   _id?: string;
}

export interface IEdit {
   name: string;
   surname: string;
   email: string;
   newPassword?: string;
}