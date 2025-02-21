import { Types } from 'mongoose'

export interface IEmployee {
  _id: Types.ObjectId
  username: string
  fullname: string
  password: string
  avatar?: string
  status?: string
  roles: string[]
}

export interface EmployeeLogin {
  username: string
  password: string
}

export interface IUserChangePassword {
  oldPassword: string
  newPassword: string
}

export interface IAuthResponse {
  user: {
    _id: Types.ObjectId
    username: string
    fullname: string
  } | null
  tokens: {
    accessToken: string
    refreshToken: string
  } | null
}
