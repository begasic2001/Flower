import express from "express";
import CategoryController from "../controller/CategoryController";
const route = express.Router();
route.get("/subcategory", CategoryController.category);
route.post("/storeSubCategory", CategoryController.storeCategory);
route.put("/updateSubCategory/:id", CategoryController.updateCategory);
route.delete("/deleteSubCategory/:id", CategoryController.deleteCategory);
route.get("/subcategory/:id", CategoryController.categoryById);
module.exports = route;