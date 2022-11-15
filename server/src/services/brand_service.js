import db from "../models/index";
import { v4 as genarateId } from "uuid";
const cloudinary = require("cloudinary").v2;

const brand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.sequelize.query(`EXEC sp_listBrand`);
      resolve(brand[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const brandById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.sequelize.query(`EXEC sp_listBrandById :id`, {
        replacements: { id: id },
      });
      resolve(brand[0][0]);
    } catch (error) {
      reject(error);
    }
  });
};

const createBrand = (data, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(
        `EXEC sp_AddBrand :id , :name , :logo , :file`,
        {
          replacements: {
            id: genarateId(),
            name: data.brand_name,
            logo: fileData?.path,
            file: fileData?.filename,
          },
        }
      );
      resolve({
        status: response[1] ? 0 : 1,
        msg: response[1] ? "Created" : "Brand has been created",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};

const updateBrand = ({ bid, ...data }, fileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (fileData) {
        cloudinary.uploader.destroy(data.filename);
        data.brand_logo = fileData?.path;
        data.filename = fileData?.filename;
        console.log(data)
        const response = await db.sequelize.query(
           `EXEC sp_EditBrand :id , :name , :logo , :file`,
           {
             replacements: {
               id: bid,
               name: data.brand_name,
               logo: data.brand_logo,
               file: data.filename,
             },
           }
         );
         resolve({
           err: response[0] > 0 ? 0 : 1,
           mes:
             response[0] > 0
               ? `${response[0]} brand updated`
               : "Cannot update new brand/ brand ID not found",
         });
      } else {
        const response = await db.sequelize.query(
          `EXEC sp_EditBrandNoImage :id , :name`,
          {
            replacements: {
              id: bid,
              name: data.brand_name,
            },
          }
        );
        resolve({
          err: response[0] > 0 ? 0 : 1,
          mes:
            response[0] > 0
              ? `${response[0]} brand updated`
              : "Cannot update new brand/ brand ID not found",
        });
      }

      if (fileData && response[0] === 0)
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
};

const deleteBrand = (bid, filename) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.sequelize.query(`EXEC sp_DelBrand :id`, {
        replacements: { id: bid },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} deleted`,
      });
      cloudinary.uploader.destroy(filename);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  brand,
  brandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
