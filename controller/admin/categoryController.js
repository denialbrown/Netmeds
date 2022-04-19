const categorySchema = require("../../models/category");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for add category
      @body {} req.body.categoryName
      @body {} res
     * @returns
     */
    addCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = new categorySchema;
            category.categoryName = req.body.categoryName
            category.userId = req.authUser._id
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_ADDED, {
                categoryName: category.categoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list category
      @params {} req.params.categoryId
      @body {} res
     * @returns
     */
    getCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_LIST, {
                categoryName: category.categoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update category
      @params {} req.params.categoryId
      @body {} req.body.categoryName
      @body {} res
     * @returns
     */
    updateCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            category.categoryName = req.body.categoryName
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_UPDATED, {
                categoryName: category.categoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete category
      @params {} req.params.categoryId
      @body {} res
     * @returns
     */
    deleteCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            category.isDeleted = true
            await category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_DELETED, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}