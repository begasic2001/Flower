import coupon_service from '../services/coupon_service';
import createError from 'http-errors'


const CouponView = async (req, res, next) => {
    try {
        const coupon = await coupon_service.coupon();
        res.render('admin/coupon/coupon',{
            coupon,
        });
    } catch (error) {
        next(error);
    }
};
const coupon = async (req, res, next) => {
    try {
        const coupon = await coupon_service.coupon();
        res.json({
          result: coupon,
        });
      } catch (error) {
        next(error);
      }
};
const getCouponEdit = async (req, res, next) => {};
const couponById = async (req, res, next) => {};
const storeCoupon = async(req, res, next) => {
    try {
        const newCoupon = await coupon_service.createCoupon(req.body);
        if(newCoupon) res.redirect("coupon")
    } catch (error) {
        next(error);
    }
};
const updateCoupon = async(req, res, next) => {};
const deleteCoupon = async (req, res, next) => {
    try {
        const response = await coupon_service.deleteCoupon(req.query.cpid);
        if(response) res.redirect("/api/coup/coupon");
    } catch (error) {
        next(error);
    }
};
module.exports = {
    coupon,
    CouponView,
    getCouponEdit,
    couponById,
    storeCoupon,
    updateCoupon,
    deleteCoupon
}