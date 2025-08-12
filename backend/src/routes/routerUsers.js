import { Router } from "express";
import {
  getUsers,
  getUser,
  getUserLogin,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users.controller.js";

const routes = new Router();

routes.get("/users", getUsers);
routes.get("/user/:id", getUser);
routes.post("/userLogin", getUserLogin);
routes.post("/users", createUser);
routes.put("/user/:id",updateUser);
routes.delete("/user/:id", deleteUser);

export default routes;
