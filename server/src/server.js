import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import route from "./route/route";
import connect_mssql from "./config/connect_mssql";
import path from "path";
import methodOverride from "method-override";
import moment from "moment";
require("./config/connect_redis");
require("dotenv").config();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME || "localhost";

//Swagger DOC_API
const adapter = new FileSync("db.json");
const db = low(adapter);
const definition = {
  openapi: "3.0.0",
  info: {
    title: "Flower API",
    version: "1.0.0",
    description: "A simple Express API FLOWER",
  },
  servers: [
    {
      url: "http://localhost:9000",
    },
  ],
  
};
const options = {
  definition,
  apis: ["./src/route/*.js"],
};
const specs = swaggerJSDoc(options);
const app = express();
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// call morgan
app.use(morgan("combined"));
app.locals.moment = moment;
// call swagger
app.db = db;
// connect sql server trash
connect_mssql();
// import router in folder route
app.use(cors());
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

app.listen(port, () => {
  console.log(`http://${hostname}:${port}`);
});
