import express from "express";
import CategoryController from "../controller/CategoryController";
const route = express.Router();
route.get("/category", CategoryController.category);
route.post("/storeCategory", CategoryController.storeCategory);
route.put("/updateCategory/:id", CategoryController.updateCategory);
route.delete("/deleteCategory/:id", CategoryController.deleteCategory);
route.get("/category/:id", CategoryController.categoryById);
module.exports = route;
