import express from "express";
import CategoryController from "../controller/CategoryController";
const route = express.Router();

// Admin Category
route.get("/category", CategoryController.categoryView);
route.get("/dashboard", CategoryController.dashboard);
// API
route.get("/categoryAPI", CategoryController.category);
route.post("/storeCategory", CategoryController.storeCategory);
route.get("/getCategoryEdit/:id", CategoryController.getCategoryEdit);
route.put("/updateCategory/:id", CategoryController.updateCategory);
route.get("/deleteCategory/:id", CategoryController.deleteCategory);
route.get("/category/:id", CategoryController.categoryById);
module.exports = route;
