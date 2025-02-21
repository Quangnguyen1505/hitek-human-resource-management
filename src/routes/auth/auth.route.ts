import express, { Router } from 'express'
import asyncHandler from '~/utils/asyncHandle'
import AuthController from '../../controllers/auth.controller'
import authencation from '~/middlewares/authentication'

const router: Router = express.Router()

router.post('/register', asyncHandler(AuthController.register))

router.post('/login', asyncHandler(AuthController.login))

router.use(authencation)

router.post('/change-password', asyncHandler(AuthController.changePassword))

export default router
