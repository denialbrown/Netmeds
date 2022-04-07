const addressSchema = require("../models/address");
const Service = require("../helper/index");
const send = Service.sendResponse;
const { HttpStatus } = require("../helper/enum")
const { Message } = require("../helper/localization")

module.exports = {

    addAddress: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
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
            var mark = await addressSchema.updateMany({ userId: req.authUser._id }, { $set: { mark: false } })
            newAddress.mark = true
            await newAddress.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_ADD_SUCCESS, {
                phone: newAddress.phone,
                firstName: newAddress.firstName,
                lastName: newAddress.lastName,
                address: newAddress.address,
                landMark: newAddress.landMark,
                city: newAddress.city,
                state: newAddress.state,
                pincode: newAddress.pincode,
            });
        } catch (error) {
            console.log(error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    listAddress: async function (req, res) {
        try {
            var userAddress = await addressSchema.find({ phone: req.authUser.phone, isDeleted: false }, {
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
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_ADDRESS_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_ADDRESSES, userAddress);

        } catch (error) {
            console.log(error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    getAddress: async function (req, res) {
        try {
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
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_ADDRESS_NOT_FOUND, null);
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.USER_ADDRESSES, userAddress);

        } catch (error) {
            console.log(error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    updateAddress: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checkAddress = await addressSchema.findOne({ _id: req.params.addressId, isDeleted: false });
            if (!checkAddress) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_NOT_FOUND, null);
            }
            checkAddress.userId = req.authUser._id
            checkAddress.phone = req.authUser.phone
            checkAddress.firstName = req.body.firstName
            checkAddress.lastName = req.body.lastName
            checkAddress.address = req.body.address
            checkAddress.landMark = req.body.landMark
            checkAddress.city = req.body.city
            checkAddress.state = req.body.state
            checkAddress.pincode = req.body.pincode
            var mark = await addressSchema.updateMany({ userId: req.authUser._id }, { $set: { mark: false } })
            checkAddress.mark = true
            await checkAddress.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_UPDATE_SUCCESS, {
                phone: checkAddress.phone,
                firstName: checkAddress.firstName,
                lastName: checkAddress.lastName,
                address: checkAddress.address,
                landMark: checkAddress.landMark,
                city: checkAddress.city,
                state: checkAddress.state,
                pincode: checkAddress.pincode,
            });

        } catch (error) {
            console.log(error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
    deleteAddress: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checkAddress = await addressSchema.findOne({ _id: req.params.addressId, isDeleted: false });
            console.log(checkAddress);
            if (!checkAddress) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_NOT_FOUND, null);
            }
            if (checkAddress.mark == true) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRIMARY_ADDRESS, null);
            }
            checkAddress.isDeleted = true
            checkAddress.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.ADDRESS_DELETE_SUCESSFULLY, null);
        } catch (error) {
            console.log(error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG);
        }
    },
}
