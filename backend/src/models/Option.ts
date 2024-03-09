import mongoose, { Types } from 'mongoose';

export interface IOptionSchema {
   id: Types.ObjectId;
   createdAt: Date;
   updatedAt: Date;
   name: String;
   isCorrect: boolean;
}

export const optionSchema = new mongoose.Schema({
   name: { 
      type: String, 
      trim: true, 
      required: true 
   },
   isCorrect: { 
      type: Boolean,
      required: true
   },
}, { timestamps: true });

const Option = mongoose.model('Option', optionSchema);
export default Option;