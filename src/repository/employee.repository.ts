import EmployeeModel, { IUser } from '~/models/employee.model'
import { SortOrder, Types } from 'mongoose'
import { BadRequestError, NotFoundError } from '~/core/error.response'
import { unGetDataSelectProduct } from '~/utils'

interface UpdateEmployeeParams {
  userId: Types.ObjectId
  payload: Partial<IUser>
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

  const employee = await EmployeeModel.findOne({ username }).lean()
  return employee
}

const findEmployeeById = async (userId: string, excludePassword = false): Promise<IUser | null> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestError('userId invalid')
  }

  const unselect = excludePassword ? ['__v', 'password'] : []
  const employee = await EmployeeModel.findById(userId).select(unGetDataSelectProduct(unselect)).lean()
  return employee
}

const deleteEmployeeByUserId = async (userId: string): Promise<boolean> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestError('userId invalid')
  }

  const employee = await EmployeeModel.findByIdAndDelete(userId)
  return !!employee
}

const findAllEmployees = async ({
  limit,
  sort,
  page,
  filter,
  unselect
}: {
  limit: number
  sort: string
  page: number
  filter: object
  unselect: string[]
}) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 as SortOrder } : { _id: 1 as SortOrder }
  const employees = await EmployeeModel.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(unGetDataSelectProduct(unselect))

  const totalCount = await EmployeeModel.countDocuments(filter)

  return { employees, totalCount }
}

export { updateEmployeeById, findEmployeeByUserName, findEmployeeById, deleteEmployeeByUserId, findAllEmployees }
