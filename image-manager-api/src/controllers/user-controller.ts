import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';
import * as jwt from 'jsonwebtoken';
import { env } from '../env';
import { STATUS_CODES } from '../common/status-codes';

export class UserController {
  private userRepository = getRepository(User);

  // POST
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Error | string | null> {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = this.userRepository.findOne(
        {
          where:
          {
            email: email,
            password: password
          },
        }
      );
      user
        .then(
          (user) => {
            if (user) {
              const accessToken = jwt
                .sign(
                  { ...user },
                  env.TOKEN_SECRET,
                  {
                    expiresIn: '24h',
                  }
                );
              console.log(accessToken);
              return res.json(accessToken);
            } else {
              return res.sendStatus(STATUS_CODES.UNAUTHORIZED);
            }
          }
        )
        .catch(
          (error) => {
            return error;
          }
        );
    } catch (exception) {
      return exception;
    }
  }
}
