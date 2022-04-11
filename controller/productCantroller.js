const categorySchema = require("../models/category");
const subCategorySchema = require("../models/subCategory");
const productSchema = require("../models/product");
const wishListSchema = require("../models/wishList");
const imageSchema = require("../models/image");
const Service = require("../helper/index");
const send = Service.sendResponse;
const { ErrorCode, HttpStatus } = require("../helper/enum")
const { Message } = require("../helper/localization");
const fs = require('fs');

module.exports = {

    addCategory: async function (req, res) {
        try {
            var category = new categorySchema;
            category.categoryName = req.body.categoryName
            category.userId = req.authUser._id
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_ADDED, {
                categoryName: category.categoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    updateCategory: async function (req, res) {
        try {
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            category.categoryName = req.body.categoryName
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_UPDATED, {
                categoryName: category.categoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    getCategory: async function (req, res) {
        try {
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_LIST, {
                categoryName: category.categoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    deleteCategory: async function (req, res) {
        try {
            var category = await categorySchema.findOne({ _id: req.params.categoryId, isDeleted: false })
            category.isDeleted = true
            await category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_DELETED, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    addSubCategory: async function (req, res) {
        try {
            var category = new subCategorySchema;
            category.subCategoryName = req.body.subCategoryName
            category.userId = req.authUser._id
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_ADDED, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    updateSubCategory: async function (req, res) {
        try {
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            category.subCategoryName = req.body.subCategoryName
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_UPDATED, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    getSubCategory: async function (req, res) {
        try {
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_LIST, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    deleteSubCategory: async function (req, res) {
        try {
            var category = await subCategorySchema.findOne({ _id: req.params.subCategoryId, isDeleted: false })
            category.isDeleted = true;
            category.save()
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.CATEGORY_DELETED, {
                subCategoryName: category.subCategoryName
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    addProduct: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var newproduct = new productSchema;
            newproduct.categoryId = req.body.categoryId
            newproduct.subCategoryId = req.body.subCategoryId
            newproduct.userId = req.authUser._id
            newproduct.productName = req.body.productName
            newproduct.details = req.body.details
            newproduct.price = req.body.price
            newproduct.discount = req.body.discount
            newproduct.manufacture = req.body.manufacture
            var price = req.body.price
            var discount = req.body.discount
            newproduct.bestPrice = Service.price(price, discount)

            if (req.files) {
                const files = req.files.images
                var check = files.length
                if (check > 5) {
                    return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.IMAGE_5_IMAGE, null)
                }
                await newproduct.save()
                const folderName = newproduct._id.valueOf()
                fs.mkdir('./uploads/' + folderName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })

                var imageData = []
                for (let i = 0; i < files.length; i++) {
                    var fileName = files[i].name;
                    var Path = './uploads/' + folderName + '/' + fileName
                    files[i].mv(Path)
                    var data = {
                        image: Path,
                        productId: newproduct._id
                    }
                    imageData.push(data)
                }
                await imageSchema.insertMany(imageData)

            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_ADD_SUCCESS, {
                productName: newproduct.productName,
                details: newproduct.details,
                price: newproduct.price,
                discount: newproduct.discount,
                manufacture: newproduct.manufacture,
                bestPrice: newproduct.bestPrice,
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    listProduct: async function (req, res) {
        try {
            const filter = {
                userId: req.authUser._id,
                isDeleted: false,
            }
            var product = await productSchema.aggregate([
                {
                    $match: filter,
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
                    },
                },
            ])
                .exec();
            var listProduct = []
            for (let i = 0; i < product.length; i++) {
                var id = product[i]._id;
                var images = await imageSchema.find({ productId: id, isDeleted: false })
                var mainProduct = []
                for (let i = 0; i < images.length; i++) {
                    var path = images[i].image
                    var basepath = process.env.BASE
                    var imagepath = basepath + path
                    mainProduct.push(imagepath)
                }
                var data = {
                    id: id,
                    categoryName: product[i].categoryName,
                    subCategoryName: product[i].subCategoryName,
                    productName: product[i].productName,
                    details: product[i].details,
                    price: product[i].price,
                    discount: product[i].discount,
                    bestPrice: product[i].bestPrice,
                    manufacture: product[i].manufacture,
                    image: mainProduct,
                }
                listProduct.push(data)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_LIST, listProduct);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    getproduct: async function (req, res) {
        try {
            let product = await productSchema.find({ _id: req.params.productId, isDeleted: false })
                .populate('categoryId')
                .populate('subCategoryId')
                .exec()
            if (!product) {
                return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.PRODUCT_NOT_FOUND, mainProduct);
            }

            var mainProduct = []
            product.forEach(async (value) => {
                var data = {
                    categoryName: value.categoryId.categoryName,
                    subCategoryName: value.subCategoryId.subCategoryName,
                    productName: value.productName,
                    details: value.details,
                    price: value.price,
                    discount: value.discount,
                    bestPrice: value.bestPrice,
                    manufacture: value.manufacture,
                }
                mainProduct.push(data)
            })
            var images = await imageSchema.find({ productId: req.params.productId, isDeleted: false })
            for (let i = 0; i < images.length; i++) {
                var path = images[i].image
                var basepath = process.env.BASE
                var imagepath = basepath + path
                mainProduct.push(imagepath)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_LIST, mainProduct);

        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    updateProduct: async function (req, res) {
        try {
            var checkProduct = await productSchema.findOne({ _id: req.params.productId, isDeleted: false });
            if (!checkProduct) {
                return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.PRODUCT_NOT_FOUND, null);
            }
            checkProduct.categoryId = req.body.categoryId
            checkProduct.subCategoryId = req.body.subCategoryId
            checkProduct.userId = req.authUser._id
            checkProduct.productName = req.body.productName
            checkProduct.details = req.body.details
            checkProduct.price = req.body.price
            checkProduct.discount = req.body.discount
            checkProduct.manufacture = req.body.manufacture
            var price = req.body.price
            var discount = req.body.discount
            checkProduct.bestPrice = Service.price(price, discount)


            const folderName = req.params.productId.valueOf()
            var img = await imageSchema.find({ productId: req.params.productId, isDeleted: false })
            for (let i = 0; i < img.length; i++) {
                img[i].isDeleted = true
                img[i].save()
                fs.unlinkSync('./uploads/' + folderName + '/' + img[i].imageName)
            }
            if (req.files) {
                const files = req.files.images
                var check = files.length
                if (check > 5) {
                    return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.IMAGE_5_IMAGE, null)
                }
                await checkProduct.save()
                if (!fs.existsSync('./uploads/' + folderName)) {
                    fs.mkdir('./uploads/' + folderName, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                var imageData = []
                for (let i = 0; i < files.length; i++) {
                    var fileName = files[i].name;
                    var Path = './uploads/' + folderName + '/' + fileName
                    files[i].mv(Path)
                    var data = {
                        image: Path,
                        productId: newproduct._id
                    }
                    imageData.push(data)
                }
                await imageSchema.insertMany(imageData)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_UPDATE_SUCCESS, {
                productName: checkProduct.productName,
                details: checkProduct.details,
                price: checkProduct.price,
                pricedetails: checkProduct.pricedetails,
            });
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    deleteProduct: async function (req, res) {
        try {
            var checkProduct = await productSchema.findOne({ _id: req.params.productId, isDeleted: false });
            if (!checkProduct) {
                return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.PRODUCT_NOT_FOUND, null);
            }
            checkProduct.isDeleted = true
            checkProduct.save()
            var img = imageSchema.findOne({ productId: req.params.productId, isDeleted: false });
            for (let i = 0; i < img.length; i++) {
                img[i].isDeleted = true
                img[i].save()
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_DELETE, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    addWishList: async function (req, res) {
        try {
            var wishlist = await wishListSchema.findOne({ productId: req.body.productId, isDeleted: false })
            if (wishlist) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_ADDED, null);
            }
            var product = await productSchema.findOne({ _id: req.body.productId, isDeleted: false })
            if (!product) {
                return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.PRODUCT_NOT_FOUND, null);
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
    getWishList: async function (req, res) {
        try {
            var ids = []
            var product = await wishListSchema.find({ userId: req.authUser._id, isDeleted: false })
            if (!product) {
                return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.WISHLIST_EMPTY, null);
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
                    },
                },
            ])
            if (!product) {
                return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.PRODUCT_NOT_FOUND, null);
            }
            var listProduct = []
            for (let i = 0; i < product.length; i++) {
                var id = product[i]._id;
                var images = await imageSchema.find({ productId: id, isDeleted: false })
                var mainProduct = []
                for (let i = 0; i < images.length; i++) {
                    var path = images[i].image
                    var basepath = process.env.BASE
                    var imagepath = basepath + path
                    mainProduct.push(imagepath)
                }
                var data = {
                    id: id,
                    categoryName: product[i].categoryName,
                    subCategoryName: product[i].subCategoryName,
                    productName: product[i].productName,
                    details: product[i].details,
                    price: product[i].price,
                    discount: product[i].discount,
                    bestPrice: product[i].bestPrice,
                    manufacture: product[i].manufacture,
                    image: mainProduct,
                }
                listProduct.push(data)
            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.WISH_LIST, listProduct);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    deleteWishList: async function (req, res) {
        try {
            var product = await wishListSchema.findOne({ _id: req.params.wishListId, isDeleted: false })
            if (!product) {
                return send(res, ErrorCode.INVALID_CODE, HttpStatus.UNAUTHORIZED, Message.PRODUCT_NOT_FOUND, null);
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
