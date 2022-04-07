const express = require('express');
const router = express.Router();
const productController = require("../controller/productCantroller");
const middleware = require("../helper/middleware")

router.post("/add/category", [middleware.authenticateUser],productController.addCategory);
router.get("/get/category/:categoryId", [middleware.authenticateUser],productController.getCategory);
router.post("/update/category/:categoryId", [middleware.authenticateUser],productController.updateCategory);
router.delete("/delete/category/:categoryId", [middleware.authenticateUser],productController.deleteCategory);

router.post("/add/sub-category", [middleware.authenticateUser],productController.addSubCategory);
router.get("/get/sub-category/:subCategoryId", [middleware.authenticateUser],productController.getSubCategory);
router.post("/update/sub-category/:subCategoryId", [middleware.authenticateUser],productController.updateSubCategory);
router.delete("/delete/sub-category/:subCategoryId", [middleware.authenticateUser],productController.deleteSubCategory);

router.post("/add/product", [middleware.authenticateUser],productController.addProduct);
router.get("/get/product", [middleware.authenticateUser], productController.listProduct);
router.get("/get/product/:productId", [middleware.authenticateUser], productController.getproduct);
router.post("/update/product/:productId", [middleware.authenticateUser], productController.updateProduct);
router.delete("/delete/product/:productId", [middleware.authenticateUser], productController.deleteProduct);

module.exports = router