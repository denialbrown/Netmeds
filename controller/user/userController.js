const userSchema = require("../../models/user");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { ErrorCode, HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization")
const jwt_decode = require("jwt-decode");

module.exports = {
    /**
    * This function is use for signup/login for user 
    * @body {} req.body.countryCode
    * @body {} req.body.phone
    * @body {} res
    * @returns
    */
    signupUser: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var user = await userSchema.findOne({ phone: req.body.phone })
            if (!user) {
                var newuser = new userSchema;
                newuser.phone = req.body.phone
                newuser.otp = await Service.generateOneTimePassword(4)
                newuser.otpCreatedAt = await Service.getCurrentTimeStampWithAdditionMinutes(2);
                var save = newuser.save()
                if (!save) {
                    return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
                }
                var phone = req.body.countryCode + req.body.phone
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
            var save = user.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            var phone = req.body.countryCode + req.body.phone
            var otp = user.otp
            await Service.sendOtp(phone, otp)

            const data = {
                loginToken: await Service.generateToken(user),
            };
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN_SUCCESS, data);

        } catch (error) {
            console.log('signupUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for signup/login verify user 
     * @body {} req.body.token
     * @body {} req.body.otp
     * @body {} res
     * @returns
     */
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
            var save = await user.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            const data = {
                loginToken: await Service.generateToken(user),
            };
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN_SUCCESS, data);

        } catch (error) {
            console.log('verifyUser', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for add user profile 
     * @body {} req.body.firstName
     * @body {} req.body.lastName
     * @body {} req.body.email
     * @body {} req.body.gender
     * @body {} req.body.age
     * @body {} res
     * @returns
     */
    userProfile: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            req.authUser.firstName = req.body.firstName
            req.authUser.lastName = req.body.lastName
            req.authUser.email = req.body.email
            req.authUser.gender = req.body.gender
            req.authUser.age = req.body.age
            var save = await req.authUser.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP_SUCCESS, {
                id: req.authUser._id,
                firstName: req.authUser.firstName,
                lastName: req.authUser.lastName,
                email: req.authUser.email,
                gender: req.authUser.gender,
                phone: req.authUser.phone,
                age: req.authUser.age,
            });
        } catch (error) {
            console.log('userProfile', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list user profile 
      @body {} res
     * @returns
     */
    getUserProfile: async function (req, res) {
        try {
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP_SUCCESS, {
                firstName: req.authUser.firstName,
                lastName: req.authUser.lastName,
                phone: req.authUser.phone,
                email: req.authUser.email,
                gender: req.authUser.gender,
                age: req.authUser.age,
            });
        } catch (error) {
            console.log('getUserProfile', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update user profile 
     * @body {} req.body.firstName
     * @body {} req.body.lastName
     * @body {} req.body.email
     * @body {} req.body.gender
     * @body {} req.body.age
     * @body {} res
     * @returns
     */
    updateProfile: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            req.authUser.firstName = req.body.firstName
            req.authUser.lastName = req.body.lastName
            req.authUser.gender = req.body.gender
            req.authUser.dateOfBirth = req.body.dateOfBirth
            if (req.authUser.phone == undefined) {
                req.authUser.phone = req.body.phone
            }
            if (req.authUser.email == undefined) {
                req.authUser.email = req.body.email
            }
            var save = req.authUser.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_SIGNUP_SUCCESS, {
                id: req.authUser._id
            });
        } catch (error) {
            console.log('updateProfile', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update user profile 
     * @body {} req.body.token
     * @body {} res
     * @returns
     */
    signupgoogle: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var token = req.body.token
            var decoded = jwt_decode(token);
            if (!decoded.aud == process.env.CLIENT_ID) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.WHO_ARE_YOU, null);
            }
            var user = await userSchema.findOne({ email: decoded.email })
            if (!user) {
                var user = new userSchema
                user.email = decoded.email
                var save = await user.save()
                if (!save) {
                    return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
                }
                const data = {
                    loginToken: await Service.generateToken(user),
                };
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN_SUCCESS, data);
            }
            const data = {
                loginToken: await Service.generateToken(user),
            };
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_LOGIN_SUCCESS, data);

        } catch (error) {
            console.log('signupgoogle', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}