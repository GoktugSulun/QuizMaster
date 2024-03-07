import { Request } from "express";
import { IResponse } from "../types/Types.ts";
import Helpers from "../utils/Helpers.ts";
import Question from "../models/Question.ts";
import mongoose from "mongoose";
import OptionService from "./OptionService.ts";
import { QuestionEnums } from "../constants/Enums/Enums.ts";
import Option from "../models/Option.ts";

class QuestionService {
  static async getAll(): Promise<IResponse> {
    const data = await Question.find();

    try {
      return {
        type: true,
        message: 'All questions has been fetched',
        data
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }

  static async getById(req: Request): Promise<IResponse> {
    const { id } = req.params;

    try {
      return {
        type: true,
        message: 'getById',
        data: {}
      };
    } catch (error) {
      return Helpers.responseError(error)
    }
  }

   static async create(req: Request): Promise<IResponse> {
      try {
         // const { name } = req.body;
      
         const dummy = {
            quizId: 1,
            name: 'Question-4',
            time: 3000
            // index: 3,
            // createdAt: new Date(),
            // updatedAt: new Date()
         };

         const session = await mongoose.startSession();
         try {
            await session.withTransaction(async () => {

            // Create question
            const question = new Question(dummy);
            await question.save({ session });

            // Create options for related question
            const options = await OptionService.create({ questionId: question._id, type: QuestionEnums.MULTIPLE_CHOICE });
            if (!options.type) {
               throw new Error('Failed to create options');
            }
            await Option.insertMany(options.data, { session })

            await session.commitTransaction();
            console.log('Transaction complete');
         });
         } catch (error) {
            await session.abortTransaction();
            console.error('Transaction aborted:', error);
         } finally {
            await session.endSession();
         }
         
         return { 
            type: true, 
            message: 'Question has been created successfully!', 
            // data:
            // Todo : Return question and option ids
         };

      } catch (error) {
         return Helpers.responseError(error)
      }
  }
}
  
export default QuestionService;