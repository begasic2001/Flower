import { categoriesValidate, cid } from "../config/validatation";
import * as services from "../services/category_service";
import createError from "http-errors";
import joi from "joi";
import db from "../models/index";

const revenue = async (req,res,next)=>{
  try {
    let year = new Date().getFullYear();
    let tongTienKhachHangMua = await db.sequelize.query(
      `EXEC sp_LoyalCustomer`
    );
    let doanhThuTheoNam = await db.sequelize.query(
      `EXEC sp_RevenueYearly :year`,
      {
        replacements: {
          year: year,
        },
      }
    );
    
          let dtName = doanhThuTheoNam[0][0];
          let ttKhachHang = tongTienKhachHangMua[0]; // nhớ duyệt mảng
          let tinhtienSanPham = await db.sequelize.query(`EXEC sp_getRevenue`);
          tinhtienSanPham = tinhtienSanPham[0];
          let minProduct = tinhtienSanPham[0].minProduct;
          let avgProduct = tinhtienSanPham[1].avgProduct;
          let totalOrder = tinhtienSanPham[2].ToTalOrder;
          var totalBillPrice = 0;
          let analyticRevenueByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          const currentYear = new Date().getFullYear();
          for (let i = 3; i < tinhtienSanPham.length; i++) {
            const yearOfBill = new Date(
              tinhtienSanPham[i].date_order
            ).getFullYear();
            const monthOfBill = new Date(
              tinhtienSanPham[i].date_order
            ).getMonth();
            if (yearOfBill === currentYear) {
              analyticRevenueByMonth[monthOfBill] +=
                tinhtienSanPham[i].TongHoaDon;
            }
          }

          // //
          for (let i = 3; i < tinhtienSanPham.length; i++) {
            totalBillPrice += tinhtienSanPham[i].TongHoaDon;
          }
          res.json({
            dtName,
            ttKhachHang,
            minProduct,
            avgProduct,
            totalBillPrice,
            totalOrder,
            result: {
              "Tháng 01": analyticRevenueByMonth[0],
              "Tháng 02": analyticRevenueByMonth[1],
              "Tháng 03": analyticRevenueByMonth[2],
              "Tháng 04": analyticRevenueByMonth[3],
              "Tháng 05": analyticRevenueByMonth[4],
              "Tháng 06": analyticRevenueByMonth[5],
              "Tháng 07": analyticRevenueByMonth[6],
              "Tháng 08": analyticRevenueByMonth[7],
              "Tháng 09": analyticRevenueByMonth[8],
              "Tháng 10": analyticRevenueByMonth[9],
              "Tháng 11": analyticRevenueByMonth[10],
              "Tháng 12": analyticRevenueByMonth[11],
            },
          });
  } catch (error) {
    next(error)
  }
}

const dashboard = async (req, res) => {
  res.render("admin/dashboard");
};
const categoryView = async (req, res, next) => {
  try {
    const category = await services.category();
    res.render("admin/category/category", {
      category,
    });
  } catch (error) {
    next(error);
  }
};
const getCategoryEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await services.categoryById(id);
    res.render("admin/category/edit-category", {
      category,
    });
  } catch (error) {
    next(error);
  }
};

const category = async (req, res, next) => {
  try {
    const category = await services.Category();
    res.json({
      result: category,
    });
  } catch (error) {
    next(error);
  }
};
const categoryById = async (req, res, next) => {
  try {
    // const id = req.params.id;
    // const category = await db.Categories.findOne({ where: { id } });
    // if (!category) {
    //   throw createError.NotFound();
    // }
    // res.json({
    //   status: 1,
    //   result: category,
    // });
  } catch (error) {
    next(error);
  }
};
const storeCategory = async (req, res, next) => {
  try {
    const category = await services.category();
    const { error } = categoriesValidate(req.body);

    if (error) {
      res.render("admin/category/category", {
        error,
        category
      });
    } else {
      const newCategory = await services.createCategory(req.body);
      if (newCategory) res.redirect("/api/cate/category");
    }
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { error } = joi.object({ cid }).validate({ cid: req.body.cid });
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.updateCategory(req.body);
    if (response) res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { error } = joi.object({ cid }).validate(req.query);
    if (error) {
      throw createError(error.details[0].message);
    }
    const response = await services.deleteCategory(req.query.cid);
    if (response) res.redirect("/api/cate/category");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryView,
  category,
  categoryById,
  getCategoryEdit,
  dashboard,
  storeCategory,
  updateCategory,
  deleteCategory,
  revenue,
};
