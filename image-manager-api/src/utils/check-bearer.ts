import * as jwt from 'jsonwebtoken';
import { env } from '../env';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/status-codes';

const checkBearer = (req: Request, res: Response, next: NextFunction): number => {
  let statusCode = STATUS_CODES.OK;

  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    statusCode = STATUS_CODES.UNAUTHORIZED;
  } else {
    const bearer = bearerHeader.split(' ');
    const accessToken = bearer[1];
    try {
      jwt
        .verify(
          accessToken,
          env.TOKEN_SECRET,
          (error) => {
            if (error) {
              statusCode = STATUS_CODES.UNAUTHORIZED;
            }
          }
        );
    } catch (exception) {
      statusCode = STATUS_CODES.SERVER_ERROR;
    }
  }

  return statusCode;
};

export { checkBearer };
