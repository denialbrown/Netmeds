const subCategorySchema = require("../../models/subCategory");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for add subCategory
      @body {} req.body.subCategoryName
      @body {} res
     * @returns
     */
    addSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = new subCategorySchema;
            category.subCategoryName = req.body.subCategoryName
            category.userId = req.authUser._id
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_ADDED, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
    * This function is use for list subCategory
     @params {} req.params.subCategoryId
     @body {} res
    * @returns
    */
    getSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_LIST, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update subCategory
      @params {} req.params.subCategoryId
      @body {} req.body.subCategoryName
      @body {} res
     * @returns
     */
    updateSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            category.subCategoryName = req.body.subCategoryName
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_UPDATED, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete subCategory
      @params {} req.params.subCategoryId
      @body {} res
     * @returns
     */
    deleteSubCategory: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            if (!category) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_NOT_FOUND, null);
            }
            category.isDeleted = true;
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_DELETED, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}