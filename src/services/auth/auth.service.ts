import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { AuthFailureError, BadRequestError, ForBiddenError } from '~/core/error.response'
import EmployeeModel, { IUser } from '~/models/employee.model'
import KeyTokenServices from '../key-token/keyToken.service'
import createTokenPair from '~/utils/jwt'
import { getInfoData } from '~/utils'
import { Types } from 'mongoose'
import { findEmployeeById, findEmployeeByUserName } from '~/repository/employee.repository'
import { IEmployee, EmployeeLogin, IUserChangePassword, IAuthResponse, IAuthHandleToken } from './auth.type'
import { deleteKeyById } from '~/repository/token.repository'

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
      const userData = this.getUserData(newEmployeeData)

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

  static async login(data: EmployeeLogin): Promise<IAuthResponse> {
    const { username, password } = data

    const foundEmployee = await EmployeeModel.findOne({ username }).lean()
    if (!foundEmployee) throw new AuthFailureError('Shop is not registered')

    const match = await bcrypt.compare(password, foundEmployee.password)
    if (!match) throw new AuthFailureError('Authencation error')

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const tokens = await createTokenPair(
      { userId: foundEmployee._id as Types.ObjectId, username },
      publicKey,
      privateKey
    )

    await KeyTokenServices.createKeyToken({
      refreshToken: tokens.refreshToken,
      userId: foundEmployee._id as Types.ObjectId,
      publicKey,
      privateKey
    })

    const userData = this.getUserData(foundEmployee)

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

  static async HandlerRefreshToken(data: IAuthHandleToken) {
    const { keyStore, refreshToken, user } = data
    const userId = user?.userId as string
    const username = user?.username as string

    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await deleteKeyById(userId)
      throw new ForBiddenError('Something wrong happen !! Pls Relogin')
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError('Shop not register !!')
    }

    const foundEmployee = await findEmployeeByUserName(username)
    if (!foundEmployee) throw new AuthFailureError('Shop not register !!')

    const tokens = await createTokenPair(
      { userId: new Types.ObjectId(userId), username },
      keyStore.publicKey,
      keyStore.privateKey
    )

    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken
      },
      $addToSet: {
        refreshTokensUsed: refreshToken
      }
    })

    return {
      user,
      tokens
    }
  }

  private static getUserData(user: IUser): IAuthResponse['user'] {
    return getInfoData<IEmployee>({
      fields: ['_id', 'username', 'fullname'],
      object: { ...user, _id: user._id as Types.ObjectId }
    }) as IAuthResponse['user']
  }
}

export default AuthService
