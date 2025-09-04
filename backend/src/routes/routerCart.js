import { Router } from "express";
import { getCart, addProduct } from "../controllers/cart.controller.js";

const routes = new Router();

routes.post("/getCart", getCart);
routes.post("/addProdCart", addProduct);

export default routes;
