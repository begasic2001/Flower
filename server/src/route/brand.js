import express from "express";
import BrandController from "../controller/BrandController";
import uploadCloud from "../config/cloudinary";
const route = express.Router();

//Admin Brand
route.get("/brand", BrandController.brandView);
// API
route.get("/brandAPI", BrandController.brand);
route.post(
  "/storeBrand",
  uploadCloud.single("image"),
  BrandController.storeBrand
);
route.get("/getBrandEdit/:id", BrandController.getBrandEdit);
route.put(
  "/updateBrand",
  uploadCloud.single("image"),
  BrandController.updateBrand
);
route.delete("/deleteBrand/", BrandController.deleteBrand);
// route.get("/brand/:id", BrandController.brandById);

module.exports = route;
