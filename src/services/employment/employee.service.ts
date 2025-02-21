import { Types } from 'mongoose'
import { BadRequestError } from '~/core/error.response'
import EmployeeModel, { IUser } from '~/models/employee.model'
import {
  findEmployeeById,
  updateEmployeeById,
  deleteEmployeeByUserId,
  findAllEmployees
} from '~/repository/employee.repository'
import { IUserUpdate } from './employmee.type'
class EmployeeService {
  static async getEmployees({ limit = 50, sort = 'ctime', page = 1, filter = { status: 'active' } }) {
    return await findAllEmployees({
      limit,
      sort,
      page,
      filter,
      unselect: ['__v', 'password']
    })
  }

  static async getOneEmployees(userId: string) {
    const employee = await findEmployeeById(userId)
    if (!employee) throw new BadRequestError('employee not exists!!')

    return await findEmployeeById(userId)
  }

  static async updateEmployeeByUserId(data: IUserUpdate) {
    const { userId, fullname, password, avatar, status } = data

    const employee: IUser | null = await findEmployeeById(userId)
    if (!employee) throw new BadRequestError('employee not exists!!')

    const updatePayload: Partial<IUser> = {}
    if (fullname) updatePayload.fullname = fullname
    if (password) updatePayload.password = password
    if (avatar) updatePayload.avatar = avatar
    if (status !== undefined) updatePayload.status = status

    return await updateEmployeeById({
      userId: employee._id as Types.ObjectId,
      payload: updatePayload
    })
  }

  static async deleteEmployeeByUserId(userId: string) {
    const employee = await findEmployeeById(userId)
    if (!employee) throw new BadRequestError('employee not exists!!')

    return await deleteEmployeeByUserId(userId)
  }
}

export default EmployeeService
