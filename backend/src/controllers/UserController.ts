
import Helpers from "../utils/Helpers.ts";
import { type Request, type Response } from "express";
import { type IError } from "../constants/Types/Error/ErrorType.ts";
import { type IRegister, type ILogin } from "../constants/Types/User/UserType.ts";
import UserService from "../services/UserService.ts";

class UserController {
   static async login(req: Request, res: Response) {
      try {
         const param = req.body as ILogin;
         const result = await UserService.login(param);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }

   static async register(req: Request, res: Response) {
      try {
         const param = req.body as IRegister;
         const result = await UserService.register(param);
         Helpers.responseJSON(res, result);
      } catch (error) {
         const err = error as IError;
         Helpers.responseMessage(res, false, err.message);
      }
   }
};

export default UserController;