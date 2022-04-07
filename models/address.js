"use strict";

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
    },
    phone:{
        type: Number,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    landMark: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    mark:{
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: true,
});

module.exports = mongoose.model("address", addressSchema);


