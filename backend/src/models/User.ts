import mongoose, { Types } from 'mongoose';

export interface IUserSchema {
   id: Types.ObjectId;
   createdAt: Date;
   updatedAt: Date;
   name: String;
   surname: String;
   email: String;
   password: String;
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
}, { timestamps: true });

const User = mongoose.model<IUserSchema>('User', userSchema);
export default User;