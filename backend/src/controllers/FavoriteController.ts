import { type Request, type Response } from "express";
import FavoriteService from "../services/FavoriteService.ts";
import Helpers from "../utils/Helpers.ts";
import { type IUnmarkAsFavorite } from "../constants/Types/Favorite/FavoriteType.ts";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { markFavoriteValidation } from "../validations/QuizValidation.ts";

class FavoriteController {
   static async markAsFavorite(req: Request, res: Response) {
      const validation = markFavoriteValidation(req.body);
      if (!validation.type) {
         Helpers.responseMessage(res, false, validation.message);
         return;
      }
      
      try {
         const result = await FavoriteService.markAsFavorite(validation.data);
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