import express from "express";
import SubCategoryController from "../controller/SubCategoryController";
const route = express.Router();
// Admin Category
route.get("/subcategory", SubCategoryController.subCategoryView);
// API
// route.get("/subCategoryAPI", SubCategoryController.subCategory);
// route.post("/storeSubCategory", SubCategoryController.storeSubCategory);
// route.get("/getSubCategoryEdit/:id", SubCategoryController.getCategoryEdit);
// route.put("/updateSubCategory/", SubCategoryController.updateSubCategory);
// route.delete("/deleteSubCategory/", SubCategoryController.deleteSubCategory);
// route.get("/subcategory/:id", SubCategoryController.subCategoryById);
module.exports = route;
