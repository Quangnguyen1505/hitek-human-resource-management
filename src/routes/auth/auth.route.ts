import express, { Router } from 'express'
import asyncHandler from '~/utils/asyncHandle'
import AuthController from '../../controllers/auth.controller'
import authencation from '~/middlewares/authentication'
import { checkInputExists, resultValiDate } from '~/middlewares/validate'

const router: Router = express.Router()

router.post(
  '/register',
  checkInputExists('username', 'password'),
  resultValiDate,
  asyncHandler(AuthController.register)
)

router.post('/login', checkInputExists('username', 'password'), resultValiDate, asyncHandler(AuthController.login))

router.use(authencation)

router.post(
  '/change-password',
  checkInputExists('oldPassword', 'newPassword'),
  resultValiDate,
  asyncHandler(AuthController.changePassword)
)
router.post('/handler-refreshToken', asyncHandler(AuthController.handleRefreshToken))

export default router
