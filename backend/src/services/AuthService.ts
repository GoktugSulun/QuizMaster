import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import { IRegister, ILogin, IGet, IUser } from "../constants/Types/User/UserType.ts";
import { ILoginResponse } from "../constants/Types/User/UserResponseType.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import jwt from 'jsonwebtoken';
import User from "../models/User.ts";

class AuthService {
   static async get(params: IGet): Promise<ResponseType<IUser>> {
      try {
         const query = {} as { [key: string]: string };
         Object.entries(params).forEach(([key, value]) => {
            if (value) {
               query[key] = value;
            }
         });

         console.log(query, " query");
         const data = await User.findOne(query);
         console.log(data, " data");
         
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