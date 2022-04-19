const productSchema = require("../../models/product");
const wishListSchema = require("../../models/wishList");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for delete product to wishlist
      @body {} req.body.productId
      @body {} res
     * @returns
     */
    addWishList: async function (req, res) {
        try {
            var wishlist = await wishListSchema.findOne({ productId: req.body.productId, isDeleted: false })
            if (wishlist) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_ADDED, null);
            }
            var product = await productSchema.findOne({ _id: req.body.productId, isDeleted: false })
            if (!product) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, null);
            }
            var wishProduct = new wishListSchema
            wishProduct.userId = req.authUser._id
            wishProduct.productId = product._id
            wishProduct.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_ADD_WISHLIST, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list to wishlist
      @header {} req.authUser._id
      @body {} res
     * @returns
     */
    getWishList: async function (req, res) {
        try {
            var ids = []
            var product = await wishListSchema.find({ userId: req.authUser._id, isDeleted: false })
            if (!product) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.WISHLIST_EMPTY, null);
            }
            for (let i = 0; i < product.length; i++) {
                var data = product[i].productId
                ids.push(data)
            }
            var product = await productSchema.aggregate([
                {
                    $match: { _id: { $in: ids } }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryName",
                    },
                },
                {
                    $lookup: {
                        from: "subcategories",
                        localField: "subCategoryId",
                        foreignField: "_id",
                        as: "subCategoryName",
                    },
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
                    $project: {
                        _id: 1,
                        categoryName: {
                            $arrayElemAt: ["$categoryName.categoryName", 0]
                        },
                        subCategoryName: {
                            $arrayElemAt: ["$subCategoryName.subCategoryName", 0]
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
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.WISH_LIST, product);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list to wishlist
      @params {}  req.params.wishListId
      @body {} res
     * @returns
     */
    deleteWishList: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var product = await wishListSchema.findOne({ _id: req.params.wishListId, isDeleted: false })
            if (!product) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, null);
            }
            product.isDeleted = true
            product.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.WISH_LIST_DELETE, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}