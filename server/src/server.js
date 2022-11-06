import express from "express";
import createError from "http-errors";
import cors from "cors";
import route from "./route/route";
import connect_mysql from "./config/connect_mysql";
import path from "path";
import methodOverride from "method-override";
import moment from 'moment'
require("./config/connect_redis");
require("dotenv").config();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME || "localhost";
const app = express();
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.locals.moment = moment;
connect_mysql();
route(app);

//using ejs template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//using public file
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});
app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});
app.use(cors());
app.listen(port, () => {
  console.log(`http://${hostname}:${port}/api`);
});
