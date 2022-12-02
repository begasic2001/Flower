import express from "express";
import UserController from "../controller/UserController";
import { verifyAccessToken } from "../services/jwt_service";

const route = express.Router();
//
route.get("/getlist", verifyAccessToken, UserController.getList);
route.get("/user", UserController.getAllUser);
/**
 *  @swagger
 * /api/auth/login/:
 *
 *   post:
 *     summary: User logins personal account
 *     tags: [UserBearer]
 *     parameters:
 *      - in: formData
 *        name: email
 *        schema:
 *          type: string
 *        description: email
 *      - in: formData
 *        name: password
 *        schema:
 *          type: string
 *        description: password
 *     responses:
 *        200:
 *          description: Login successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                   type: object
 *                   properties:
 *                      status:
 *                         type: string
 *                         description: The status "success".
 *                      user:
 *                         type: object
 *                         properties:
 *                            id:
 *                              type: string
 *                              description: The user ID.
 *                            email:
 *                              type: string
 *                              description: The email.
 *                            password:
 *                              type: string
 *                              description: The password.
 *                            name:
 *                              type: string
 *                              description: The name.
 *                            phone:
 *                              type: string
 *                              description: The phone.
 *                      accessToken:
 *                          type: string
 *                          description: The accessToken.
 *                      refreshToken:
 *                          type: string
 *                          description: The refreshToken.
 */
route.post("/login", UserController.login);
route.put("/update/", UserController.updateUser);
route.get("/getUserEdit/:id", UserController.getUserEdit);
route.delete("/delete/", UserController.deleteUser);
/**
 * @swagger
 *  components:
 *
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          _id
 *          -email
 *          -password
 *          -name
 *          -phone
 *          -avatar
 *        properties:
 *          id:
 *            type: string
 *            description: The auto generated id of the user in nodejs
 *          email:
 *            type: string
 *            description: User email entered from registration form
 *          password:
 *            type: string
 *            description: User password entered from registration form
 *          name:
 *            type: string
 *            description: User name entered from registration form
 *          phone:
 *            type: string
 *            description: User phone entered from registration form
 *          avatar:
 *            type: string
 *            description: Optional !!!!!!!
 *        example:
 *             id : 1
 *             email : luongminhthanh91@gmail.com
 *             password : 123456
 *             name : Lương Minh Thành
 *             phone : 0704543052
 *             avatar :
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 */

/**
 *  @swagger
 * /api/auth/register/:
 *
 *   post:
 *     summary: User registers personal account
 *     tags: [User]
 *     parameters:
 *      - in: formData
 *        name: id
 *        schema:
 *          type: string
 *        description: id
 *      - in: formData
 *        name: email
 *        schema:
 *          type: string
 *        description: email
 *      - in: formData
 *        name: password
 *        schema:
 *          type: string
 *        description: password
 *      - in: formData
 *        name: name
 *        schema:
 *          type: string
 *        description: name
 *      - in: formData
 *        name: phone
 *        schema:
 *          type: string
 *        description: phone
 *      - in: formData
 *        name: avatar
 *        schema:
 *          type: string
 *        description: avatar
 *     responses:
 *        200:
 *          description: Register successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *
 *
 *
 *
 */
route.post("/register", UserController.register);
route.post("/refresh-token", UserController.refreshToken);
route.delete("/logout", UserController.logout);
module.exports = route;
