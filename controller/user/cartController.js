const productSchema = require("../../models/product");
const cartSchema = require("../../models/cart");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for add product to cart
      @body {} req.body.productId
      @body {} res
     * @returns
     */
    addCart: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var cart = await cartSchema.findOne({ productId: req.body.productId, isDeleted: false })
            if (cart) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_ADDED_CART, null);
            }
            var product = await productSchema.findOne({ _id: req.body.productId, isDeleted: false })
            if (!product) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, null);
            }
            var cartProduct = new cartSchema
            cartProduct.userId = req.authUser._id
            cartProduct.productId = product._id
            cartProduct.qty = 1
            cartProduct.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_ADD_CART, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list products of cart
      @body {} res
     * @returns
     */
    listCart: async function (req, res) {
        try {
            var checkProduct = await cartSchema.find({ userId: req.authUser._id, isDeleted: false })
            if (!checkProduct) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_EMPTY, null);
            }
            var ids = []
            for (let i = 0; i < checkProduct.length; i++) {
                var data = checkProduct[i].productId
                ids.push(data)
            }
            var product = await productSchema.aggregate([
                {
                    $match: { _id: { $in: ids } }
                },
                {
                    $lookup: {
                        from: "images",
                        localField: "_id",
                        foreignField: "productId",
                        as: "img",
                    },
                },
                {
                    $lookup: {
                        from: "carts",
                        localField: "_id",
                        foreignField: "productId",
                        as: "cart",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        qty: {
                            $arrayElemAt: ["$cart.qty", 0]
                        },
                        productName: 1,
                        details: 1,
                        price: 1,
                        discount: 1,
                        bestPrice: 1,
                        manufacture: 1,
                        image: {
                            $concat: [process.env.BASE, { $arrayElemAt: ["$img.image", 0] }]
                        },
                    },
                },
            ])
            var listProduct = []
            var price = 0;
            var discount = 0;
            var bestPrice = 0;
            for (let i = 0; i < product.length; i++) {
                var qty = product[i].qty
                var prices = product[i].price * qty
                var checkdiscount = product[i].bestPrice - product[i].price
                var discounts = checkdiscount * qty
                var bestPrices = product[i].bestPrice * qty
                discount += discounts
                price += prices
                bestPrice += bestPrices
            }
            var priceDetails = {
                MRPTotal: price,
                NetmedsDiscount: discount,
                TotalAmount: bestPrice
            }
            listProduct.push(product)
            listProduct.push(priceDetails)
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_LIST, listProduct);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update product to cart
      @params {} req.params.cartId
      @body {} req.body.qty
      @body {} res
     * @returns
     */
    updateCart: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var cartProduct = await cartSchema.findOne({ _id: req.params.cartId, isDeleted: false })
            if (!cartProduct) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_PRODUCT_NOT_FOUND, null);
            }
            cartProduct.qty = req.body.qty
            cartProduct.save()
            var checkProduct = await cartSchema.find({ userId: req.authUser._id, isDeleted: false })
            if (!checkProduct) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_EMPTY, null);
            }
            var ids = []
            for (let i = 0; i < checkProduct.length; i++) {
                var data = checkProduct[i].productId
                ids.push(data)
            }
            var product = await productSchema.aggregate([
                {
                    $match: { _id: { $in: ids } }
                },
                {
                    $lookup: {
                        from: "images",
                        localField: "_id",
                        foreignField: "productId",
                        as: "img",
                    },
                },
                {
                    $lookup: {
                        from: "carts",
                        localField: "_id",
                        foreignField: "productId",
                        as: "cart",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        qty: {
                            $arrayElemAt: ["$cart.qty", 0]
                        },
                        productName: 1,
                        details: 1,
                        price: 1,
                        discount: 1,
                        bestPrice: 1,
                        manufacture: 1,
                        image: {
                            $concat: [process.env.BASE, { $arrayElemAt: ["$img.image", 0] }]
                        },
                    },
                },
            ])
            var listProduct = []
            var price = 0;
            var discount = 0;
            var bestPrice = 0;
            for (let i = 0; i < product.length; i++) {
                var qty = product[i].qty
                var prices = product[i].price * qty
                var checkdiscount = product[i].bestPrice - product[i].price
                var discounts = checkdiscount * qty
                var bestPrices = product[i].bestPrice * qty
                discount += discounts
                price += prices
                bestPrice += bestPrices
            }
            var priceDetails = {
                MRPTotal: price,
                NetmedsDiscount: discount,
                TotalAmount: bestPrice
            }
            listProduct.push(product)
            listProduct.push(priceDetails)
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_UPADTE, listProduct);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for delete product to cart
      @params {} req.params.cartId
      @body {} res
     * @returns
     */
    deleteCart: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checkProduct = await cartSchema.findOne({ _id: req.params.cartId, isDeleted: false })
            if (!checkProduct) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_PRODUCT_NOT_FOUND, null);
            }
            checkProduct.isDeleted = true
            checkProduct.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_PRODUCT_DELETE, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}