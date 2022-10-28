import express from "express";
import ProductController from "../controller/productController";
import uploadCloud from "../config/cloudinary";
const route = express.Router();

// Admin product
route.get("/product", ProductController.productView);
route.get("/addProduct", ProductController.getAddProduct);
// API
route.get("/getSubCate/:categories_id", ProductController.getSubCate);
// route.get("/productAPI", ProductController.product);
route.post(
  "/storeProduct",
  uploadCloud.array("image"),
  ProductController.storeProduct
);
// route.get("/getProductEdit/:id", ProductController.getProductEdit);
// route.put("/updateProduct/", ProductController.updateProduct);
// route.delete("/deleteProduct/", ProductController.deleteProduct);
// route.get("/product/:id", ProductController.productById);
module.exports = route;
