import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as jwt from 'express-jwt';
import { STATUS_CODES } from './shared/status-codes';
import { Application, Request, Response, NextFunction } from 'express';

import { Routes } from './routes/routes';
import { checkBearer } from './auth/check-bearer';
import { env } from './env';

createConnection()
  .then(
    async (connection) => {
      let app: Application;
      app = express();

      // middleware
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      // JWT
      app.use(
        jwt(
          {
            secret: env.TOKEN_SECRET,
            algorithms: ['HS256'],
          }
        ).unless({ path: ['/users/login'] })
      );

      app.use(
        function (err, req, res, next) {
          if (err.name === 'UnauthorizedError') {
            res.sendStatus(STATUS_CODES.UNAUTHORIZED);
          }
        }
      );

      console.log('env:', env);

      // routes
      Routes.forEach(
        (route) => {
          (app as any)[route.method](
            route.route,
            (
              req: Request,
              res: Response,
              next: NextFunction
            ) => {
              try {
                if (route.guard) {
                  const statusCode = checkBearer(req, res, next);
                  if (statusCode === STATUS_CODES.OK) {
                    const result = new (route.controller as any)()[route.action]
                      (
                        req,
                        res,
                        next
                      );
                    if (result instanceof Promise) {
                      result.then((result) =>
                        result !== null && result !== undefined
                          ? res.send(result)
                          : undefined
                      );
                    } else if (result !== null && result !== undefined) {
                      JSON.stringify(result);
                    }
                  } else {
                    res.sendStatus(statusCode);
                  }
                } else {
                  const result = new (route.controller as any)()[route.action]
                    (
                      req,
                      res,
                      next
                    );
                  if (result instanceof Promise) {
                    result.then((result) =>
                      result !== null && result !== undefined
                        ? res.send(result)
                        : undefined
                    );
                  } else if (result !== null && result !== undefined) {
                    JSON.stringify(result);
                  }
                }
              } catch (exception) {
                return express.response.sendStatus(STATUS_CODES.SERVER_ERROR);
              }
            }
          );
        });

      const port = env.PORT;
      app.listen(port);

      console.log(`${env.NODE_ENV} server listening on port ${env.PORT}`);
    }
  )
  .catch(
    (error) => {
      console.log(error)
    }
  );
