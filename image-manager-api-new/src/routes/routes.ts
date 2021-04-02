import { ImageController } from '../controller/image-controller';
import { UserController } from '../controller/user-controller';

export const Routes = [
  {
    method: 'get',
    route: '/users',
    guard: true,
    controller: UserController,
    action: 'getAllUsers',
  },
  {
    method: 'get',
    route: '/users/:id',
    guard: true,
    controller: UserController,
    action: 'getUserById',
  },
  {
    method: 'post',
    route: '/users/login',
    controller: UserController,
    action: 'loginByCredentials',
  },
  {
    method: 'post',
    route: '/users',
    guard: true,
    controller: UserController,
    action: 'saveUser',
  },
  {
    method: 'delete',
    route: '/users/:id',
    guard: true,
    controller: UserController,
    action: 'removeUser',
  },
  {
    method: 'get',
    route: '/images',
    guard: true,
    controller: ImageController,
    action: 'getAllImages'
  },
  {
    method: 'get',
    route: '/images/:id',
    guard: true,
    controller: ImageController,
    action: 'getImageById'
  },
  {
    method: 'post',
    route: '/images',
    guard: true,
    controller: ImageController,
    action: 'saveImages'
  },
];
