
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
   image: string;
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
   body: {
      name: string;
      surname: string;
      email: string;
      newPassword?: string;
      image: string;
      uuid?: string;
      multer_image?: string;
      isRemovedImage?: boolean;
   },
   id: string;
}