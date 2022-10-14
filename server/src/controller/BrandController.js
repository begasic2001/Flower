import * as services from "../services/brand_service";
import { brandValidate } from "../config/validatation";
import createError from "http-errors";
const cloudinary = require("cloudinary").v2;
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
  try {
    const brand = await services.brand();
    res.json({
      brand,
    });
  } catch (error) {
    next(error);
  }
};
// const brandById = async (req, res, next) => {};
const storeBrand = async (req, res, next) => {
  try {
    const fileData = req.file;

    const { error } = await brandValidate({
      ...req.body,
      brand_logo: fileData?.path,
    });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      throw createError(error.details[0].message);
    }
    const newBrand = await services.createBrand(req.body, fileData);
    res.json(newBrand);
  } catch (error) {
    next(error);
  }
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
