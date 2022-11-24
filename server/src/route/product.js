import express from "express";
import ProductController from "../controller/productController";
import uploadCloud from "../config/cloudinary";
const route = express.Router();
const cpUpload = uploadCloud.fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
]);
// Admin product
route.get("/product", ProductController.productView);
route.get("/addProduct", ProductController.getAddProduct);
route.get("/productDetail/:id", ProductController.getproductDetail);
//
// API

route.get("/getSubCate/:categories_id", ProductController.getSubCate);
route.put("/activeProduct/:id", ProductController.activeProduct);
route.put("/inactiveProduct/:id", ProductController.inactiveProduct);
route.post(
  "/storeProduct",
  uploadCloud.array("image"),
  ProductController.storeProduct
);
route.get("/getProductEdit/:id", ProductController.getProductEdit);
route.put("/updateProduct/", cpUpload, ProductController.updateProduct);
route.delete("/deleteProduct/", ProductController.deleteProduct);
// client
route.get("/getProduct", ProductController.product);
module.exports = route;
