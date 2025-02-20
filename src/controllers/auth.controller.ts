import { Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'

import AuthService from '../services/auth.service'

class AuthController {
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
}

export default new AuthController()
