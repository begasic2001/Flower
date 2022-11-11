import express from "express";
import PostCategoryController from "../controller/PostCategoryController";
const route = express.Router();
route.get("/category", PostCategoryController.postCategoryView);
route.get("/getPostCategoryEdit/:id", PostCategoryController.getPostCategoryEdit);
route.post("/storeBlogCategory", PostCategoryController.storeBlogCategory);
route.delete("/deleteBlogCategory", PostCategoryController.deleteBlogCategory);
route.put("/updateBlogCategory", PostCategoryController.updateBlogCategory);


module.exports = route