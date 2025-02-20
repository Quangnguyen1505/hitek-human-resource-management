import express from 'express'

import userRoutes from './auth/auth.route'

const router = express.Router()

router.use('/api/v1/auth', userRoutes)

export default router
