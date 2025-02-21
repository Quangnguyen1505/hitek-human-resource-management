import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { AuthFailureError, BadRequestError } from '~/core/error.response'
import EmployeeModel, { IUser } from '~/models/employee.model'
import KeyTokenServices from '../key-token/keyToken.service'
import createTokenPair from '~/utils/jwt'
import getInfoData from '~/utils'
import { Types } from 'mongoose'
import { findEmployeeById } from '~/repository/employee.repository'
import { IEmployee, EmployeeLogin, IUserChangePassword, IAuthResponse } from './auth.type'

const Role = {
  Employee: 'employee'
}

class AuthService {
  static async register(data: IUser): Promise<IAuthResponse | null> {
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

      const newEmployeeData = newEmployee.toObject()
      const userData = getInfoData<IEmployee>({
        fields: ['_id', 'username', 'fullname'],
        object: { ...newEmployeeData, _id: newEmployeeData._id as Types.ObjectId }
      }) as IAuthResponse['user']

      return {
        user: userData,
        tokens
      }
    }
    return {
      tokens: null,
      user: null
    }
  }

  static async Login(data: EmployeeLogin): Promise<IAuthResponse> {
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

    const userData = getInfoData<IEmployee>({
      fields: ['_id', 'username', 'fullname'],
      object: { ...foundShop, _id: foundShop._id as Types.ObjectId }
    }) as IAuthResponse['user']

    return {
      user: userData,
      tokens
    }
  }

  static async changePassword(userId: string, data: IUserChangePassword): Promise<null> {
    const { oldPassword, newPassword } = data
    const employee = await findEmployeeById(userId)
    if (!employee) throw new BadRequestError('employee not exists!!')

    const isMatch = await bcrypt.compare(oldPassword, employee.password)
    if (!isMatch) throw new BadRequestError('Old password is incorrect')

    employee.password = await bcrypt.hash(newPassword, 10)
    await employee.save()

    return null
  }
}

export default AuthService
