import express from 'express'

import userRoutes from './auth/auth.route'
import employeeRouter from './employee/employee.route'

const router = express.Router()

router.use('/api/v1/auth', userRoutes)
router.use('/api/v1/employees', employeeRouter)

export default router
