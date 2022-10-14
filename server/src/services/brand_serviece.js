import { categoriesValidate } from "../config/validatation";
import createError from "http-errors";
import db from "../models/index";
import {v4 as genarateId } from "uuid"
const brand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.Brand.findAll({});
      resolve(brand);
    } catch (error) {
      reject(error);
    }
  });
};

const createBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
        const response = await db.Brand.findOrCreate({
            where:{
                brand_name : data.brand_name
            },
            defaults:{
                ...data,
                id:genarateId()
            }
        })
        resolve({
            err: response[1] ? 0 : 1,
            msg: response[1] ? 'Created' : 'Book has been created'
        })
    } catch (error) {
      reject(error);
    }
  });
};

const updateBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  brand,
  createBrand,
  updateBrand,
  deleteBrand,
};
