const express = require('express');
const router = express.Router();
const wishlistController = require("../../controller/user/wishlistController");
const middleware = require("../../helper/middleware")
let { Message } = require("../../helper/localization");
const { param } = require("express-validator");

router.post("/add/wishList", [middleware.authenticateUser], wishlistController.addWishList);
router.get("/get/wishList", [middleware.authenticateUser], wishlistController.getWishList);
router.delete("/delete/wishList/:wishListId", [middleware.authenticateUser],
    param("wishListId").exists().isMongoId().withMessage(Message.WISHLIST_ID_IS_REQUIRED).not().isEmpty(),
    wishlistController.deleteWishList);
module.exports = router