import Helpers from "../utils/Helpers.ts";
import SaveService from "../services/SaveService.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { type IMarkAsSaved } from "../constants/Types/Save/SaveType.ts";

class SaveController {
   // static async getAll(req: Request, res: Response) {
   //    try {
   //       const { page=1, limit=10, isRemoved=false } = req.query;
   //       const params = { 
   //          page: Number(page), 
   //          limit: Number(limit), 
   //          isRemoved: isRemoved === "true" 
   //       };
   //       const result = await SaveService.getAll(params);
   //       Helpers.responseJSON(res, result);
   //    } catch (error) {
   //       const err = error as IError;
   //       Helpers.responseMessage(res, false, err.message);
   //    }
   // }

   static async markAsSaved(req: Request, res: Response) {
      try {
         // Todo : Validate req.body
         const params = req.body as IMarkAsSaved;
         const result = await SaveService.markAsSaved(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async unmarkAsSaved(req: Request, res: Response) {
      if (!req.params.id) { 
         return Helpers.responseMessage(res, false, "'Id' field is required!");
         }
      try {
         const params = { quizId: req.params.id };
         const result = await SaveService.unmarkAsSaved(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default SaveController;