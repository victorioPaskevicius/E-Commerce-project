import { Router } from "express";
import {
  getProducts,
  getProduct,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const routes = new Router();

// Routes
routes.get("/products", getProducts);
routes.get("/products/:id", getProduct);
routes.get("/products/category/:id", getProductsByCategory);
routes.post("/products", createProduct);
routes.put("/products/:id", updateProduct);
routes.delete("/products/:id", deleteProduct);

export default routes;
