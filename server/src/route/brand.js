import express from "express";
import BrandController from "../controller/BrandController";
import uploadCloud from "../config/cloudinary";
import uploadImage from "../services/firebase_service";
import Multer from "../config/upload";
const route = express.Router();

//Admin Brand
route.get("/brand", BrandController.brandView);
// API
route.get("/brandAPI", BrandController.brand);
route.post("/storeBrand",uploadCloud.single('image'), BrandController.storeBrand);
// route.get("/getBrandEdit/:id", BrandController.getBrandEdit);
// route.put("/updateBrand/:id", BrandController.updateBrand);
// route.delete("/deleteBrand/:id", BrandController.deleteBrand);
// route.get("/brand/:id", BrandController.brandById);
// route.post(
//   "/storeBrand",
//   Multer.single("image"),
//   uploadImage,
//   BrandController.storeBrand
// );

module.exports = route;
