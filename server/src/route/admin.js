import express from "express";
import AdminController from "../controller/AdminController";

const route = express.Router();

route.get("/dashboard", AdminController.dashboard);

// Admin Category
route.get("/category", AdminController.category);
route.post("/storeCategory", AdminController.storeCategory);
route.get("/deleteCategory/:id", AdminController.deleteCategory);
module.exports = route;
