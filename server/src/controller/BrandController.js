import * as services from "../services/brand_serviece";
import db from "../models/index";
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
const storeBrand = async (req, res, next) => {};
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
