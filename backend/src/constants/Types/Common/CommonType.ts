
export type ResponseErrorType = {
   type: false;
   message: string;
}

export type ResponseType<T = null> = {
   type: true;
   message: string;
   data: T
} | {
   type: false;
   message: string;
};