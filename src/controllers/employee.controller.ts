import { Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'

import EmployeeService from '~/services/employment/employee.service'
import { BadRequestError } from '~/core/error.response'

class UserController {
  getEmployees = async (req: Request, res: Response) => {
    console.log(req.query)
    new SuccessResponse({
      message: 'get employee successfully!',
      metadata: await EmployeeService.getEmployees(req.query)
    }).send(res)
  }

  getOneEmployees = async (req: Request, res: Response) => {
    if (!req.params.userId) throw new BadRequestError('params userId empty')

    new SuccessResponse({
      message: 'get employee successfully!',
      metadata: await EmployeeService.getOneEmployees(req.params.userId)
    }).send(res)
  }

  updateEmployee = async (req: Request, res: Response) => {
    new SuccessResponse({
      message: 'update successfully!',
      metadata: await EmployeeService.updateEmployeeByUserId(req.body)
    }).send(res)
  }

  deleteEmployee = async (req: Request, res: Response) => {
    await EmployeeService.deleteEmployeeByUserId(req.params.userId)

    new SuccessResponse({
      message: 'delete successfully!'
    }).send(res)
  }
}

export default new UserController()
