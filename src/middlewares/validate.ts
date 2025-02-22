import { Request, Response, NextFunction } from 'express'
import { param, validationResult, body, ValidationChain } from 'express-validator'

// Validate param ID
const checkParamsId = (id: string) => {
  return [
    param(id)
      .notEmpty()
      .withMessage('Id cannot be empty')
      .trim()
      .isLength({ min: 5 })
      .withMessage('ID must be at least 5 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() })
        return
      }
      return next()
    }
  ]
}

// Validate result
const resultValiDate = (req: Request, res: Response, next: NextFunction): void => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() })
    return
  }
  return next()
}

// Validate input
const checkInputExists = (value_1: string, value_2: string): ValidationChain[] => {
  return [
    body(value_1).notEmpty().withMessage(`${value_1} is required`).trim(),
    body(value_2).notEmpty().withMessage(`${value_2} is required`).trim()
  ]
}

export { checkParamsId, resultValiDate, checkInputExists }
