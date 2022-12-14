import createError from "http-errors";
import db from "../models/index";
import client from "../config/connect_redis";
import bcrypt from "bcrypt";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../services/jwt_service";
import { userValidate, uid } from "../config/validatation";
import user_service from "../services/user_service";
import { v4 as genarateId } from "uuid";
import joi from "joi";

const getAllUser = async (req, res, next) => {
  try {
    const allUser = await user_service.user();
    res.render("admin/user/user", {
      allUser,
    });
  } catch (error) {
    next(error);
  }
};
const user = async (req, res, next) => {
  try {
    const user = await user_service.user();
    res.json({
      result: user,
    });
  } catch (error) {
    next(error);
  }
};
const getUserEdit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await user_service.userById(id);
    res.render("admin/user/edit-user", {
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidate(req.body);
    if (error) {
      return res.status(500).json(error.details[0].message);
      //throw createError(error.details[0].message);
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not register" });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.json({
      status: "success",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, name, phone, avatar } = req.body;
    const { error } = userValidate(req.body);
    if (error) {
      return res.status(500).json(error.details[0].message);
    }
    const isExistEmail = await db.User.findOne({ where: { email } });
    if (isExistEmail) {
      return res.status(409).json({ message: `${email} is has already` });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await db.sequelize.query(
      `EXEC sp_Register :idUser , :email , :password , :name , :phone , :avatar`,
      {
        replacements: {
          idUser: genarateId(),
          email: email,
          password: hash,
          name: name,
          phone: phone,
          avatar: avatar ? avatar : "",
        },
      }
    );
    res.json({
      status: 1,
      message: "User has been created",
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();

    const { userId } = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    res.json({
      status: "success",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.query;
    if (!refreshToken) throw createError.BadRequest();

    const { userId } = await verifyRefreshToken(refreshToken);
    client.del(userId.toString(), (err, reply) => {
      if (err) {
        throw createError.InternalServerError();
      }
      res.json({
        message: "logout !!!!!!",
      });
    });
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  const listUser = [
    {
      name: "minh thanh 1",
    },
    {
      name: "minh thanh 2",
    },
  ];
  return res.json({
    listUser,
  });
};
const updateUser = async (req, res, next) => {
  try {
    const { error } = joi.object({ uid }).validate({ uid: req.body.uid });
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await user_service.updateUser(req.body);
    if (response) res.redirect("/api/auth/user");
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const response = await user_service.deleteUser(req.query.uid);
    if (response) res.redirect("/api/auth/user");
  } catch (error) {
    next(error);
  }
};

const forgotPass = async (req, res, next) => {
  try {
    const response = await user_service.deleteUser(req.query.uid);
    if (response) res.redirect("/api/auth/user");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUser,
  user,
  login,
  refreshToken,
  register,
  logout,
  getList,
  getUserEdit,
  updateUser,
  deleteUser,
  forgotPass,
};
