import routerUser from "./user.js";
import routerCategory from "./category.js";
import routerBrand from "./brand.js";
import routerSubCate from "./subcategory.js";
import routerProduct from "./product.js";
import routerOrder from "./order.js";
import routerCoupon from "./coupon.js";
import routerBlog from "./blog.js";
import routerClient from "./client.js"
const app = (app) => {
  app.use("/api/auth", routerUser);
  app.use("/api/cate", routerCategory);
  app.use("/api/brand", routerBrand);
  app.use("/api/subcate", routerSubCate);
  app.use("/api/product", routerProduct);
  app.use("/api/order", routerOrder);
  app.use("/api/coup", routerCoupon);
  app.use("/api/blog", routerBlog);
  app.use("/", routerClient);
  
};

module.exports = app;
