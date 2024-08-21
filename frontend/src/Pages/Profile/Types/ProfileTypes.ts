export type UserPayloadType = {
   name: string;
   surname: string;
   email: string;
   password: string;
   image: string | File;
   isRemovedImage: boolean;
}