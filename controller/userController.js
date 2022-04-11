const userSchema = require("../models/user");
const Service = require("../helper/index");
const send = Service.sendResponse;
const { ErrorCode, HttpStatus } = require("../helper/enum")
const { Message } = require("../helper/localization")

module.exports = {

    signupUser: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var user = await userSchema.findOne({ phone: req.body.phone },)
            if (!user) {
                var newuser = new userSchema;
                newuser.phone = req.body.phone
                newuser.otp = await Service.generateOneTimePassword(4)
                newuser.otpCreatedAt = await Service.getCurrentTimeStampWithAdditionMinutes(0);
                newuser.save()
                var phone = '+91' + req.body.phone
                var otp = newuser.otp
                await Service.sendOtp(phone, otp)
                const data = {
                    loginToken: await Service.generateToken(newuser),
                };
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN_SUCCESS, data);
            }
            user.phone = req.body.phone
            user.otp = await Service.generateOneTimePassword(4)
            user.otpCreatedAt = await Service.getCurrentTimeStampWithAdditionMinutes(2);
            user.save()
            var phone = '+91' + req.body.phone
            var otp = user.otp
            await Service.sendOtp(phone, otp)

            const data = {
                loginToken: await Service.generateToken(user),
            };
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN_SUCCESS, data);

        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    verifyUser: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            const token = Service.verifyJwt(req.body.token);
            if (!token.isValid) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.TOKEN_INVALID, null);
            }

            const user = await Service.getUserById(token.sub);
            if (!user) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.TOKEN_INVALID, null);
            }
            var loginTime = await Service.getCurrentTimeStampUnix(0);
            if (user.otp != req.body.otp || user.otpCreatedAt < loginTime) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.OTP_INVALID);
            }
            user.otp = ""
            user.otpCreatedAt = ""
            user.otpVerified = true
            await user.save()
            console.log(user);
            const data = {
                loginToken: await Service.generateToken(user),
            };
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN_SUCCESS, data);

        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    userProfile: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var user = req.authUser
            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.email = req.body.email
            user.gender = req.body.gender
            user.age = req.body.age
            user.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP_SUCCESS, {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender: user.gender,
                phone: user.phone,
                age: user.age,
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    getUserProfile: async function (req, res) {
        try {
            var user = req.authUser
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP_SUCCESS, {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                gender: user.gender,
                age: user.age,
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    updateProfile: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var user = req.authUser
            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.gender = req.body.gender
            user.age = req.body.age
            user.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP_SUCCESS, {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                gender: user.gender,
                age: user.age,
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}