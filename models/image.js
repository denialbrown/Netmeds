"use strict";

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    marked:{
        type:String,
    },
    status: {
        type: String,
        enum: ['active', 'inActive'],
        default: 'active',
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

module.exports = mongoose.model("image", imageSchema);


