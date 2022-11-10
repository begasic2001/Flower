import express from "express";
import BrandController from "../controller/BrandController";
const route = express.Router();
// 
route.get("/category/list", BrandController.brandView);
module.exports = route