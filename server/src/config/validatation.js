import Joi from "joi";

const userValidate = (data) => {
  const userSchema = Joi.object({
    id: Joi.string(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .lowercase()
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9@#%&*./]{3,30}$"))
      .required(),
    name: Joi.string(),
    phone: Joi.string(),
    //avatar: Joi.string(),
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

const couponValidate = (data) => {
  const couponSchema = Joi.object({
    coupon: Joi.string().required(),
    discount: Joi.string().required(),
  });
  return couponSchema.validate(data);
};

const brandValidate = (data) => {
  const brandSchema = Joi.object({
    brand_name: Joi.string().required(),
    brand_logo: Joi.string().required(),
  });
  return brandSchema.validate(data);
};

const productValidate = (data) => {
  const productSchema = Joi.object({
    categories_id: Joi.string().required(),
    subcat_id: Joi.string().required(),
    brand_id: Joi.string().required(),
    pro_name: Joi.string().required(),
    pro_code: Joi.string().required(),
    pro_quantity: Joi.string().required(),
    pro_details: Joi.string(),
    pro_color: Joi.string().required(),
    pro_size: Joi.string().required(),
    selling_price: Joi.string().required(),
    discount_price: Joi.string(),
    // video_link: Joi.string(),
    best_rated: Joi.string(),
    best_rated: Joi.string(),
    main_slider: Joi.string(),
    hot_new: Joi.string(),
    buyone_getone: Joi.string(),
    trend: Joi.string(),
    filename_one: Joi.string(),
    filename_two: Joi.string(),
    filename_three: Joi.string(),
  });
  return productSchema.validate(data);
};

const postCategoriesValidate = (data) => {
  const postCategoriesSchema = Joi.object({
    cat_name_en: Joi.string().required(),
    cat_name_vn: Joi.string().required(),
  });
  return postCategoriesSchema.validate(data);
};

const postBlogValidate = (data) => {
  const postBlogSchema = Joi.object({
    categories_id: Joi.string().required(),
    post_en: Joi.string(),
    post_vn: Joi.string(),
    post_image: Joi.string(),
    details_en: Joi.string(),
    details_vn: Joi.string(),
  });
  return postBlogSchema.validate(data);
};

const filename = Joi.string().required();
const bid = Joi.string().required();
const cid = Joi.string().required();
const subid = Joi.string().required();
const pid = Joi.string().required();
const cpid = Joi.string().required();
const uid = Joi.string().required();
const newid = Joi.string().required();
const pcid = Joi.string().required();
const lpid = Joi.string().required();

module.exports = {
  userValidate,
  categoriesValidate,
  subcategoriesValidate,
  brandValidate,
  productValidate,
  couponValidate,
  postCategoriesValidate,
  postBlogValidate,
  bid,
  cid,
  subid,
  filename,
  pid,
  cpid,
  uid,
  newid,
  pcid,
  lpid,
};
