const categorySchema = require("../models/category");
const subCategorySchema = require("../models/subCategory");
const productSchema = require("../models/product");
const imageSchema = require("../models/image");
const Service = require("../helper/index");
const send = Service.sendResponse;
const { ErrorCode, HttpStatus } = require("../helper/enum")
const { Message } = require("../helper/localization");
const { query } = require("express");
const fs = require('fs');
const { log } = require("console");
const path = require("path");

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
            console.log(category);
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
            console.log(req.body);
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
            console.log(req.body);
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
            console.log(req.body);
            var newproduct = new productSchema;
            newproduct.categoryId = req.body.categoryId
            newproduct.subCategoryId = req.body.subCategoryId
            newproduct.userId = req.authUser._id
            newproduct.productName = req.body.productName
            newproduct.details = req.body.details
            newproduct.price = req.body.price
            newproduct.pricedetails = req.body.pricedetails
            await newproduct.save()

            if (!req.files) {
                return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Message.IMAGE_REQUIRED, null);
            }
            const folderName = newproduct._id.valueOf()
            console.log(folderName);
            fs.mkdir('./uploads/' + folderName, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            const files = req.files.images
            for (let i = 0; i < files.length; i++) {
                var fileName = files[i].name;
                var Path = './uploads/' + folderName + '/' + fileName
                files[i].mv(Path)
                var images = new imageSchema
                images.image = 'http://localhost:9000' + '/uploads/' + folderName + '/' + fileName
                images.productId = newproduct._id
                images.imageName = fileName
                images.save()

            }
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_ADD_SUCCESS, {
                productName: newproduct.productName,
                details: newproduct.details,
                price: newproduct.price,
                pricedetails: newproduct.pricedetails,
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
                        pricedetails: 1,
                    },
                },
            ])
                .exec();
            var listProduct = []
            for (let i = 0; i < product.length; i++) {
                var id = product[i]._id;
                var images = await imageSchema.find({ productId: id, isDeleted: false })
                console.log(images);
                var mainProduct = []
                for (let i = 0; i < images.length; i++) {
                    let imagepath = images[i].image
                    mainProduct.push(imagepath)
                }
                var data = {
                    id: id,
                    categoryName: product[i].categoryName,
                    subCategoryName: product[i].subCategoryName,
                    productName: product[i].productName,
                    details: product[i].details,
                    price: product[i].price,
                    pricedetails: product[i].pricedetails,
                    image: mainProduct,
                }
                console.log(data);
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
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, mainProduct);
            }

            var mainProduct = []
            product.forEach(async (value) => {
                var data = {
                    categoryName: value.categoryId.categoryName,
                    subCategoryName: value.subCategoryId.subCategoryName,
                    productName: value.productName,
                    details: value.details,
                    price: value.price,
                    pricedetails: value.pricedetails,
                }
                console.log(data);
                mainProduct.push(data)
            })
            var images = await imageSchema.find({ productId: req.params.productId, isDeleted: false })
            for (let i = 0; i < images.length; i++) {
                let imagepath = images[i].image
                console.log(imagepath);
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
            var productId = req.params.productId
            fs.rmdir('./uploads/' + productId, { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            var checkProduct = await productSchema.findOne({ _id: req.params.productId, isDeleted: false });
            if (!checkProduct) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, null);
            }
            checkProduct.categoryId = req.body.categoryId
            checkProduct.subCategoryId = req.body.subCategoryId
            checkProduct.productName = req.body.productName
            checkProduct.details = req.body.details
            checkProduct.price = req.body.price
            checkProduct.pricedetails = req.body.pricedetails
            await checkProduct.save()
            
            var img = await imageSchema.find({ productId: req.params.productId, isDeleted: false })
            for (let i = 0; i < img.length; i++) {
                img[i].isDeleted = true
                img[i].save()
            }
            
            const folderName = req.params.productId.valueOf()
            fs.mkdir('./uploads/' + folderName, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            const files = req.files.images
            for (let i = 0; i < files.length; i++) {
                var fileName = files[i].name;
                var Path = './uploads/' + folderName + '/' + fileName
                files[i].mv(Path)
                var images = new imageSchema
                images.image = 'http://localhost:9000' + '/uploads/' + folderName + '/' + fileName
                images.productId = req.params.productId
                images.imageName = fileName
                images.save()
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
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, null);
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
}