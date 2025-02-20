import express, { Router } from 'express'
import asyncHandler from '~/utils/asyncHandle'
import UserController from '../../controllers/auth.controller'
import authencation from '~/middlewares/authentication'

const router: Router = express.Router()

router.post('/register', asyncHandler(UserController.register))
router.post('/login', asyncHandler(UserController.login))

router.use(authencation)

router.get('/', asyncHandler(UserController.getUser))

export default router
