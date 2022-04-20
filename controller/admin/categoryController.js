const categorySchema = require("../../models/category");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for add category
     * @body {} req.body.categoryName
     * @body {} res
     * @returns
     */
    addCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await categorySchema.findOne({ categoryName: req.body.categoryName, isDeleted: false })
            if (category) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.CATEGORY_ALREDY_ADDED, null)
            }
            var newcategory = new categorySchema;
            newcategory.categoryName = req.body.categoryName
            newcategory.userId = req.authUser._id
            var save = newcategory.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_ADDED, {
                id: newcategory._id
            });
        } catch (error) {
            console.log('addCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list all category
     * @body {} res
     * @returns
     */
    listCategory: async function (req, res) {
        try {
            var category = await categorySchema.find({ isDeleted: false }, { id: 1, categoryName: 1 })
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_LIST, category);
        } catch (error) {
            console.log('listCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list category by id 
     * @params {} req.params.categoryId
     * @body {} res
     * @returns
     */
    getCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_LIST, {
                categoryName: category.categoryName
            });
        } catch (error) {
            console.log('getCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update category
     * @params {} req.params.categoryId
     * @body {} req.body.categoryName
     * @body {} res
     * @returns
     */
    updateCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            var categoryName = await categorySchema.findOne({ categoryName: req.body.categoryName, isDeleted: false })
            if (categoryName) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_SAVE_ALLREADY, null);
            }
            category.categoryName = req.body.categoryName
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_UPDATED, {
                id: category._id
            });
        } catch (error) {
            console.log('updateCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete category
     * @params {} req.params.categoryId
     * @body {} res
     * @returns
     */
    deleteCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            category.isDeleted = true
            await category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_DELETED, null);
        } catch (error) {
            console.log('deleteCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}