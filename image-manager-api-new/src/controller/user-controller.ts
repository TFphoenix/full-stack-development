import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import { env } from '../env';
import { STATUS_CODES } from '../shared/status-codes';

export class UserController {
  private userRepository = getRepository(User);

  // POST
  async loginByCredentials(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Error | string | null> {
    try {
      const { username, password } = req.body;
      const user = this.userRepository.findOne({
        where: { username: username, password: password },
      });
      user
        .then((user) => {
          console.log(user);
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
            return res.sendStatus(401);
          }
        })
        .catch((err) => {
          return err;
        });
    } catch (exception) {
      return exception;
    }
  }

  // GET/:id
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Error | User | null> {
    if (!req.params.id || typeof req.params.id !== 'number')
      return Error('invalid params');
    try {
      return this.userRepository.findOne(req.params.id);
    } catch (exception) {
      return exception;
    }
  }

  // GET
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Error | User[] | null> {
    try {
      return this.userRepository.find();
    } catch (exception) {
      return exception;
    }
  }

  // POST
  async saveUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body.username || !req.body.password) {
      return Error('Invalid body');
    }
    try {
      console.log(req.body);
      return this.userRepository.save(req.body);
    } catch (exception) {
      return exception;
    }
  }

  // DELETE
  async removeUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let userToRemove = await this.userRepository.findOne(req.params.id);
    await this.userRepository.remove(userToRemove);
  }
}
