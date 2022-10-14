const  cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "jpeg", "png"],
  params: {
    folder: "tmdt",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
