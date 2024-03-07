import { Response } from "express";
import mongoose from "mongoose";
import { type ResponseErrorType } from "../constants/Types/Common/CommonType";

class Helpers {
   static responseMessage(res: Response, type: boolean, message: string, data?: any): void {
      const response = { type, message, data };
      res.json(response)
   }

   static responseJSON(res: Response, result: { type: boolean, message: string, data?: any }) {
      if (result.type) {
         Helpers.responseMessage(res, true, result.message, result.data);
      } else {
         Helpers.responseMessage(res, false, result.message);
      }
   }

   static responseError(error?: unknown, message?: string): ResponseErrorType {
      if (error instanceof mongoose.Error.ValidationError) {
         const [schema, field, customMessage] = error.message.split(':')
         return {
            type: false,
            message: customMessage
         }
      }
      return {
         type: false,
         message: (error instanceof Error) ? error.message : (message || 'Unknown Error!')
      }
   }
}

export default Helpers;