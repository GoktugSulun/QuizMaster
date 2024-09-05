import Joi from "joi";
import { ValidationResponse } from "../constants/Types/Common/CommonType";
import Helpers from "../utils/Helpers";
import { IEdit, type ICreate } from "../constants/Types/Quiz/QuizType";
import { VisibilityEnums } from "../constants/Enums/Enums";
import { IMarkAsFavorite } from "../constants/Types/Favorite/FavoriteType";
import { IMarkAsSaved } from "../constants/Types/Save/SaveType";

export const createQuizValidation = (data: Partial<ICreate>): ValidationResponse<ICreate> => {
   const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().min(10).required(),
      visibility: Joi.string().required().valid(...Object.values(VisibilityEnums)),
      image: Joi.string().allow(""),
      maxAttempt: Joi.number().required(),
      totalTime: Joi.number().required(),
      creatorId: Joi.string().required(),
      uuid: Joi.string(),
      multer_image: Joi.string(),
      isRemovedImage: Joi.boolean(),
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const editQuizValidation = (data: Partial<IEdit>): ValidationResponse<IEdit> => {
   const schema = Joi.object({
      id: Joi.string().required(),
      body: Joi.object({
         name: Joi.string().required(),
         description: Joi.string().min(10).required(),
         visibility: Joi.string().required().valid(...Object.values(VisibilityEnums)),
         image: Joi.string().allow(""),
         maxAttempt: Joi.number().required(),
         totalTime: Joi.number().required(),
         uuid: Joi.string(),
         multer_image: Joi.string(),
         isRemovedImage: Joi.boolean(),
      })
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const markFavoriteValidation = (data: Partial<IMarkAsFavorite>): ValidationResponse<IMarkAsFavorite> => {
   const schema = Joi.object({
      quizId: Joi.string().required()
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const markSavedValidation = (data: Partial<IMarkAsSaved>): ValidationResponse<IMarkAsSaved> => {
   const schema = Joi.object({
      quizId: Joi.string().required()
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}