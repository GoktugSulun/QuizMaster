import mongoose, { Types } from 'mongoose';

export interface IUserSchema {
   id: Types.ObjectId;
   createdAt: Date;
   updatedAt: Date;
   name: string;
   surname: string;
   email: string;
   password: string;
   image: string;
   isRemoved: boolean;
}

export const userSchema = new mongoose.Schema<IUserSchema>({
   name: { 
      type: String, 
      trim: true, 
      required: true 
   },
   surname: { 
      type: String, 
      trim: true, 
      required: true
   },
   email: { 
      type: String, 
      trim: true, 
      required: true
   },
   password: { 
      type: String, 
      trim: true, 
      required: true
   },
   image: { 
      type: String, 
      required: false,
      default: ""
   },
   isRemoved: {
      type: Boolean,
      default: false
   }
}, { timestamps: true });

const User = mongoose.model<IUserSchema>('User', userSchema);
export default User;