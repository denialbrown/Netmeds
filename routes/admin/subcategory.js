const express = require('express');
const router = express.Router();
const subCategoryController = require("../../controller/admin/subCategoryController");
const middleware = require("../../helper/middleware")
let { Message } = require("../../helper/localization");
const { body, param } = require("express-validator");

router.post("/add/sub-category", [middleware.authenticateUser],
    body("subCategoryName").exists().withMessage(Message.SUBCATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    subCategoryController.addSubCategory);

router.get("/get/sub-category/:subCategoryId", [middleware.authenticateUser],
    param("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    subCategoryController.getSubCategory);

router.post("/update/sub-category/:subCategoryId", [middleware.authenticateUser],
    param("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("subCategoryName").exists().withMessage(Message.SUBCATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    subCategoryController.updateSubCategory);

router.delete("/delete/sub-category/:subCategoryId", [middleware.authenticateUser],
    param("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    subCategoryController.deleteSubCategory);
    
module.exports = router