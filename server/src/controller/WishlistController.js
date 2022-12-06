import * as services from "../services/wishlist_service";
const getWishList = async (req, res, next) => {
  try {
    const userId = req.payLoad.userId;
    const wishlist = await services.getWishlist(userId);
    res.json(wishlist);
    // return array
  } catch (error) {
    next(error);
  }
};

const addToWishList = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.payLoad.userId;
    const check = await services.Check(userId,productId);
    if (check.length !== 0) {
      
      for (let i = 0; i < check.length; i++) {
        if (check[i].product_id === productId) {
          return res.json({
            status: 0,
            msg: "Đã tồn tại trong danh sách",
          });
        } else {
          await services.addToWishlist(userId, productId).then(() => {
            return res.json({
              status: 1,
              msg: "Thêm thành công vào danh sách",
            });
          });
        }
      }
    } else {
      await services.addToWishlist(userId, productId).then(() => {
        return res.json({
          status: 1,
          msg: "Thêm thành công vào danh sách",
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

const removeElementWishList = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.payLoad.userId;
    const Wishlist = await services.removeElementWishlist(userId, productId);
    res.json(Wishlist);
  } catch (error) {
    next(error);
  }
};

const deleteWishList = async (req, res, next) => {
  try {
    const userId = req.payLoad.userId;
    const Wishlist = await services.destroyWishlist(userId);
    res.json(Wishlist);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getWishList,
  addToWishList,
  removeElementWishList,
  deleteWishList,
};
