import express from "express";
import PostCategoryController from "../controller/PostCategoryController";
import uploadCloud from "../config/cloudinary";
const route = express.Router();
route.get("/category", PostCategoryController.postCategoryView);
route.get(
  "/getPostCategoryEdit/:id",
  PostCategoryController.getPostCategoryEdit
);
route.post("/storeBlogCategory", PostCategoryController.storeBlogCategory);
route.delete("/deleteBlogCategory", PostCategoryController.deleteBlogCategory);
route.put("/updateBlogCategory", PostCategoryController.updateBlogCategory);
// blog post blogPost
route.get("/blogPost", PostCategoryController.blogPost);
route.post(
  "/storeBlogPost",
  uploadCloud.single("image"),
  PostCategoryController.storeBlogPost
);
//listBlog
route.get("/listBlog", PostCategoryController.listBlog);
route.get("/getListPostEdit/:id", PostCategoryController.getListPostEdit);
route.put(
  "/updateListBlogCategory",
  uploadCloud.single("image"),
  PostCategoryController.updateListBlogCategory
);
route.delete("/deleteListBlog", PostCategoryController.deleteListBlog);
module.exports = route;
