import routerUser from "./user.js";
import routerCategory from "./category.js";
import routerAdmin from "./adminator.js";
import routerBrand from "./brand.js";
import routerSubCate from "./subcategory.js"
const app = (app) => {
    app.use("/api/auth", routerUser);
    app.use("/api/cate", routerCategory);
    app.use("/api/admin", routerAdmin);
    app.use("/api/brand", routerBrand);
    app.use("/api/subcate", routerSubCate);
};

module.exports = app;