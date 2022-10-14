import express from "express";
import SubCategoryController from "../controller/SubCategoryController";
const route = express.Router();
route.get("/subCategory", SubCategoryController.sub_Category);
route.post("/storeSubCategory", SubCategoryController.sub_StoreCategory);
route.put("/updateSubCategory/:id", SubCategoryController.sub_UpdateCategory);
route.delete(
  "/deleteSubCategory/:id",
  SubCategoryController.sub_DeleteCategory
);
module.exports = route;
