import * as services from "../services/product_service";
import * as services1 from "../services/category_service";
import * as services2 from "../services/subcate_service";
import * as services3 from "../services/cart_service";
import * as services4 from "../services/order_service";
import * as services5 from "../services/brand_service";
import fs from "fs";
import { v4 as genarateId } from "uuid";
import paypal from "paypal-rest-sdk";
import db from "../models/index";
require("dotenv").config();
paypal.configure({
  mode: "sandbox",
  client_id: process.env.CLIENT_ID_PAYPAL,
  client_secret: process.env.CLIENT_SECRECT_PAYPAL,
});
let items;
var total = 0;
const clientView = async (req, res, next) => {
  try {
    const getByStatus = await services.getAny({
      status: 1,
      order: ["id", "DESC"],
      limit: 12,
    });
    // const getByTrend = await services.getAny({
    //   status: 1,
    //   trend: 1,
    //   order: ["id", "DESC"],
    //   limit: 8,
    // });
    // const getByBestRated = await services.getAny({
    //   status: 1,
    //   best_rated: 1,
    //   order: ["id", "DESC"],
    //   limit: 8,
    // });
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
    const getMainSlider = await services.getAny({
      status:1,
      main_slider:1,
      order: ["id", "DESC"],
    })
    let productByStatus = getByStatus.productData.rows;
    // let productByTrend = getByTrend.productData.rows;
    // let productByBestRated = getByBestRated.productData.rows;
    let productByHot = getByHot.productData.rows;
    let productByBanner = getBanner.productData.rows;
    let productSlider = getMainSlider.productData.rows;
    productSlider = productSlider[0]
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
      numberFormat,
      productByHot,
      productByBanner,
      productSlider,
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

const getCart = async (req, res, next) => {
  try {
    const numberFormat = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    const category = await services1.category();
    res.render("client/cart", {
      numberFormat,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getWishList = async (req, res, next) => {
  try {
    const category = await services1.category();
    res.render("client/wishlist", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getShipping = async (req, res, next) => {
  try {
    const category = await services1.category();
    res.render("client/shipping", {
      category,
    });
  } catch (error) {
    next(error);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const getProductBySubCategory = await services.getAny({
      status: 1,
      subcat_id: productId,
    });
    const product = getProductBySubCategory.productData.rows;
    const count = getProductBySubCategory.productData.count;
    const getBrandGroupByBrandId = await db.sequelize.query(
      `EXEC sp_brandBySubcategories :subcat_id  `,
      {
        replacements: {
          subcat_id: productId,
        },
      }
    );

    const brand_id = getBrandGroupByBrandId[0];

    let brand = await db.sequelize.query(`EXEC sp_listBrandById :id  `, {
      replacements: {
        id: brand_id[0].brand_id,
      },
    });
    brand = brand[0];
    const category = await services1.category();
    res.render("client/detailProductCategory", {
      category,
      product,
      brand,
      count,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const getProductByCategory = await services.getAny({
      status: 1,
      categories_id: categoryId,
    });
    const product = getProductByCategory.productData.rows;
    const count = getProductByCategory.productData.count;
    const category = await services1.category();
    const brand = await services5.brand()
    res.render("client/allCategory", {
      category,
      brand,
      product,
      count,
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
    const userId = req.payLoad.userId;
    const ship = req.body.ship;
    const response = await db.sequelize.query(
      `EXEC sp_storeShipping2 :id , :ship_name , :ship_email , :ship_phone , :ship_address , :ship_city`,
      {
        replacements: {
          id: genarateId(),
          ship_name: ship[0].ship_name,
          ship_email: ship[0].ship_email,
          ship_phone: ship[0].ship_phone,
          ship_address: ship[0].ship_address,
          ship_city: ship[0].ship_city,
        },
      }
    );
    const response1 = await db.sequelize.query(`EXEC sp_PURCHASE_CART :CUS`, {
      replacements: { CUS: userId },
    });
    Promise.all([response, response1])
      .then(() => {
        res.json({
          status: 1,
          msg: `Thanh toán thành công`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // items = req.body.items;
    // for (let i = 0; i < items.length; i++) {
    //   total += parseFloat(items[i].price) * items[i].quantity;
    // }
    // const create_payment_json = {
    //   intent: "sale",
    //   payer: {
    //     payment_method: "paypal",
    //   },
    //   redirect_urls: {
    //     return_url: "http://localhost:9000/success",
    //     cancel_url: "http://localhost:9000/cancel",
    //   },
    //   transactions: [
    //     {
    //       item_list: {
    //         items: items,
    //       },
    //       amount: {
    //         currency: "USD",
    //         total: total.toString(),
    //       },
    //       description: "Hat for the best team ever",
    //     },
    //   ],
    // };
    // paypal.payment.create(create_payment_json, function (error, payment) {
    //   if (error) {
    //     res.render("client/cancle");
    //   } else {
    //     for (let i = 0; i < payment.links.length; i++) {
    //       if (payment.links[i].rel === "approval_url") {
    //         // res.redirect(payment.links[i].href);
    //         console.log(payment);
    //         res.json({ forwardLink: payment.links[i].href });
    //       }
    //     }
    //   }
    // });
  } catch (error) {
    next(error);
  }
};

const success = async (req, res, next) => {
  try {
    const authId = req.cookies.authId;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const ship = JSON.parse(req.cookies.ship);
    console.log(`SHIP::::::::::::`, ship[0]);
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
      async function (error, payment) {
        if (error) {
          res.render("client/cancle");
        } else {
          // const response = await db.sequelize
          //   .query(
          //     `EXEC sp_storeShipping :id , :ship_name , :ship_email , :ship_phone , :ship_address , :ship_city `,
          //     {
          //       replacements: {
          //         id: genarateId(),
          //         ship_name: ship[0].ship_name,
          //         ship_email: ship[0].ship_email,
          //         ship_phone: ship[0].ship_phone,
          //         ship_address: ship[0].ship_address,
          //         ship_city: ship[0].ship_city,
          //       },
          //     }
          //   )
          //   .then(async () => {
          //     const response1 = await db.sequelize.query(
          //       `EXEC sp_PURCHASE_CART :CUS`,
          //       {
          //         replacements: { CUS: authId },
          //       }
          //     );
          //     Promise.all([response, response1]).then(() => {
          //       res.clearCookie("ship");
          //       res.clearCookie("authId");
          //       res.render("client/success");
          //     });
          //   });
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

const getOrderForUser = async (req, res, next) => {
  try {
    const userId = req.payLoad.userId;
    const response = await services4.orderUserId(userId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getOrderDetailForUser = async (req, res, next) => {
  try {
    const category = await services1.category();
    const id = req.params.id;
    const orderDetail = await services4.orderDetail(id);
    res.render("client/order", {
      category,
      orderDetail,
    });
  } catch (error) {
    next(error);
  }
};

const search  = async (req, res, next) => {
  try {
    const name = req.query.search
      const getSearch = await services.getAny({
        status:1,
       name:name
      });
      const count = getSearch.productData.count
      const product = getSearch.productData.rows;
     const category = await services1.category();
     const brand = await services5.brand();
      res.render('client/search',{
        count,
        category,
        brand,
        product
      })
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
  getCart,
  getWishList,
  getShipping,
  getProductById,
  getOrderForUser,
  getOrderDetailForUser,
  getAllCategoryById,
  search,
};
