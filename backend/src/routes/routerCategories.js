import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { Router } from "express";

const routes = Router();

routes.get("/categories", getCategories);
routes.get("/categories/:id", getCategory);
routes.post("/categories", createCategory);
routes.put("/categories/:id", updateCategory);
routes.delete("/categories/:id", deleteCategory);

export default routes;
