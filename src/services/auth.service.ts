import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { AuthFailureError, BadRequestError } from '~/core/error.response'
import UserModel, { IUser } from '~/models/user.model'
import KeyTokenServices from './keyToken.service'
import createTokenPair from '~/utils/jwt'
import getInfoData from '~/utils'
import { Types } from 'mongoose'

const Role = {
  USER: 'user'
}

interface User {
  _id: Types.ObjectId
  username: string
  fullname: string
}

interface UserLogin {
  username: string
  password: string
}

class AuthService {
  static async register(data: IUser) {
    const { username, fullname, password, avatar, status } = data

    const foundUser = await UserModel.findOne({ username }).lean()
    if (foundUser) {
      throw new BadRequestError('Error: Shop already registered!')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create({
      username,
      fullname,
      password: passwordHash,
      roles: [Role.USER],
      avatar,
      status
    })
    if (newUser) {
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')
      console.log({ privateKey, publicKey })

      const keyUser = await KeyTokenServices.createKeyToken({
        userId: newUser._id as Types.ObjectId,
        publicKey,
        privateKey
      })
      if (!keyUser) {
        throw new BadRequestError('Error: keyUser error!')
      }
      const tokens = await createTokenPair({ userId: newUser._id as Types.ObjectId, username }, publicKey, privateKey)
      console.log('tokens create successfully!', tokens)

      return {
        shop: getInfoData<User>({
          fields: ['_id', 'username', 'fullname'],
          object: { ...newUser, _id: newUser._id as Types.ObjectId }
        }),
        tokens
      }
    }
    return {
      code: 200,
      metadata: null
    }
  }

  static async Login(data: UserLogin) {
    const { username, password } = data

    const foundShop = await UserModel.findOne({ username }).lean()
    if (!foundShop) throw new BadRequestError('Shop is not registered')

    const match = await bcrypt.compare(password, foundShop.password)
    if (!match) throw new AuthFailureError('Authencation error')

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const tokens = await createTokenPair({ userId: foundShop._id as Types.ObjectId, username }, publicKey, privateKey)

    await KeyTokenServices.createKeyToken({
      refreshToken: tokens.refreshToken,
      userId: foundShop._id as Types.ObjectId,
      publicKey,
      privateKey
    })

    return {
      shop: getInfoData<User>({
        fields: ['_id', 'username', 'fullname'],
        object: { ...foundShop, _id: foundShop._id as Types.ObjectId }
      }),
      tokens
    }
  }

  static async getUser() {
    const users = await UserModel.find()

    return users
  }
}

export default AuthService
