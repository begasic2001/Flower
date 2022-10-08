import express from "express";
import BrandController from "../controller/BrandController";
import uploadImage from "../services/firebase_service";
import Multer from "../config/upload";
const route = express.Router();

route.post(
  "/storeBrand",
  Multer.single("image"),
  uploadImage,
  BrandController.storeBrand
);

module.exports = route;
