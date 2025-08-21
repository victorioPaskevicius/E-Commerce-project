import { Router } from "express";
import {
  getUsers,
  getUser,
  getUserLogin,
  createUserRegister,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const routes = new Router();

routes.get("/users", getUsers);
routes.get("/user/:id", getUser);
routes.post("/userLogin", getUserLogin);
routes.post("/users", createUserRegister);
routes.put("/user/:id", updateUser);
routes.delete("/user/:id", deleteUser);

export default routes;
