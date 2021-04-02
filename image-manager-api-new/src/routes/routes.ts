import { ImageController } from "../controller/image-controller";
import { UserController } from "../controller/user-controller";

export const Routes = [
  // USERS
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login",
  },
  // IMAGES
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
  {
    method: "post",
    route: "/images/evaluate",
    guard: false,
    controller: ImageController,
    action: "evaluateImage",
  },
  {
    method: "post",
    route: "/images/train",
    guard: false,
    controller: ImageController,
    action: "trainImage",
  },
];
