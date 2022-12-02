import db from "../models/index";
import paypal from "paypal-rest-sdk";
import fs from "fs";
import { v4 as genarateId } from "uuid";
import { resolve } from "path";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
paypal.configure({
  mode: "sandbox",
  client_id: process.env.CLIENT_ID_PAYPAL,
  client_secret: process.env.CLIENT_SECRECT_PAYPAL,
});

var items = JSON.parse(fs.readFileSync("db.json"));
var total = 0;
for (let i = 0; i < items.Cart.length; i++) {
  total += parseFloat(items.Cart[i].selling_price) * items.Cart[i].amount;
}

const getCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.sequelize.query(`EXEC sp_getCart :CUS `, {
        replacements: {
          CUS: userId,
        },
      });
      resolve(cart[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const addToCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.sequelize.query(
        `EXEC sp_AddToCart :CUS , :ITEM , :AMOUNT`,
        {
          replacements: {
            CUS: userId,
            ITEM: productId,
            AMOUNT: 1,
          },
        },
      );
      resolve(cart[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const removeElementCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_removeElementCart :CUS , :ITEM `,
        {
          replacements: {
            CUS: userId,
            ITEM: productId,
          },
        },
      );
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateCart = (userId, productId, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_updateCart :CUS , :ITEM , :AMOUNT`,
        {
          replacements: {
            CUS: userId,
            ITEM: productId,
            AMOUNT: amount,
          },
        },
      );
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} cart updated`
            : "Cannot update new cart/ cart ID not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const destroyCart = (userId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(`EXEC sp_destroyCart :CUS  `, {
        replacements: {
          CUS: userId,
        },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const paypalApi = () => {
  return new Promise(async (resolve, reject) => {
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
      reject(error);
    }
  });
};

const success = async () => {
  return new Promise(async (resolve, reject) => {
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
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCart,
  addToCart,
  removeElementCart,
  destroyCart,
  updateCart,
  paypalApi,
  success,
};
