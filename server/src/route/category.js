import express from "express";
import CategoryController from "../controller/CategoryController";
const route = express.Router();

// Admin Category
route.get("/revenue", CategoryController.revenue);
route.get("/category", CategoryController.categoryView);
route.get("/dashboard", CategoryController.dashboard);
// API
route.get("/categoryAPI", CategoryController.category);
route.post("/storeCategory", CategoryController.storeCategory);
route.get("/getCategoryEdit/:id", CategoryController.getCategoryEdit);
route.put("/updateCategory/", CategoryController.updateCategory);
route.delete("/deleteCategory/", CategoryController.deleteCategory);
route.get("/category/:id", CategoryController.categoryById);
module.exports = route;
