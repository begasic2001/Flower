import express from "express";
import ProductController from "../controller/productController";
const route = express.Router();

// client
/**
 * @swagger
 *  components:
 *
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          _id
 *          -categories_id
 *          -subcat_id
 *          -brand_id
 *          -pro_name
 *          -pro_code
 *          -pro_quantity
 *          -pro_details
 *          -pro_color
 *          -pro_size
 *          -selling_price
 *          -discount_price
 *          -video_link
 *          -main_slider
 *          -hot_new
 *          -buyone_getone
 *          -trend
 *          -img_one
 *          -img_two
 *          -img_three
 *          -status
 *          -createdAt
 *          -updatedAt
 *          -filename_one
 *          -filename_two
 *          -filename_three
 *          -best_rated
 *        properties:
 *          id:
 *            type: string
 *            description: The auto generated id of the cart in nodejs
 *        example:
 *             id :"1"
 *             categories_id :"1"
 *             subcat_id :"1"
 *             brand_id :"1"
 *             pro_name :"Hoa Bầu Trời"
 *             pro_code "123456"
 *             pro_quantity :"20"
 *             pro_details :"ok"
 *             pro_color :"đỏ,xanh"
 *             pro_size  :"s,m"
 *             selling_price:"100000"
 *             discount_price:"0"
 *             video_link:""
 *             main_slider:"0"
 *             hot_new:"0"
 *             buyone_getone:"0"
 *             trend:"0"
 *             img_one:""
 *             img_two:""
 *             img_three:""
 *             status:"1"
 *             createdAt:""
 *             updatedAt:""
 *             filename_one:""
 *             filename_two:""
 *             filename_three:""
 *             best_rated:""
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The product managing API
 */

/**
 *  @swagger
 * /api/v2/getProduct:
 *   get:
 *     summary: Retrieve a list of json product (page, limit, order, name, available, price, ...query)
 *     tags: [Product]
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *        description: page number you want to get
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *        description: number of products you want to get in one page
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: product name search
 *      - in: query
 *        name: order
 *        schema:
 *          type: array
 *          items:
 *               type: string
 *          example: ["selling_price","DESC"]
 *        description: sort by ascending or descending
 *      - in: query
 *        name: available
 *        schema:
 *          type: array
 *          items:
 *               type: string
 *          example: ["1","10"]
 *        description: Check product quantity
 *      - in: query
 *        name: query
 *        schema:
 *          type: array
 *          items:
 *               type: string
 *        description: free parameter to search the remaining fields .You can change "query" to any of the other fields to search for data, unless searching by price uses an array
 *     responses:
 *        200:
 *          description: A list of product.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */
route.get("/getProduct", ProductController.product);
module.exports = route;
