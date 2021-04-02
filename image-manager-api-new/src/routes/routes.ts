import { ImageController } from "../controller/image-controller";
import { UserController } from "../controller/user-controller";
import { EvaluationController } from '../controller/evaluation-controller';

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
  // EVALUATE
  {
    method: "post",
    route: "/evaluate",
    guard: false,
    controller: EvaluationController,
    action: "evaluate"
  }
];
