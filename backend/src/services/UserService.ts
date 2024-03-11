import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import { IRegister, ILogin, IGet, IUser } from "../constants/Types/User/UserType.ts";
import { IGetResponse, ILoginResponse } from "../constants/Types/User/UserResponseType.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import jwt from 'jsonwebtoken';

class UserService {
   static async get(params: IGet): Promise<ResponseType<IUser>> {
      try {
         const { email, password } = params;

         // todo : find user
         const data = {
            id: "111",
            name: "111",
            email: "111",
            password: "111",
            createdAt: new Date(),
            updatedAt: new Date(),
            isRemoved: false,
         } as IUser;
         
         return { 
            type: true, 
            message: 'You have been logged in successfully', 
            data
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async login(params: ILogin): Promise<ResponseType<ILoginResponse>> {
      try {
         const userData = params;
         const token = jwt.sign(userData, process.env.TOKEN_SECRET || "token_secret", { expiresIn: '72h' });

         const userResult = await UserService.get(userData);
         if (!userResult.type) {
            return {
               type: false,
               message: userResult.message
            }
         }

         return { 
            type: true, 
            message: 'You have been logged in successfully', 
            data: {
               token,
               user: userResult.data as IUser
            }
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async register(params: IRegister): Promise<IResponse> {
      try {
         // todo : create user
         
         return { 
            type: true, 
            message: 'You have been registered successfully', 
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default UserService;