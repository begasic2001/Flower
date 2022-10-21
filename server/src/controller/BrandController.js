import * as services from "../services/brand_service";
import { brandValidate, bid, filename } from "../config/validatation";
import createError from "http-errors";
import joi from "joi";

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
const getBrandEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await services.brandById(id);
    res.render("admin/brand/edit-brand", {
      brand,
    });
  } catch (error) {
    next(error);
  }
};

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
    if (newBrand) res.redirect("/api/brand/brand");
    // res.json(newBrand);
  } catch (error) {
    next(error);
  }
};
const updateBrand = async (req, res, next) => {
  try {
    const fileData = req.file;
    const { error } = joi.object({ bid }).validate({ bid: req.body.bid });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      throw createError(error.details[0].message);
    }
    const response = await services.updateBrand(req.body, fileData);
    if (response) res.redirect("/api/brand/brand");
    //res.json(response);
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    
    const { error } = joi.object({ bid, filename }).validate(req.query);
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.deleteBrand(req.query.bid,req.query.filename);
    
    if (response) res.redirect("/api/brand/brand");
    // return res.json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  brandView,
  storeBrand,
  brand,
  getBrandEdit,
  updateBrand,
  deleteBrand,
  // brandById,
};
