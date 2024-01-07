import { NextFunction, Request, Response } from "express";

interface Err {
  message: string,
  statusCode: number,
  stack: string
}

function errorMiddleware(err: Err, req: Request, res: Response, next: NextFunction) {
  let message = err.message || 'something went wrong'
  console.log('err: ' + err);
  
  return res.status(err.statusCode || 500).json({
    success: false,
    message,
    stack: err.stack
  })
}

export default errorMiddleware;
