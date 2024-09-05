
import Helpers from "../utils/Helpers.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { type IGet } from "../constants/Types/User/UserType.ts";
import AuthService from "../services/AuthService.ts";
import AuthenticatedUser from "../utils/AuthenticatedUser.ts";
import { editAuthValidation, loginAuthValidation, registerAuthValidation } from "../validations/AuthValidation.ts";

class UserController {
   static async get(req: Request, res: Response) {
      try {
         const param = { _id: AuthenticatedUser.getUserId() } as IGet;
         const result = await AuthService.get(param);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async edit(req: Request, res: Response) {
      const body = req.body?.data 
         ? { 
            ...JSON.parse(req.body.data), 
            uuid: req.uuid, 
            multer_image: req.multer_image 
         }
         : { ...req.body }
      const validation = editAuthValidation({ id: req.params.id, body });
      if (!validation.type) {    
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await AuthService.edit(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async login(req: Request, res: Response) {
      const validation = loginAuthValidation(req.body);
      if (!validation.type) {    
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await AuthService.login(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async register(req: Request, res: Response) {
      const validation = registerAuthValidation(req.body);
      if (!validation.type) {    
         Helpers.responseMessage(res, false, validation.message);
         return;
      }

      try {
         const result = await AuthService.register(validation.data);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default UserController;