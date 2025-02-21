import { Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'

import EmployeeService from '~/services/employment/employee.service'

class UserController {
  getEmployees = async (req: Request, res: Response) => {
    new SuccessResponse({
      message: 'get employee successfully!',
      metadata: await EmployeeService.getEmployees(req.query)
    }).send(res)
  }

  getOneEmployees = async (req: Request, res: Response) => {
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
