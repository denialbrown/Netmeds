const express = require('express');
const router = express.Router();
const categoryController = require("../../controller/admin/categoryController");
const middleware = require("../../helper/middleware")
let { Message } = require("../../helper/localization");
const { body, param } = require("express-validator");

router.post("/add/category", [middleware.authenticateUser],
    body("categoryName").exists().withMessage(Message.CATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    categoryController.addCategory);

router.get("/list/category", [middleware.authenticateUser],categoryController.listCategory);

router.get("/get/category/:categoryId", [middleware.authenticateUser],
    param("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    categoryController.getCategory);

router.post("/update/category/:categoryId", [middleware.authenticateUser],
    param("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("categoryName").exists().withMessage(Message.CATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    categoryController.updateCategory);

router.delete("/delete/category/:categoryId", [middleware.authenticateUser],
    param("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    categoryController.deleteCategory);

module.exports = router