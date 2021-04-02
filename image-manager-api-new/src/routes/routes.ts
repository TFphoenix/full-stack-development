import { ImageController } from "../controller/image-controller";
import { UserController } from "../controller/user-controller";

export const Routes = [
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "loginByCredentials",
  },
  {
    method: "get",
    route: "/images",
    guard: true,
    controller: ImageController,
    action: "getAllImages",
  },
  {
    method: "get",
    route: "/images/:id",
    guard: true,
    controller: ImageController,
    action: "getImageById",
  },
  {
    method: "post",
    route: "/images",
    guard: true,
    controller: ImageController,
    action: "saveImages",
  },
];
