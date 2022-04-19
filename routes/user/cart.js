const express = require('express');
const router = express.Router();
const cartController = require("../../controller/user/cartController");
const middleware = require("../../helper/middleware")
let { Message } = require("../../helper/localization");
const { body, param } = require("express-validator");


router.post("/add/cart", [middleware.authenticateUser],
    body("productId").exists().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    cartController.addCart);
router.get("/list/cart", [middleware.authenticateUser], cartController.listCart);

router.post("/update/cart/:cartId", [middleware.authenticateUser],
    param("cartId").exists().isMongoId().withMessage(Message.CART_ID_INVALID).not().isEmpty(),
    body("qty").exists().isNumeric().withMessage(Message.QTY_IS_INVALID).not().isEmpty(),
    cartController.updateCart);
router.delete("/delete/cart/:cartId", [middleware.authenticateUser],
    param("cartId").exists().isMongoId().withMessage(Message.CART_ID_INVALID).not().isEmpty(),
    cartController.deleteCart);
    
module.exports = router