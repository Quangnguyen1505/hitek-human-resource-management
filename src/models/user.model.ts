import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  fullname?: string
  password: string
  avatar?: string
  status: 'active' | 'deactive'
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, trim: true },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' }
  },
  { timestamps: true }
)

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel
