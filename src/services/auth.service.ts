import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { AuthFailureError, BadRequestError } from '~/core/error.response'
import EmployeeModel, { IUser } from '~/models/employee.model'
import KeyTokenServices from './keyToken.service'
import createTokenPair from '~/utils/jwt'
import getInfoData from '~/utils'
import { Types } from 'mongoose'

const Role = {
  Employee: 'employee'
}

interface Employee {
  _id: Types.ObjectId
  username: string
  fullname: string
}

interface EmployeeLogin {
  username: string
  password: string
}

class AuthService {
  static async register(data: IUser) {
    const { username, fullname, password, avatar, status } = data

    const foundEmployee = await EmployeeModel.findOne({ username }).lean()
    if (foundEmployee) {
      throw new BadRequestError('Error: Shop already registered!')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newEmployee = await EmployeeModel.create({
      username,
      fullname,
      password: passwordHash,
      roles: [Role.Employee],
      avatar,
      status
    })
    if (newEmployee) {
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')
      console.log({ privateKey, publicKey })

      const keyEmployee = await KeyTokenServices.createKeyToken({
        userId: newEmployee._id as Types.ObjectId,
        publicKey,
        privateKey
      })
      if (!keyEmployee) {
        throw new BadRequestError('Error: keyEmployee error!')
      }
      const tokens = await createTokenPair(
        { userId: newEmployee._id as Types.ObjectId, username },
        publicKey,
        privateKey
      )
      console.log('tokens create successfully!', tokens)

      return {
        shop: getInfoData<Employee>({
          fields: ['_id', 'username', 'fullname'],
          object: { ...newEmployee, _id: newEmployee._id as Types.ObjectId }
        }),
        tokens
      }
    }
    return {
      code: 200,
      metadata: null
    }
  }

  static async Login(data: EmployeeLogin) {
    const { username, password } = data

    const foundShop = await EmployeeModel.findOne({ username }).lean()
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
      shop: getInfoData<Employee>({
        fields: ['_id', 'username', 'fullname'],
        object: { ...foundShop, _id: foundShop._id as Types.ObjectId }
      }),
      tokens
    }
  }

  static async getUser() {
    const users = await EmployeeModel.find()

    return users
  }
}

export default AuthService
