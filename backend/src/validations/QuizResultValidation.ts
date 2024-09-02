import Joi from "joi";
import { ValidationResponse } from "../constants/Types/Common/CommonType";
import { IGetAll, IGetById } from "../constants/Types/QuizResult/QuizResultType";
import Helpers from "../utils/Helpers";

export const getAllQuizResultValidation = (data: Partial<IGetAll>): ValidationResponse<IGetAll> => {
   const schema = Joi.object({
      quizId: Joi.string().required()
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const getByIdQuizResultValidation = (data: Partial<IGetById>): ValidationResponse<IGetById> => {
   const schema = Joi.object({
      quizResultId: Joi.string().required()
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}