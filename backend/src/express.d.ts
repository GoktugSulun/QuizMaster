import { Request } from 'express';

declare module 'express' {
   export interface Request {
      uuid?: string;
      multer_image?: string;
   }
}