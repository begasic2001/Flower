import * as services from "../services/brand_serviece";
import { brandValidate } from "../config/validatation";
import createError from "http-errors";
const brandView = async (req, res, next) => {
  try {
    const brand = await services.brand();
    res.render("admin/brand/brand", {
      brand,
    });
  } catch (error) {
    next(error);
  }
};
// const getBrandEdit = async (req, res) => {};

const brand = async (req, res, next) => {
  const brand = await services.brand();
  res.json({
    brand,
  });
};
// const brandById = async (req, res, next) => {};
const storeBrand = async (req, res, next) => {
  try {
    const newBrand = await services.createBrand(req.body);
    res.json(newBrand);
    
  } catch (error) {
    next(error)
  }
  // const { error } = await brandValidate(req.body);
  // if(error){
  //   throw createError(error.details[0].message);
  // }
};
// const updateBrand = async (req, res, next) => {};

// const deleteBrand = async (req, res, next) => {};
module.exports = {
  brandView,
  storeBrand,
  brand,
  // getBrandEdit,
  // updateBrand,
  // deleteBrand,
  // brandById,
};
