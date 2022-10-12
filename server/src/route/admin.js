import express from "express";
import AdminController from "../controller/AdminController";

const route = express.Router();

route.get("/dashboard", AdminController.dashboard);
module.exports = route;