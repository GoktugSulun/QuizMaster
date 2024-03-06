import { type Request, type Response } from "express";
import FavoriteService from "../services/FavoriteService.ts";
import Helpers from "../utils/Helpers.ts";
import { type IUnmarkAsFavorite, type IMarkAsFavorite } from "../constants/Types/Favorite/FavoriteType.ts";
import { type IError } from "../constants/Types/Error/ErrorType.ts";

class FavoriteController {
   static async getAll(req: Request, res: Response) {
      try {
         const { page=1, limit=10, isRemoved=false } = req.query;
         const params = { 
            page: Number(page), 
            limit: Number(limit), 
            isRemoved: isRemoved === "true" 
         };
         const result = await FavoriteService.getAll(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async markAsFavorite(req: Request, res: Response) {
      try {
         // Todo : Validate req.body
         const params = req.body as IMarkAsFavorite;
         const result = await FavoriteService.markAsFavorite(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async unmarkAsFavorite(req: Request, res: Response) {
      if (!req.params.id) { 
         return Helpers.responseMessage(res, false, "'Id' field is required!");
      }
      try {
         const params = { quizId: req.params.id } as IUnmarkAsFavorite;
         const result = await FavoriteService.unmarkAsFavorite(params);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default FavoriteController;