import { Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'

import AuthService from '../services/auth.service'

class UserController {
  register = async (req: Request, res: Response) => {
    new SuccessResponse({
      message: 'register successfully!',
      metadata: await AuthService.register(req.body)
    }).send(res)
  }

  login = async (req: Request, res: Response) => {
    new SuccessResponse({
      message: 'login successfully!',
      metadata: await AuthService.Login(req.body)
    }).send(res)
  }

  getUser = async (req: Request, res: Response) => {
    new SuccessResponse({
      message: 'get employee successfully!',
      metadata: await AuthService.getUser()
    }).send(res)
  }
}

export default new UserController()
