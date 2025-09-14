import { Router } from "express";
import {newOrder} from "../controllers/orders.controller.js";

const routes = new Router();

routes.post("/order", newOrder);

export default routes;
