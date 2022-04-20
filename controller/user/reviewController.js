const Service = require("../../helper/index");
const reviewSchema = require("../../models/review")
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for add product review
     * @body {} req.body.productId
     * @body {} req.body.star
     * @body {} req.body.name
     * @body {} req.body.details
     * @body {} req.body.title
     * @body {} res
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
            var save = await newReview.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.REVIEW_ADD_SUCCESS, {
                id: newReview._id
            });
        } catch (error) {
            console.log('addreview', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
    * This function is use for list product review
    * @body {} res
    * @returns
    */
    listReview: async function (req, res) {
        try {
            var review = await reviewSchema.find({ isDeleted: false }, { id: 1, star: 1, name: 1, title: 1, details: 1 })
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.subCATEGORY_LIST, review);
        } catch (error) {
            console.log('listReview', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
    * This function is use for list product review
    * @params {} req.params.productId
    * @body {} res
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
            console.log('getReview', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete product review
     * @params {} req.params.reviewId
     * @body {} res
     * @returns
     */
    deleteReview: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var review = await reviewSchema.findByIdAndDelete({ _id: req.params.reviewId })
            if (!review) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.REVIEW_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.REVIEW_DELETE_SUCCESS, null);
        } catch (error) {
            console.log('deleteReview', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}