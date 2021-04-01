import { Router, Response, NextFunction } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { IExpressRequest } from '../interfaces/orm/IExpressRequest';
import * as userService from '../services/users.service';
import { decryptPassword } from '../services/password.service';
import { IAuthResponseData } from '../interfaces/IAuthResponseData';
import { AuthResponseData } from '../models/AuthResponseData';

export { setLoginRoute };

function setLoginRoute(router: Router): Router {
    router.post('/', loginUser);
    return router;
}

const THIRTY_MINUTES: number = 1800;    // in seconds

// POST
async function loginUser(
    req: IExpressRequest,
    res: Response,
    next: NextFunction
) {
    if (!req.em || !(req.em instanceof EntityManager)) {
        console.log(`ERROR: login.route.ts, loginUser(): req.em is not instanceof EntityManager`);
        return next(Error('EntityManager not available'));
    }

    console.log('');
    console.log('login.route.ts, loginUser():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);

    let response: Error | User | IAuthResponseData | null;
    try {

        const body = req.body;

        response = await userService
            .getUserByEmail(
                req.em,
                body.email
            );

        if (!response) {
            const userDoesNotExistError: Error = new Error;
            userDoesNotExistError.name = 'NO_ACCOUNT';
            userDoesNotExistError.message = 'No account found!';
            return res.status(404).json(userDoesNotExistError);
        }

        if (response instanceof Error) {
            return next(response);
        }

        if (response instanceof User) {
            console.log(response);
            const formPassword = body.password;
            const storedPassword = response.password;
            console.log('formPass:', formPassword);
            console.log('storedPassword:', storedPassword);
            const match = decryptPassword(formPassword, storedPassword);
            if (match) {
                console.log('Passwords match!');
                let authResponseData: IAuthResponseData = new AuthResponseData;
                authResponseData.email = response.email;
                authResponseData.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
                authResponseData.id = response.id;
                authResponseData.expiresIn = THIRTY_MINUTES;
                return res.status(200).json(authResponseData);
            } else {
                const wrongPasswordError: Error = new Error;
                wrongPasswordError.name = 'WRONG_PASSWORD';
                wrongPasswordError.message = 'Wrong e-mail or password!';
                return res.status(401).json(wrongPasswordError);
            }
        }

        console.log('login.route.ts, loginUser()^');
        console.log('');

    } catch (ex) {
        return next(ex);
    }
}