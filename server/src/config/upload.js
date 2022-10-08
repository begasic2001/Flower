import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024 * 5,
  fileFilter,
});

module.exports = Multer;
