let { Message } = require("./localization");
let Service = require("./index");
const send = Service.sendResponse;
const { ErrorCode, HttpStatus } = require("../helper/enum")


module.exports = {

    authenticateUser: async function (req, res, next) {
        try {
            const accessToken = req.headers.token;
            if (accessToken === undefined) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.TOKEN_REQUIRED, null);
            }

            const token = Service.verifyJwt(accessToken);
            if (!token.isValid) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.TOKEN_INVALID, null);
            }

            const user = await Service.getUserById(token.sub);
            if (!user) {
                return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Message.TOKEN_INVALID, null);
            }

            req.authUser = user;
            return next();
        } catch (err) {
            next(err);
        }
    },
}