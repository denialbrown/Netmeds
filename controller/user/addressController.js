const addressSchema = require("../../models/address");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus, ErrorCode } = require("../../helper/enum")
const { Message } = require("../../helper/localization")

module.exports = {
    /**
     * This function is use for add address
     * @body {} req.body.firstName
     * @body {} req.body.lastName
     * @body {} req.body.address
     * @body {} req.body.landMark
     * @body {} req.body.city
     * @body {} req.body.state
     * @body {} req.body.pincode
     * @body {} res
     * @returns
     */
    addAddress: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            await addressSchema.updateMany({ userId: req.authUser._id }, { $set: { mark: false } })
            var newAddress = new addressSchema;
            newAddress.userId = req.authUser._id
            newAddress.phone = req.authUser.phone
            newAddress.firstName = req.body.firstName
            newAddress.lastName = req.body.lastName
            newAddress.address = req.body.address
            newAddress.landMark = req.body.landMark
            newAddress.city = req.body.city
            newAddress.state = req.body.state
            newAddress.pincode = req.body.pincode
            newAddress.mark = true
            var save = await newAddress.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_ADD_SUCCESS, {
                id: newAddress._id
            });
        } catch (error) {
            console.log('addAddress', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    /**
     * This function is use for list address
     * @body {} res
     * @returns
     */
    listAddress: async function (req, res) {
        try {
            var userAddress = await addressSchema.find({ userId: req.authUser._id, isDeleted: false }, {
                _id: 0,
                phone: 1,
                firstName: 1,
                lastName: 1,
                address: 1,
                landMark: 1,
                city: 1,
                state: 1,
                pincode: 1,
            })
            if (!userAddress) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.USER_ADDRESS_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_ADDRESSES, userAddress);

        } catch (error) {
            console.log('listAddress', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    /**
     * This function is use for list address
     * @params {} req.params.addressId
     * @body {} res
     * @returns
     */
    getAddress: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var userAddress = await addressSchema.findOne({ _id: req.params.addressId, isDeleted: false }, {
                _id: 0,
                phone: 1,
                firstName: 1,
                lastName: 1,
                address: 1,
                landMark: 1,
                city: 1,
                state: 1,
                pincode: 1,
            })
            if (!userAddress) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.USER_ADDRESS_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_ADDRESSES, userAddress);

        } catch (error) {
            console.log('getAddress', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    /**
     * This function is use for update address
     * @params {} req.params.addressId
     * @body {} req.body.firstName
     * @body {} req.body.lastName
     * @body {} req.body.address
     * @body {} req.body.landMark
     * @body {} req.body.city
     * @body {} req.body.state
     * @body {} req.body.pincode
     * @body {} res
     * @returns
     */
    updateAddress: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checkAddress = await addressSchema.findOne({ _id: req.params.addressId, isDeleted: false });
            if (!checkAddress) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.ADDRESS_NOT_FOUND, null);
            }
            await addressSchema.updateMany({ userId: req.authUser._id }, { $set: { mark: false } })
            checkAddress.userId = req.authUser._id
            checkAddress.phone = req.authUser.phone
            checkAddress.firstName = req.body.firstName
            checkAddress.lastName = req.body.lastName
            checkAddress.address = req.body.address
            checkAddress.landMark = req.body.landMark
            checkAddress.city = req.body.city
            checkAddress.state = req.body.state
            checkAddress.pincode = req.body.pincode
            checkAddress.mark = true
            var save = await checkAddress.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_UPDATE_SUCCESS, {
                id: checkAddress._id
            });
        } catch (error) {
            console.log('updateAddress', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    /**
     * This function is use for delete address
     * @params {} req.params.addressId
     * @body {} res
     * @returns
     */
    deleteAddress: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checkAddress = await addressSchema.findOne({ _id: req.params.addressId, isDeleted: false });
            if (!checkAddress) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.ADDRESS_NOT_FOUND, null);
            }
            if (checkAddress.mark == true) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRIMARY_ADDRESS, null);
            }
            checkAddress.isDeleted = true
            var save = checkAddress.save()
            if (!save) {
                return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.ADDRESS_NOT_SAVE, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_DELETE_SUCESSFULLY, null);
        } catch (error) {
            console.log('deleteAddress', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
}
