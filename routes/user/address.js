const express = require('express');
const router = express.Router();
const addressController = require("../../controller/user/addressController");
const middleware = require("../../helper/middleware")
let { Message } = require("../../helper/localization");
const { body, param } = require("express-validator");

router.post("/add/address", [middleware.authenticateUser],

    body("firstName").exists().withMessage(Message.FIRST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_FIRSTNAME),
    body("lastName").exists().withMessage(Message.LAST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_LASTNMAE),
    body("address").exists().withMessage(Message.ADDRESS_IS_REQUIRED).not().isEmpty(),
    body("landMark").exists().withMessage(Message.LANDMARK_IS_REQUIRED).not().isEmpty(),
    body("city").exists().withMessage(Message.CITY_IS_REQUIRED).not().isEmpty(),
    body("state").exists().withMessage(Message.STATE_IS_REQUIRED).not().isEmpty(),
    body("pincode").exists().isNumeric().withMessage(Message.PINCODE_IS_REQUIRED).not().isEmpty(),
    addressController.addAddress);

router.get("/get/address", [middleware.authenticateUser], addressController.listAddress);

router.get("/getaddress/:addressId", [middleware.authenticateUser],
    param("addressId").exists().isMongoId().withMessage(Message.INVALID_ADDRESS_ID).not().isEmpty(),
    addressController.getAddress);

router.post("/update/address/:addressId", [middleware.authenticateUser],

    param("addressId").exists().isMongoId().withMessage(Message.INVALID_ADDRESS_ID),
    body("firstName").exists().withMessage(Message.FIRST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_FIRSTNAME),
    body("lastName").exists().withMessage(Message.LAST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_LASTNMAE),
    body("address").exists().withMessage(Message.ADDRESS_IS_REQUIRED).not().isEmpty(),
    body("landMark").exists().withMessage(Message.LANDMARK_IS_REQUIRED).not().isEmpty(),
    body("city").exists().withMessage(Message.CITY_IS_REQUIRED).not().isEmpty(),
    body("state").exists().withMessage(Message.STATE_IS_REQUIRED).not().isEmpty(),
    body("pincode").exists().isNumeric().withMessage(Message.PINCODE_IS_REQUIRED).not().isEmpty(),
    addressController.updateAddress);

router.delete("/delete/address/:addressId", [middleware.authenticateUser],

    param("addressId").exists().isMongoId().withMessage(Message.INVALID_ADDRESS_ID),
    addressController.deleteAddress);

module.exports = router
