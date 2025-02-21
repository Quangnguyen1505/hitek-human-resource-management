import keyTokenModel from '~/models/token.model'
import mongoose from 'mongoose'

const findByUserId = async (userId: string) => {
  return await keyTokenModel.findOne({ user: new mongoose.Types.ObjectId(userId) })
}

const deleteKeyById = async (userId: string) => {
  return await keyTokenModel.deleteOne({ user: new mongoose.Types.ObjectId(userId) })
}

export { findByUserId, deleteKeyById }
