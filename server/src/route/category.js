import express from "express";
import CategoryController from "../controlller/CategoryController";
const route = express.Router();
route.get("/category", CategoryController.category);
route.post("/storeCategory", CategoryController.storeCategory);
route.post("/updateCategory", CategoryController.updateCategory);
route.delete("/deleteCategory", CategoryController.deleteCategory);
route.get("/category/:categoryId", CategoryController.categoryById);
module.exports = route;
