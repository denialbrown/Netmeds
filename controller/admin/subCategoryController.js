const subCategorySchema = require("../../models/subCategory");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for add subCategory
     * @body {} req.body.subCategoryName
     * @body {} res
     * @returns
     */
    addSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var subCategory = await subCategorySchema.findOne({ categoryName: req.body.categoryName, isDeleted: false })
            if (subCategory) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.CATEGORY_ALREDY_ADDED, null)
            }
            var newsubCategory = new subCategorySchema;
            newsubCategory.subCategoryName = req.body.subCategoryName
            newsubCategory.userId = req.authUser._id
            var save = await newsubCategory.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_ADDED, {
                id: newsubCategory._id
            });
        } catch (error) {
            console.log('addSubCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list all subCategory
     * @body {} res
     * @returns
     */
    listsubCategory: async function (req, res) {
        try {
            var subCategory = await subCategorySchema.find({ isDeleted: false }, { id: 1, subCategoryName: 1 })
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.SUBCATEGORY_LIST, subCategory);
        } catch (error) {
            console.log('listsubCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
    * This function is use for list subCategory
    * @params {} req.params.subCategoryId
    * @body {} res
    * @returns
    */
    getSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.SUBCATEGORY_LIST, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('getSubCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update subCategory
     * @params {} req.params.subCategoryId
     * @body {} req.body.subCategoryName
     * @body {} res
     * @returns
     */
    updateSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checksuCategory = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            if (!checksuCategory) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            var subCategory = await subCategorySchema.findOne({ categoryName: req.body.categoryName, isDeleted: false })
            if (subCategory) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.CATEGORY_ALREDY_SAVED, null)
            }
            subCategory.subCategoryName = req.body.subCategoryName
            var save= await subCategory.save()
            if (!save) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_SAVE, null)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_UPDATED, {
                id: subCategory._id
            });
        } catch (error) {
            console.log('updateSubCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete subCategory
     * @params {} req.params.subCategoryId
     * @body {} res
     * @returns
     */
    deleteSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            category.isDeleted = true;
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_DELETED, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('deleteSubCategory', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}