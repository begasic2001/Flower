import express from "express";
import CartController from "../controller/CartController";
import { verifyAccessToken } from "../services/jwt_service";
const route = express.Router();
/**
 * @swagger
 *  components:
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
 *             id: 1
 *             pro_name: Hoa Bầu Trời
 *             amount: 4
 *             selling_price : 200000
 *             total : 800000
 */

/**
 * @swagger
 *  components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *   security:
 *        - bearerAuth: []
 */

/**
 *  @swagger
 * /api/cart/getCart:
 *
 *   get:
 *     summary: Retrieve a list of json cart
 *     description: Returns all cart from the system that the user has access to
 *     security:
 *        - bearerAuth: []
 *     responses:
 *        '200':
 *          description: A list of carts.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Cart'
 *
 *
 *
 *
 */
route.get("/getCart", verifyAccessToken, CartController.getCart);
route.post(
  "/addToCart/:productId",
  verifyAccessToken,
  CartController.addToCart
);
route.delete(
  "/removeCart/:productId",
  verifyAccessToken,
  CartController.removeElementCart
);
route.put(
  "/updateCart/:productId",
  verifyAccessToken,
  CartController.updateCart
);
route.delete("/deleteCart", verifyAccessToken, CartController.deleteCart);
module.exports = route;
