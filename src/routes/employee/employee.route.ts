import express, { Router } from 'express'
import asyncHandler from '~/utils/asyncHandle'
import EmployeeController from '../../controllers/employee.controller'
import authencation from '~/middlewares/authentication'

const router: Router = express.Router()

router.use(authencation)

router.get('/:userId', asyncHandler(EmployeeController.getOneEmployees))
router.get('/', asyncHandler(EmployeeController.getEmployees))
router.put('/', asyncHandler(EmployeeController.updateEmployee))
router.delete('/:userId', asyncHandler(EmployeeController.deleteEmployee))

export default router
