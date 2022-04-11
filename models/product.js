const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  productName: {
    type: String,
  },
  details: {
    type: String,
  },
  price: {
    type: String,
  },
  discount: {
    type: String,
  },
  bestPrice: {
    type: String,
  },
  manufacture: {
    type: String,
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

module.exports = mongoose.model("product", productSchema);


