const express = require('express');
const router = express.Router();
const productController = require("../../controller/admin/productController");
const middleware = require("../../helper/middleware")
let { Message } = require("../../helper/localization");
const { body, param } = require("express-validator");


router.post("/add/product", [middleware.authenticateUser],
    body("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("productName").exists().withMessage(Message.PRODUCT_NAME_IS_REQUIRED).not().isEmpty(),
    body("details").exists().withMessage(Message.DETAILS_IS_REQUIRED).not().isEmpty(),
    body("price").exists().withMessage(Message.PRICE_IS_REQUIRED).not().isEmpty(),
    body("manufacture").exists().withMessage(Message.MANUFACTURE_IS_REQUIRED).not().isEmpty(),
    productController.addProduct);

router.get("/get/product", [middleware.authenticateUser], productController.listProduct);
router.get("/get/product/:productId", [middleware.authenticateUser],
    param("productId").exists().isMongoId().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    productController.getproduct);

router.post("/update/product/:productId", [middleware.authenticateUser],
    param("productId").exists().isMongoId().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    body("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("productName").exists().withMessage(Message.PRODUCT_NAME_IS_REQUIRED).not().isEmpty(),
    body("details").exists().withMessage(Message.DETAILS_IS_REQUIRED).not().isEmpty(),
    body("price").exists().withMessage(Message.PRICE_IS_REQUIRED).not().isEmpty(),
    body("manufacture").exists().withMessage(Message.MANUFACTURE_IS_REQUIRED).not().isEmpty(),
    productController.updateProduct);

router.delete("/delete/product/:productId", [middleware.authenticateUser],
    param("productId").exists().isMongoId().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    productController.deleteProduct);

module.exports = router