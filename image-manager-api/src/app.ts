// Heroku:
import { MongoDriver } from '@mikro-orm/mongodb';
const cors = require('cors');
// Heroku^

const express = require('express');
import { Application, Router, Request, Response, NextFunction } from 'express';

import { env } from './env';

import { IExpressError } from './interfaces/orm/IExpressError';
import { IExpressRequest } from './interfaces/orm/IExpressRequest';
import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core';
import entities from './entities';

import { setUserRoute } from './routes/users.route';
// Authentication:
import { setRegisterRoute } from './routes/register.route';
import { setLoginRoute } from './routes/login.route';

let app: Application;

async function makeApp(): Promise<Application> {
  if (app) { return app; }

  app = express();
  app.use(cors());

  app.use(express.static('build'));

  const orm = await MikroORM.init<MongoDriver>({
    metadataProvider: ReflectMetadataProvider,
    cache: { enabled: false },
    entities: entities,
    dbName: env.DB_NAME,
    clientUrl: env.MONGO_URL,
    type: 'mongo'
  });

  // make the entity manager available in request
  app.use(
    (req: IExpressRequest, _res: Response, next: NextFunction) => {
      req.em = orm.em.fork();	// em = entity manager
      next();
    }
  );

  console.log('env:', env);

  // middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // routes
  app.use(env.USERS_ROUTE, setUserRoute(Router()));
  app.use(env.REGISTER_ROUTE, setRegisterRoute(Router()));
  app.use(env.LOGIN_ROUTE, setLoginRoute(Router()));
  // app.use(env.INVENTORY_ITEMS_ROUTE, setInventoryItemRoute(Router()));

  // 404
  app.use(
    (_req: Request, _res: Response, next: NextFunction) => {
      const err = new Error('Not Found') as IExpressError;
      err.status = 404;
      next(err);
    }
  );

  // 500
  app.use(
    (err: IExpressError, _req: Request, res: Response, _next: NextFunction) => {
      res
        .status(err.status || 500)
        .send(env.NODE_ENV === 'development' ? err : {});
    }
  );

  return app;
}

export { makeApp };