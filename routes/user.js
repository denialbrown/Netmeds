const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");
const { body } = require("express-validator");
let { Message } = require("../helper/localization");
const middleware = require("../helper/middleware")

router.post("/signup-signIn",
    body("phone").exists().isMobilePhone().isLength(10).withMessage(Message.INVALID_PHONE_NUMBER).not().isEmpty(),
    userController.signupUser);

router.post("/signup-signIn/verify",
    body("token").exists().withMessage(Message.TOKEN_IS_REQUIRED).not().isEmpty(),
    body("otp").exists().withMessage(Message.OTP_IS_REQUIRED).not().isEmpty(),
    userController.verifyUser);

// router.post("/userProfile", [middleware.authenticateUser],
//     body("firstName").exists().withMessage(Message.FIRST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_FIRSTNAME),
//     body("lastName").exists().withMessage(Message.LAST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_LASTNMAE),
//     body("email").exists().withMessage(Message.EMAIL_IS_REQUIRED).not().isEmpty().isEmail().withMessage(Message.EMAIL_FORMAT),
//     body("gender").exists().withMessage(Message.GENDER_IS_REQUIRED).not().isEmpty().isIn(['male', 'female', 'other']).withMessage(Message.ENTER_VALID_GENDER),
//     body("age").exists().isNumeric().withMessage(Message.AGE_IS_REQUIRED).not().isEmpty(),
//     userController.userProfile);

router.get("/userProfile/get", [middleware.authenticateUser],userController.getUserProfile);

router.post("/userProfile/update", [middleware.authenticateUser],

    body("firstName").exists().withMessage(Message.FIRST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_FIRSTNAME),
    body("lastName").exists().withMessage(Message.LAST_NAME_IS_REQUIRED).not().isEmpty().isLength(3).isAlpha().withMessage(Message.MINIMUM_CHARACTER_LASTNMAE),
    body("gender").exists().withMessage(Message.GENDER_IS_REQUIRED).not().isEmpty().isIn(['male', 'female', 'other']).withMessage(Message.ENTER_VALID_GENDER),
    body("age").exists().isNumeric().withMessage(Message.AGE_IS_REQUIRED).not().isEmpty(),
    userController.updateProfile);

router.post("/signup/google",

    body("token").exists().withMessage(Message.TOKEN_IS_REQUIRED).not().isEmpty(),
    userController.signupgoogle);

module.exports = router
