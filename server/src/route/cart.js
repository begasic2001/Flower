import express from "express";
import CartController from "../controller/CartController";
import { verifyAccessToken } from "../services/jwt_service";
const route = express.Router();
/**
 * @swagger
 *  components:
 *
 *    schemas:
 *      Cart:
 *        type: object
 *        required:
 *          _id
 *          -pro_name
 *          -amount
 *          -selling_price
 *          -total
 *        properties:
 *          id:
 *            type: string
 *            description: The auto generated id of the cart in nodejs
 *          pro_name:
 *            type: string
 *            description: The name in product
 *          amount:
 *            type: integer
 *            description: The amount of product when user click add to cart
 *          selling_price:
 *            type: string
 *            description: The price for product
 *          total:
 *            type: integer
 *            description: The total of the product of the user
 *        example:
 *             id: luonggegsvksaagi
 *             pro_name: Hoa Bầu Trời
 *             amount: 4
 *             selling_price : 200000
 *             total : 800000
 */

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: The cart managing API
 */

/**
 *  @swagger
 * /api/cart/getCart/{userId}:
 *
 *   get:
 *     summary: Retrieve a list of json cart
 *     tags: [Carts]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The token that the user has logged in (accessToken)
 *     responses:
 *        200:
 *          description: A list of carts.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Cart'
 *        401:
 *           description: Unauthorized
 *        500:
 *           description: InternalServer
 *
 *
 *
 *
 */
route.get("/getCart", verifyAccessToken, CartController.getCart);
/**
 * @swagger
 * /api/cart/addToCart/{productId}:
 *   post:
 *     summary: User want to add the cart by click
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The token that the user has logged in (accessToken)
 *     responses:
 *       200:
 *         description: Add successfully
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */
route.post(
  "/addToCart/:productId",
  verifyAccessToken,
  CartController.addToCart
);
/**
 * @swagger
 * /api/cart/removeCart/{productId}:
 *   delete:
 *     summary: Remove the cart by productId
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The cart productId
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The token that the user has logged in (accessToken)
 *     responses:
 *       200:
 *         description: 1 deleted
 *       404:
 *         description: 0 deleted
 */
route.delete(
  "/removeCart/:productId",
  verifyAccessToken,
  CartController.removeElementCart
);
/**
 * @swagger
 * /api/cart/updateCart/{productId}:
 *  put:
 *    summary: Update the cart by the productId
 *    tags: [Carts]
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *        required: true
 *        description: The token that the user has logged in (accessToken)
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *        required: true
 *        description: ProductId
 *      - in: formData
 *        name: amount
 *        schema:
 *          type: string
 *        description: Amount
 *    responses:
 *      200:
 *        description: The cart was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cart'
 *      404:
 *        description: Cannot update new cart/ cart ID not found
 *      500:
 *        description: Some error happened
 */
route.put(
  "/updateCart/:productId",
  verifyAccessToken,
  CartController.updateCart
);
/**
 * @swagger
 * /api/cart/deleteCart:
 *   delete:
 *     summary: Remove all product in the cart
 *     tags: [Carts]
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *        required: true
 *        description: The token that the user has logged in (accessToken)
 *
 *     responses:
 *       200:
 *         description: 1 deleted
 *
 *       404:
 *         description: 0 deleted
 */
route.delete("/deleteCart", verifyAccessToken, CartController.deleteCart);
module.exports = route;
