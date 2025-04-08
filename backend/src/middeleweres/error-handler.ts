import { ErrorRequestHandler, Request, Response } from 'express';

const errorHandler: ErrorRequestHandler = (
  err,
  _: Request,
  res: Response,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).send({ message });
};

export default errorHandler;
