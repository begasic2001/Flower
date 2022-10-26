import Joi from "joi";

const userValidate = (data) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .lowercase()
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    name: Joi.string(),
    phone: Joi.string(),
  });

  return userSchema.validate(data);
};
const categoriesValidate = (data) => {
  const categorySchema = Joi.object({
    cat_name: Joi.string().required(),
  });
  return categorySchema.validate(data);
};

const subcategoriesValidate = (data) => {
  const subCategorySchema = Joi.object({
    categories_id: Joi.string().required(),
    subcategory_name: Joi.string().required(),
  });
  return subCategorySchema.validate(data);
};

const brandValidate = (data) => {
  const brandSchema = Joi.object({
    brand_name: Joi.string().required(),
    brand_logo: Joi.string().required(),
  });
  return brandSchema.validate(data);
};

const filename = Joi.string().required();
const bid = Joi.string().required();
const cid = Joi.string().required();
const subid = Joi.string().required();
module.exports = {
  userValidate,
  categoriesValidate,
  subcategoriesValidate,
  brandValidate,
  bid,
  cid,
  subid,
  filename,
};
