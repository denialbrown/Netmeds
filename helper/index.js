const { ErrorCode } = require("../helper/enum")
const { validationResult } = require("express-validator");
const moment = require("moment");
const otpGenerator = require('otp-generator')
const { Action } = require("../helper/localization")
const LOGIN_TOKEN_EXPIRES_IN = 10 * 60 * 1000;
const jwt = require("jsonwebtoken");
var sid = process.env.SID_KEY;
var auth_token = process.env.AUTH_TOKEN;
var twilio = require("twilio")(sid, auth_token);
const userSchema = require("../models/user")



module.exports = {
    sendResponse(res, status, code, message, payload) {
        return res.status(status).send(prepareResponse(code, message, payload));
    },
    hasValidatorErrors: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array()[0];
            let msg;
            if (err.msg === "Invalid value") {
                msg = `Parameter ${err.location}.${err.param} ${err.msg}.`;
            }
            res.status(400).json(this.response(ErrorCode.REQUIRED_CODE, msg, errors.array()));
            return true;
        } else {
            return false;
        }
    },
    price: function (price, discount) {
        var discounts = price * discount / 100
        return price - discounts
    },
    getCurrentTimeStampWithAdditionMinutes: function (minutes) {
        return moment().add(minutes, "minutes").unix();
    },
    generateOneTimePassword: async function (length) {

        return otpGenerator.generate(length, { digits: true, specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false });
    },
    response: function (internalCode, message, data) {
        if (data != null || data != undefined) {
            return {
                responseCode: internalCode,
                responseMessage: message,
                responseData: data,
            };
        }
        return {
            responseCode: internalCode,
            responseMessage: message,
        };
    },
    generateToken: async function (user) {
        return generateJwt({
            sub: user._id,
            action: Action.LOGIN
        }, LOGIN_TOKEN_EXPIRES_IN);
    },
    sendOtp: async function (phone, otp) {
        twilio.messages
            .create({
                from: "+19034146423",
                to: phone,
                body: otp,
            })
            .then(function (res) { console.log("message has sent!") })
            .catch(function (err) {
                console.log(err);
            });

    },
    verifyJwt: function (token) {
        try {
            let tokenData = jwt.verify(token, process.env.JWT_SECRET);
            if (tokenData && this.getCurrentTimeStampUnix() > tokenData.exp) {
                return {
                    isValid: false,
                    reason: "expired"
                };
            } else if (tokenData && this.getCurrentTimeStampUnix() < tokenData.exp) {
                return {
                    isValid: true,
                    ...tokenData
                };
            } else {
                return {
                    isValid: false,
                    reason: "invalid"
                };
            }
        } catch (err) {
            return {
                isValid: false,
                reason: "invalid"
            };
        }
    },
    getCurrentTimeStampUnix: function () {
        return moment().unix();
    },
    random: async function generateRandomNumber() {
        var minm = 1000000000;
        var maxm = 9999999999;
        return Math.floor(Math
            .random() * (maxm - minm + 1)) + minm;

    },
    getUserById: async function getUserById(userId) {
        return await userSchema.findById(userId);
    }

}

function prepareResponse(status, message, data) {
    if (data != null || data != undefined) {
        return {
            responseCode: status,
            responseMessage: message,
            responseData: data,
        };
    }
    return {
        responseCode: status,
        responseMessage: message,
    };
}

async function generateJwt(payload) {

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: LOGIN_TOKEN_EXPIRES_IN,
        algorithm: process.env.JWT_ALGORITHM,
    });
    return token;
}


