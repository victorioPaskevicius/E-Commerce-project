import { Router } from "express";
import { getCart } from "../controllers/cart.controller.js";

const routes = new Router();

routes.post("/cart", getCart);

export default routes;
