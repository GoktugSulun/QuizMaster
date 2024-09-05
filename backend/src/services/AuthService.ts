import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import { type IRegister, type ILogin, type IGet, type IUser, type IEdit } from "../constants/Types/User/UserType.ts";
import { ILoginResponse } from "../constants/Types/User/UserResponseType.ts";
import { type ResponseType } from "../constants/Types/Common/CommonType.ts";
import jwt from 'jsonwebtoken';
import User from "../models/User.ts";
import AuthenticatedUser from "../utils/AuthenticatedUser.ts";

class AuthService {
   static async get(params: IGet): Promise<ResponseType<Omit<IUser, "password">>> {
      try {
         const query = {} as { [key: string]: string };
         Object.entries(params).forEach(([key, value]) => {
            if (value) {
               query[key] = value;
            }
         });

         const data = await User.findOne({ ...query, isRemoved: false }).select("-password");
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
         const { body, id } = params;
         const { uuid, multer_image, isRemovedImage, newPassword, ...currentUserData } = body;

         const user = await User.findById({ _id: AuthenticatedUser.getUserId(), isRemoved: false });
         if (!user) {
            return {
               type: false,
               message: "Error occurs while editing user information!"
            }
         }

         const userData = { ...currentUserData, password: user.password }

         if (isRemovedImage) {
            userData.image = "";
         } else {
            if (multer_image) {
               const image = Helpers.createImagePath(multer_image);
               userData.image = image;
            } else {
               userData.image = user.image
            }
         }

         if (newPassword) {
            userData.password = newPassword;
         }

         const data = await User.findByIdAndUpdate(AuthenticatedUser.getUserId(), userData, { new: true }) as IUser;

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

         const user = await User.findOne({ ...userData, isRemoved: false });
         if (!user) {
            return {
               type: false,
               message: "The information you entered is incorrect, please check it!"
            }
         }

         const authenticatedUser = {
            id: user.id,
            email: user.email,
            password: user.password
         };
         
         const token = jwt.sign(authenticatedUser, process.env.TOKEN_SECRET || "token_secret", { expiresIn: '72h' });
         AuthenticatedUser.setUserId(user.id)

         return { 
            type: true, 
            message: 'You have been logged in successfully', 
            data: {
               token,
               user: user as IUser
            }
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
   }

   static async register(params: IRegister): Promise<IResponse> {
      try {
         const newUser = { ...params, image: "" };

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