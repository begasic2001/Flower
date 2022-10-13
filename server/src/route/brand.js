import express from "express";
import BrandController from "../controller/BrandController";
import uploadImage from "../services/firebase_service";
import Multer from "../config/upload";
const route = express.Router();

// Admin Category
// route.get("/category", CategoryController.categoryView);
// route.get("/dashboard", CategoryController.dashboard);
// // API
// route.get("/categoryAPI", CategoryController.category);
// route.post("/storeCategory", CategoryController.storeCategory);
// route.get("/getCategoryEdit/:id", CategoryController.getCategoryEdit);
// route.put("/updateCategory/:id", CategoryController.updateCategory);
// route.get("/deleteCategory/:id", CategoryController.deleteCategory);
// route.get("/category/:id", CategoryController.categoryById);
route.post(
  "/storeBrand",
  Multer.single("image"),
  uploadImage,
  BrandController.storeBrand
);

module.exports = route;
