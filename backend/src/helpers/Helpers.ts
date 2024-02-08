import { Response } from "express";

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

   static responseError(error?: unknown, message?: string) {
      return {
         type: false,
         message: (error instanceof Error) ? error.message : (message || 'Unknown Error')
      }
   }
}

export default Helpers;