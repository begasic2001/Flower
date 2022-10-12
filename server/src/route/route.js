import routerUser from "./user.js";
import routerCategory from "./category.js";
import routerAdmin from "./admin.js";
import routerBrand from "./brand.js";
import routerSubCate from "./subcategory.js"
const app = (app) => {
    app.use("/api/auth", routerUser);
    app.use("/api/cate", routerCategory);
    app.use("/api/brand", routerBrand);
    app.use("/api/subcate", routerSubCate);
    app.use("/api/admin", routerAdmin);
};

module.exports = app;