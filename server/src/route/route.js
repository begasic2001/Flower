import routerUser from "./user.js";
import routerCategory from "./category.js";
import routerAdmin from "./adminator.js"
const app = (app) => {
    app.use("/api/auth", routerUser);
    app.use("/api/cate", routerCategory);
    app.use("/api/admin", routerAdmin);
};

module.exports = app;