const express = require('express');
const router = express.Router();
const reviewController = require("../../controller/user/reviewController");
const middleware = require("../../helper/middleware")
let { Message } = require("../../helper/localization");
const { body, param } = require("express-validator");


router.post("/add/review", [middleware.authenticateUser],
    body("productId").exists().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    body("star").exists().withMessage(Message.STAR_IS_REQUIRED).not().isEmpty(),
    body("name").exists().withMessage(Message.FIRST_NAME_IS_REQUIRED).not().isEmpty(),
    body("title").exists().withMessage(Message.TITLE_IS_REQUIRED).not().isEmpty(),
    body("details").exists().withMessage(Message.DETAILS_IS_REQUIRED).not().isEmpty(),
    reviewController.addreview);

router.get("/get/review/:productId", [middleware.authenticateUser],
    param("productId").exists().isMongoId().withMessage(Message.PRODUCT_ID_IS_REQUIRED).not().isEmpty(),
    reviewController.getReview);
router.delete("/delete/review/:reviewId", [middleware.authenticateUser],
    param("reviewId").exists().isMongoId().withMessage(Message.REVIEW_ID_IS_REQUIRED).not().isEmpty(),
    reviewController.deleteReview);
module.exports = router