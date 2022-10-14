import createError from "http-errors";
import db from "../models/index";
import client from "../config/connect_redis";
import {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
} from "../services/jwt_service";
import { userValidate } from "../config/validatation";
const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = userValidate(req.body);
        if (error) {
            throw createError(error.details[0].message);
        }

        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            throw createError.NotFound("User not register");
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            throw createError.Unauthorized();
        }

        const accessToken = await signAccessToken(user.id);
        const refeshToken = await signRefreshToken(user.id);
        res.json({
            accessToken,
            refeshToken,
        });
    } catch (error) {
        next(error);
    }
};

const register = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = userValidate(req.body);

        if (error) {
            throw createError(error.details[0].message);
        }
        const isExistEmail = await db.User.findOne({ where: { email: email } });
        if (isExistEmail) {
            throw createError.Conflict(`${email} is has already`);
        }

        const savedUser = await db.User.create({
            email: email,
            password: password,
        });
        return res.json({
            status: 1,
            element: savedUser,
        });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async(req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();

        const { userId } = await verifyRefreshToken(refreshToken);
        const accessToken = await signAccessToken(userId);
        const newRefreshToken = await signRefreshToken(userId);
        res.json({
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        next(error);
    }
};

const logout = async(req, res, next) => {
    try {
        const { refreshToken } = req.body;
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

const getList = async(req, res, next) => {
    const listUser = [{
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
const updateUser = async(req, res, next) => {
    try {
        const id = req.params.id;
        const { email, password } = req.body;
        const { error } = userValidate(req.body);

        if (error) {
            throw createError(error.details[0].message);
        }
        const isExistEmail = await db.User.findOne({ where: { email: email } });
        if (isExistEmail) {
            throw createError.Conflict(`${email} is has already`);
        }

        const savedUpdateUser = await db.User.update({
            email: email,
            password: password,
        }, {
            where: { id },
        });
        return res.json({
            status: 1,
            element: savedUpdateUser,
        });

    } catch (error) {
        next(error);
    }
}
const deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id;
        await db.User.destroy({
            where: { id },
        });
        return res.json({
            status: 1,
            message: "Delete Success",
        });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    login,
    refreshToken,
    register,
    logout,
    getList,
    updateUser,
    deleteUser
};