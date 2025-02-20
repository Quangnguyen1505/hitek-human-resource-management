import keyTokenModel from '~/models/token.model'
import mongoose from 'mongoose'

const findByUserId = async (userId: string) => {
  return await keyTokenModel.findOne({ user: new mongoose.Types.ObjectId(userId) })
}

export default findByUserId
