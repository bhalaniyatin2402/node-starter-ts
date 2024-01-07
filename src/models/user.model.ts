import { Schema, model, Document } from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface TUser extends IUser, Document { }

const userSchema: Schema = new Schema({
  name: {
    type: String,
    minLegth: [3, 'name atleast 3 character long'],
    requird: [true, 'name is required'],
    trim: true
  },
  email: {
    type: String,
    unique: [true, 'please enter another email'],
    minLegth: [3, 'email must 3 character long'],
    requied: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLength: [8, 'password must 8 character long']
  }
})

const User = model<TUser>("User", userSchema)

export default User
