const Service = require("../../helper/index");
const reviewSchema=require("../../models/review")
const send = Service.sendResponse;
const { HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for add product review
      @body {} req.body.productId
      @body {} req.body.star
      @body {} req.body.name
      @body {} req.body.details
      @body {} req.body.title
      @body {} res
     * @returns
     */
    addreview: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var newReview = new reviewSchema;
            newReview.userId = req.authUser._id
            newReview.productId = req.body.productId
            newReview.star = req.body.star
            newReview.name = req.body.name
            newReview.details = req.body.details
            newReview.title = req.body.title
            newReview.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.REVIEW_ADD_SUCCESS, {
                star: newReview.star,
                name: newReview.name,
                title: newReview.title,
                details: newReview.details,
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
     /**
     * This function is use for list product review
      @params {} req.params.productId
      @body {} res
     * @returns
     */
    getReview: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var review = await reviewSchema.find({ productId: req.params.productId, isDeleted: false }, {
                star: 1,
                name: 1,
                title: 1,
                details: 1,
            })
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.REVIEW_LIST_SUCCESS, review);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete product review
      @params {} req.params.reviewId
      @body {} res
     * @returns
     */
    deleteReview: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var review = await reviewSchema.findOne({ _id: req.params.reviewId, isDeleted: false })
            if (!review) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.REVIEW_NOT_FOUND, null);
            }
            review.isDeleted = true
            review.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.REVIEW_DELETE_SUCCESS, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}