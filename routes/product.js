const express = require('express');
const router = express.Router();
const productController = require("../controller/productCantroller");
const middleware = require("../helper/middleware")
let { Message } = require("../helper/localization");
const { body, param } = require("express-validator");

//category
router.post("/add/category", [middleware.authenticateUser],
    body("categoryName").exists().withMessage(Message.CATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    productController.addCategory);
router.get("/get/category/:categoryId", [middleware.authenticateUser],
    param("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    productController.getCategory);
router.post("/update/category/:categoryId", [middleware.authenticateUser],
    param("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("categoryName").exists().withMessage(Message.CATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    productController.updateCategory);
router.delete("/delete/category/:categoryId", [middleware.authenticateUser],
    param("categoryId").exists().isMongoId().withMessage(Message.CATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    productController.deleteCategory);


//subcategory
router.post("/add/sub-category", [middleware.authenticateUser],
    body("subCategoryName").exists().withMessage(Message.SUBCATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    productController.addSubCategory);

router.get("/get/sub-category/:subCategoryId", [middleware.authenticateUser],
    param("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    productController.getSubCategory);

router.post("/update/sub-category/:subCategoryId", [middleware.authenticateUser],
    param("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    body("subCategoryName").exists().withMessage(Message.SUBCATEGORY_NAME_IS_REQUIRED).not().isEmpty(),
    productController.updateSubCategory);

router.delete("/delete/sub-category/:subCategoryId", [middleware.authenticateUser],
    param("subCategoryId").exists().isMongoId().withMessage(Message.SUBCATEGORY_ID_IS_REQUIRED).not().isEmpty(),
    productController.deleteSubCategory);


//product
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


//wishlist
router.post("/add/wishList", [middleware.authenticateUser], productController.addWishList);
router.get("/get/wishList", [middleware.authenticateUser], productController.getWishList);
router.delete("/delete/wishList/:wishListId", [middleware.authenticateUser],
    param("wishListId").exists().isMongoId().withMessage(Message.WISHLIST_ID_IS_REQUIRED).not().isEmpty(),
    productController.deleteWishList);


//review
router.post("/add/review", [middleware.authenticateUser],
    body("productId").exists().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    body("star").exists().withMessage(Message.STAR_IS_REQUIRED).not().isEmpty(),
    body("name").exists().withMessage(Message.FIRST_NAME_IS_REQUIRED).not().isEmpty(),
    body("title").exists().withMessage(Message.TITLE_IS_REQUIRED).not().isEmpty(),
    body("details").exists().withMessage(Message.DETAILS_IS_REQUIRED).not().isEmpty(),
    productController.addreview);

router.get("/get/review/:productId", [middleware.authenticateUser],
    param("productId").exists().isMongoId().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    productController.getReview);
router.delete("/delete/review/:reviewId", [middleware.authenticateUser],
    param("reviewId").exists().isMongoId().withMessage(Message.REVIEW_ID_IS_REQUIRED).not().isEmpty(),
    productController.deleteReview);

module.exports = router