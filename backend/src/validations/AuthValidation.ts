import Joi from "joi";
import { ValidationResponse } from "../constants/Types/Common/CommonType";
import Helpers from "../utils/Helpers";
import { type IRegister, type IEdit, type ILogin } from "../constants/Types/User/UserType";

export const editAuthValidation = (data: Partial<IEdit>): ValidationResponse<IEdit> => {
   const schema = Joi.object({
      id: Joi.string().required(),
      body: Joi.object({
         name: Joi.string().required(),
         surname: Joi.string().required(),
         email: Joi.string().email().required(),
         newPassword: Joi.string(),
         image: Joi.string().required(),
         uuid: Joi.string(),
         multer_image: Joi.string(),
         isRemovedImage: Joi.boolean().required()
      })
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const loginAuthValidation = (data: Partial<ILogin>): ValidationResponse<ILogin> => {
   const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const registerAuthValidation = (data: Partial<IRegister>): ValidationResponse<IRegister> => {
   const schema = Joi.object({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required()
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}