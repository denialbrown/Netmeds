"use strict";

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("category", categorySchema);


