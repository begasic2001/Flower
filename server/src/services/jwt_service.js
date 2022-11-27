import jwt from "jsonwebtoken";
import createError from "http-errors";
import client from "../config/connect_redis";
require("dotenv").config();
const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payLoad = {
      userId,
    };
    const secretKey = process.env.ACCESS_TOKEN;
    const options = {
      expiresIn: "30s",
    };
    jwt.sign(payLoad, secretKey, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return next(createError.Unauthorized());
    }

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
      if (err) {
        if (err.name == "JsonWebTokenError") {
          return next(createError.Unauthorized());
        }
        return next(createError.Unauthorized(err.message));
      }
      req.payLoad = payload;
      next();
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(200).json({
        code: 401,
        msg: error.message,
      });
    }
    return res.status(200).json({
      code: 500,
      msg: error,
    });
  }
};

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payLoad = {
      userId,
    };
    const secretKey = process.env.REFRESH_TOKEN;
    const options = {
      expiresIn: "2h",
    };
    jwt.sign(payLoad, secretKey, options, (err, token) => {
      if (err) reject(err);
      client.set(userId.toString(), token, "EX", 2 * 60 * 60, (err, reply) => {
        if (err) {
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  });
};

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
      if (err) {
        return reject(err);
      }
      client.get(payload.userId, (err, reply) => {
        if (err) {
          return reject(createError.InternalServerError());
        }
        if (refreshToken == reply) {
          return resolve(payload);
        }
        return reject(createError.Unauthorized());
      });
    });
  });
};
module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
