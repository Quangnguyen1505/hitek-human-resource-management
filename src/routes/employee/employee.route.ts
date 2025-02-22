import express, { Router } from 'express'
import asyncHandler from '~/utils/asyncHandle'
import EmployeeController from '../../controllers/employee.controller'
import authencation from '~/middlewares/authentication'
import { query } from 'express-validator'
import { checkParamsId, resultValiDate } from '~/middlewares/validate'

const router: Router = express.Router()

router.use(authencation)

router.get('/:userId', checkParamsId('userId'), asyncHandler(EmployeeController.getOneEmployees))

router.get(
  '',
  [
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be at least 1'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be at least 1'),
    query('sort').optional().isString().withMessage('Sort must be a string'),
    query('filter')
      .optional()
      .custom((value) => {
        try {
          JSON.parse(value)
          return true
        } catch {
          throw new Error('Filter must be a valid JSON string')
        }
      })
  ],
  resultValiDate,
  asyncHandler(EmployeeController.getEmployees)
)

router.put('/', asyncHandler(EmployeeController.updateEmployee))

router.delete('/:userId', checkParamsId('userId'), asyncHandler(EmployeeController.deleteEmployee))

export default router
