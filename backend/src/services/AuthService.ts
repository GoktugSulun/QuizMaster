import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import { type IRegister, type ILogin, type IGet, type IUser, type IEdit } from "../constants/Types/User/UserType.ts";
import { ILoginResponse } from "../constants/Types/User/UserResponseType.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import jwt from 'jsonwebtoken';
import User from "../models/User.ts";
import AuthenticatedUser from "../utils/AuthenticatedUser.ts";

class AuthService {
   static async get(params: IGet): Promise<ResponseType<IUser>> {
      try {
         const query = {} as { [key: string]: string };
         Object.entries(params).forEach(([key, value]) => {
            if (value) {
               query[key] = value;
            }
         });

         const data = await User.findOne(query);
         if (!data) {
            return {
               type: false,
               message: "The information you entered is incorrect, please check it!"
            }
         }
         
         return { 
            type: true, 
            message: 'You have been logged in successfully', 
            data
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async edit(params: IEdit): Promise<ResponseType<IUser>> {
      try {
         // Todo: image handle et
         const data = await User.findOneAndUpdate({ _id: AuthenticatedUser.getUserId(), isRemoved: false }, params);
         if (!data) {
            return {
               type: false,
               message: "Error occurs while editing user information!"
            }
         }
         
         return { 
            type: true, 
            message: 'User has been edited successfully', 
            data
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async login(params: ILogin): Promise<ResponseType<ILoginResponse>> {
      try {
         const userData = params;

         const userResult = await AuthService.get(userData);
         if (!userResult.type) {
            return {
               type: false,
               message: userResult.message
            }
         }

         const user = {
            id: userResult.data.id,
            email: userResult.data.email,
            password: userResult.data.password
         };
         
         const token = jwt.sign(user, process.env.TOKEN_SECRET || "token_secret", { expiresIn: '72h' });

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
         const newUser = params;

         const isUserExist = await User.exists({ email: newUser.email });
         if (isUserExist) {
            return {
               type: false,
               message: "This email is being used, try another one!"
            }
         }

         const user = new User(newUser);
         await user.save();
         
         return { 
            type: true, 
            message: 'You have been registered successfully', 
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }
}
  
export default AuthService;