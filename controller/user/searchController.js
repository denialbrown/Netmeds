const productSchema = require("../../models/product");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization");

module.exports = {
    /**
     * This function is use for search product
     * @params {} req.params.search
     * @body {} res
     * @returns
     */
    searchProduct: async function (req, res) {
        try {
            var data = await productSchema.aggregate([
                {
                    $match: {
                        $or: [
                            { "productName": { $regex: req.params.search } },
                            { "price": { $regex: req.params.search } },
                            { "discount": { $regex: req.params.search } },
                            { "manufacture": { $regex: req.params.search } },
                            { "details": { $regex: req.params.search } },
                            { "bestPrice": { $regex: req.params.search } },
                        ]
                    }
                }, {
                    $lookup: {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "categoryName",
                    },
                }, {
                    $lookup: {
                        from: "subcategories",
                        localField: "subCategoryId",
                        foreignField: "_id",
                        as: "subCategoryName",
                    },
                }, {
                    $lookup: {
                        from: "images",
                        localField: "_id",
                        foreignField: "productId",
                        as: "img",
                    },
                }, {
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
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CART_LIST, data);
        } catch (error) {
            console.log('searchProduct', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}