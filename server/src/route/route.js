import routerUser from "./user.js";
import routerCategory from "./category.js";
const app = (app) => {
	app.use("/api/auth", routerUser);
	app.use("/api/cate", routerCategory);
};

module.exports = app;
