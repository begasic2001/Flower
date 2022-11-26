import * as services from "../services/product_service";
import * as services1 from "../services/category_service";
import * as services2 from "../services/subcate_service";
const clientView = async (req, res, next) => {
  try {
    const getByStatus = await services.getAny({
      status: 1,
      order: ["id", "DESC"],
      limit: 12,
    });
    const getByTrend = await services.getAny({
      status: 1,
      trend: 1,
      order: ["id", "DESC"],
      limit: 8,
    });
    const getByBestRated = await services.getAny({
      status: 1,
      best_rated: 1,
      order: ["id", "DESC"],
      limit: 8,
    });
    const getByHot = await services.getAny({
      status: 1,
      hot_new: 1,
      order: ["id", "DESC"],
      limit: 3,
    });
    const getBanner = await services.getAny({
      status: 1,
      hot_new: 1,
      order: ["id", "DESC"],
      limit: 3,
    });
    let productByStatus = getByStatus.productData.rows;
    let productByTrend = getByTrend.productData.rows;
    let productByBestRated = getByBestRated.productData.rows;
    let productByHot = getByHot.productData.rows;
    let productByBanner = getBanner.productData.rows;
    const category = await services1.category();
    const subCategory = await services2.subCategory();
    const numberFormat = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    res.render("client/index", {
      category,
      subCategory,
      productByStatus,
      productByTrend,
      productByBestRated,
      productByHot,
      productByBanner,
      numberFormat,
    });
  } catch (error) {
    next(error);
  }
};

const getUserLogin = async (req, res, next) => {
  try {
    res.render("layouts/signin");
  } catch (error) {
    next(error);
  }
};

const getUserRegister = async (req, res, next) => {
  try {
    res.render("layouts/signup");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  clientView,
  getUserLogin,
  getUserRegister,
};
