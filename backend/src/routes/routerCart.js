import { Router } from "express";
import { getCart,addProduct,deleteProduct } from "../controllers/cart.controller.js";

const routes = new Router();
routes.post("/getCart", getCart);
routes.post("/addProdCart", addProduct);
routes.delete("/productCart", deleteProduct);

export default routes;
