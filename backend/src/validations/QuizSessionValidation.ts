import Joi from "joi";
import { ValidationResponse } from "../constants/Types/Common/CommonType";
import Helpers from "../utils/Helpers";
import { type IEnd, type IComplete, type IStart, type ISave } from "../constants/Types/QuizSession/QuizSessionType";
import { QuizSessionEndEnums } from "../constants/Enums/Enums";

export const startQuizSessionValidation = (data: Partial<IStart>): ValidationResponse<IStart> => {
   const schema = Joi.object({
      quizId: Joi.string().required()
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}


export const completeQuizSessionValidation = (data: Partial<IComplete>): ValidationResponse<IComplete> => {
   const schema = Joi.object({
      quizId: Joi.string().required(),
      quizSessionId: Joi.string().required(),
      completeTime: Joi.number().required(),
      answers: Joi.array().items(Joi.object({
         questionId: Joi.string().required(),
         answerId: Joi.string().allow(null),
         answers: Joi.array().items(Joi.object({
            answerId: Joi.string().required(),
            text: Joi.string().allow("")
         }))
      }))
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const endQuizSessionValidation = (data: Partial<IEnd>): ValidationResponse<IEnd> => {
   const schema = Joi.object({
      quizId: Joi.string().required(),
      status: Joi.string().valid(...Object.values(QuizSessionEndEnums))
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const saveQuizSessionValidation = (data: Partial<ISave>): ValidationResponse<ISave> => {
   const schema = Joi.object({
      quizId: Joi.string().required(),
      quizSessionId: Joi.string().required(),
      answers: Joi.array().items(Joi.object({
         questionId: Joi.string().required(),
         answerId: Joi.string().allow(null),
         answers: Joi.array().items(Joi.object({
            answerId: Joi.string().required(),
            text: Joi.string().allow("")
         }))
      }))
   })

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}