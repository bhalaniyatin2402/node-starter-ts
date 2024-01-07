import { NextFunction, Request, Response } from "express"
import AppError from "../utils/error.utils"

export type asyncHandlerArgType<T = Request> = (req: T, res: Response, next: NextFunction) => Promise<any>

const asyncHandler = <T = Request>(fn: asyncHandlerArgType<T>) => {
  return (req: T, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(new AppError(err, 400)))
  }
}

export default asyncHandler
