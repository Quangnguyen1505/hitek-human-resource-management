import { Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'
import AuthService from '../services/auth/auth.service'
import { AuthRequest } from '../middlewares/authentication'

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

  changePassword = async (req: AuthRequest, res: Response) => {
    const userId: string = req.user?.userId as string
    await AuthService.changePassword(userId, req.body)

    new SuccessResponse({
      message: 'changePassword successfully!'
    }).send(res)
  }
}

export default new AuthController()
