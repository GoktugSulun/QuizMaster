
import Helpers from "../utils/Helpers.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { type IRegister, type ILogin, type IGet, type IEdit } from "../constants/Types/User/UserType.ts";
import AuthService from "../services/AuthService.ts";
import AuthenticatedUser from "../utils/AuthenticatedUser.ts";

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
      try {
         // todo: validate body
         const param = req.body as IEdit;
         const result = await AuthService.edit(param);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async login(req: Request, res: Response) {
      try {
         const param = req.body as ILogin;
         const result = await AuthService.login(param);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async register(req: Request, res: Response) {
      try {
         const param = req.body as IRegister;
         const result = await AuthService.register(param);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default UserController;