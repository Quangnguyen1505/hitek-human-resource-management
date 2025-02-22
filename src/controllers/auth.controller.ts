import { Request, Response } from 'express'
import { SuccessResponse } from '../core/success.response'
import AuthService from '../services/auth/auth.service'
import { AuthRequest } from '../middlewares/authentication'
import { AuthFailureError } from '~/core/error.response'

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
      metadata: await AuthService.login(req.body)
    }).send(res)
  }

  changePassword = async (req: AuthRequest, res: Response) => {
    const userId: string = req.user?.userId as string
    await AuthService.changePassword(userId, req.body)

    new SuccessResponse({
      message: 'changePassword successfully!'
    }).send(res)
  }

  handleRefreshToken = async (req: AuthRequest, res: Response) => {
    if (!req.user || !req.keyStore) {
      throw new AuthFailureError('User or key not authenticated')
    }

    new SuccessResponse({
      message: 'RefreshToken is successfully !',
      metadata: await AuthService.HandlerRefreshToken({
        refreshToken: req.refreshToken as string,
        user: req.user,
        keyStore: req.keyStore
      })
    }).send(res)
  }
}

export default new AuthController()
