import EmployeeModel, { IUser } from '~/models/employee.model'
import { Types } from 'mongoose'
import { BadRequestError, NotFoundError } from '~/core/error.response'

interface UpdateEmployeeParams {
  userId: Types.ObjectId
  payload: Partial<Record<string, any>>
  isNew?: boolean
}

const updateEmployeeById = async ({ userId, payload, isNew = true }: UpdateEmployeeParams) => {
  try {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestError('Invalid user ID')
    }

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(userId, payload, {
      new: isNew,
      runValidators: true
    })

    if (!updatedEmployee) {
      throw new NotFoundError('Employee not found')
    }

    return updatedEmployee
  } catch (error) {
    console.error('Error updating employee:', error)
    throw error
  }
}

const findEmployeeByUserName = async (username: string): Promise<IUser | null> => {
  if (!username) {
    throw new BadRequestError('Username invalid')
  }

  const employee = await EmployeeModel.findOne({ username })
  return employee
}

const findEmployeeById = async (userId: string): Promise<IUser | null> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestError('userId invalid')
  }

  const employee = await EmployeeModel.findById(userId)
  return employee
}

const deleteEmployeeByUserId = async (userId: string): Promise<boolean> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestError('userId invalid')
  }

  const employee = await EmployeeModel.findByIdAndDelete(userId)
  return !!employee
}

export { updateEmployeeById, findEmployeeByUserName, findEmployeeById, deleteEmployeeByUserId }
