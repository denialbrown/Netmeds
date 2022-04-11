const mongoose = require("mongoose");


const wishListSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  productId:{
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

module.exports = mongoose.model("wishList", wishListSchema);


