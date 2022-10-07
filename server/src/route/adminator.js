import express from "express";
import AdminatorController from "../controlller/AdminatorController";

const route = express.Router();

route.get('/index', AdminatorController.index);
route.get('/dashboard', AdminatorController.dashboard);
route.get('/productmanament', AdminatorController.productmanament);
module.exports = route;