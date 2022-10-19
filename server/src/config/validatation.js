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
    categories_id: Joi.number().integer().required(),
    subcategory_name: Joi.string.required(),
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

export const filename = Joi.string().required()
export const id = Joi.string().required()
module.exports = {
  userValidate,
  categoriesValidate,
  subcategoriesValidate,
  brandValidate,
};
