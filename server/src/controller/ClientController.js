import * as services from "../services/product_service";
import * as services1 from "../services/category_service";
import * as services2 from "../services/subcate_service";
import * as services3 from "../services/cart_service";
import fs from "fs";
import paypal from "paypal-rest-sdk";
require("dotenv").config();
paypal.configure({
  mode: "sandbox",
  client_id: process.env.CLIENT_ID_PAYPAL,
  client_secret: process.env.CLIENT_SECRECT_PAYPAL,
});

var items = JSON.parse(fs.readFileSync("db.json"));
items = items.Item;
var total = 0;
for (let i = 0; i < items.length; i++) {
  total += parseFloat(items[i].price) * items[i].quantity;
}
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
const getProfile = async (req, res, next) => {
  try {
    const category = await services1.category();
    res.render("client/profile", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getChangePass = async (req, res, next) => {
  try {
    const category = await services1.category();
    res.render("client/changepass", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getDetail = async (req, res, next) => {
  try {
     const numberFormat = new Intl.NumberFormat("vi-VN", {
       style: "currency",
       currency: "VND",
     });
    const productId = req.params.productId;
    const category = await services1.category();
    let getDetailProduct = await services.getAny({
      id: productId,
    });
    let color = getDetailProduct.productData.rows[0].pro_color;
    let size = getDetailProduct.productData.rows[0].pro_size;
    getDetailProduct = getDetailProduct.productData.rows[0];
    let product_color = color.split(",");
    let product_size = size.split(",");
    res.render("client/detail", {
      category,
      getDetailProduct,
      product_color,
      product_size,
      numberFormat,
    });
  } catch (error) {
    next(error);
  }
};
const getPayment = async (req, res, next) => {
  try {
    res.render("client/payment");
  } catch (error) {
    next(error);
  }
};

const cancle = async (req, res, next) => {
  try {
    res.render("client/cancle");
  } catch (error) {
    next(error);
  }
};

const postPayment = async (req, res, next) => {
  try {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:9000/success",
        cancel_url: "http://localhost:9000/cancel",
      },
      transactions: [
        {
          item_list: {
            items: items,
          },
          amount: {
            currency: "USD",
            total: total.toString(),
          },
          description: "Hat for the best team ever",
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        res.render("client/cancle");
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const success = async (req, res, next) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: total.toString(),
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          res.render("client/cancle");
        } else {
          console.log(JSON.stringify(payment));
          res.render("client/success");
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const cancel = async (req, res, next) => {
  try {
    res.send("Cancelled");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  clientView,
  getUserLogin,
  getUserRegister,
  getProfile,
  getChangePass,
  getPayment,
  postPayment,
  cancle,
  success,
  cancel,
  getDetail,
};
