import routerUser from "./user.js";
import routerCategory from "./category.js";
import routerBrand from "./brand.js";
import routerSubCate from "./subcategory.js";
import routerProduct from "./product.js";
const app = (app) => {
  app.use("/api/auth", routerUser);
  app.use("/api/cate", routerCategory);
  app.use("/api/brand", routerBrand);
  app.use("/api/subcate", routerSubCate);
  app.use("/api/product", routerProduct);
};

module.exports = app;
