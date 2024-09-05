import Joi from "joi";
import { type ICreate, type IEdit } from "../constants/Types/Question/QuestionType";
import { type ValidationResponse } from "../constants/Types/Common/CommonType";
import { CorrectOptionEnums, PointEnums, QuestionEnums } from "../constants/Enums/Enums";
import Helpers from "../utils/Helpers";

export const createQuestionValidation = (data: Partial<ICreate[]>): ValidationResponse<ICreate[]> => {
   const schema = Joi.array().min(1).items(Joi.object({
      quizId: Joi.string().required(),
      name: Joi.string().required(),
      point: Joi.string().required().valid(...Object.values(PointEnums)),
      type: Joi.string().required().valid(...Object.values(QuestionEnums)),
      optionType: Joi.string().valid(...Object.values(CorrectOptionEnums)).allow(null),
      options: Joi.array().required().min(2).items(Joi.object({
         name: Joi.string().required(),
         isCorrect: Joi.boolean().required()
      }))
   }));

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}

export const editQuestionValidation = (data: Partial<IEdit>): ValidationResponse<IEdit> => {
   const schema = Joi.object({
      quizId: Joi.string().required(),
      questions: Joi.array().required().min(1).items(Joi.object({
         quizId: Joi.string().required(),
         name: Joi.string().required(),
         point: Joi.string().required().valid(...Object.values(PointEnums)),
         type: Joi.string().required().valid(...Object.values(QuestionEnums)),
         optionType: Joi.string().valid(...Object.values(CorrectOptionEnums)).allow(null),
         options: Joi.array().required().min(2).items(Joi.object({
            name: Joi.string().required(),
            isCorrect: Joi.boolean().required(),
            createdAt: Joi.string(),
            updatedAt: Joi.string(),
            id: Joi.string()
         })),
         createdAt: Joi.string(),
         updatedAt: Joi.string(),
         isRemoved: Joi.boolean(),
         id: Joi.string(),
      }))
   });

   const result = schema.validate(data);
   return Helpers.responseJoiValidation(result);
}