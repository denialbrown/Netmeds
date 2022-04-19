const productSchema = require("../../models/product");
const imageSchema = require("../../models/image");
const Service = require("../../helper/index");
const send = Service.sendResponse;
const { HttpStatus } = require("../../helper/enum")
const { Message } = require("../../helper/localization");
const fs = require('fs');
var mongoose = require('mongoose');

module.exports = {
    /**
     * This function is use for add product
      @body {} req.body.categoryId
      @body {} req.body.subCategoryId
      @body {} req.body.productName
      @body {} req.body.details
      @body {} req.body.price
      @body {} req.body.discount
      @body {} req.body.manufacture
      @body {} req.files
      @body {} res
     * @returns
     */
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
            await newproduct.save()
            if (req.files) {
                const files = req.files.images
                const folderName = newproduct._id.valueOf()
                fs.mkdir('./uploads/' + folderName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
                var imageData = []
                files.forEach(async (value, index) => {
                    var fileName = value.name;
                    var Path = './uploads/' + folderName + '/' + fileName
                    var savepath = '/uploads/' + folderName + '/' + fileName
                    if (index < 5) {
                        value.mv(Path)
                        if (index == 0) {
                            var data = {
                                image: savepath,
                                productId: newproduct._id,
                                marked: 1,
                            }
                            imageData.push(data)
                        } else {
                            var data = {
                                image: savepath,
                                productId: newproduct._id
                            }
                            imageData.push(data)
                        }
                    }
                })
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
    /**
     * This function is use for list category
      @body {} res
     * @returns
     */
    listProduct: async function (req, res) {
        try {
            var product = await productSchema.find({ userId: req.authUser._id, isDeleted: false, })
            var ids = []
            for (let i = 0; i < product.length; i++) {
                var id = product[i]._id;
                ids.push(id)
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
                }
            ])
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_LIST, product);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for list category
      @params {} req.params.productId
      @body {} res
     * @returns
     */
    getproduct: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            let filter = {
                _id: new mongoose.Types.ObjectId(req.params.productId),
                isDeleted: false
            }
            var product = await productSchema.aggregate([
                {
                    $match: filter
                },
                {
                    $lookup: {
                        from: "images",
                        let: { productId: "$_id" },
                        pipeline: [{
                            $match:
                            {
                                $expr:
                                {
                                    $and: [{ $eq: ["$productId", "$$productId"] },]
                                }
                            }
                        },
                        {
                            $project: {
                                image: {
                                    $concat: [process.env.BASE, "$image"]
                                },
                                productId: 1,
                                _id: 0
                            }
                        }
                        ],
                        as: "img",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        productName: 1,
                        details: 1,
                        price: 1,
                        discount: 1,
                        bestPrice: 1,
                        manufacture: 1,
                        img: 1,
                    },
                }
            ])
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_LIST, product);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
    /**
     * This function is use for update product
      @params {} req.params.productId
      @body {} req.body.categoryId
      @body {} req.body.subCategoryId
      @body {} req.body.productName
      @body {} req.body.details
      @body {} req.body.price
      @body {} req.body.discount
      @body {} req.body.manufacture
      @body {} req.files
      @body {} res
     * @returns
     */
    updateProduct: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checkProduct = await productSchema.findOne({ _id: req.params.productId, isDeleted: false });
            if (!checkProduct) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, null);
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
                fs.unlink('.' + img[i].image, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            if (req.files) {
                const files = req.files.images
                await checkProduct.save()
                if (!fs.existsSync('./uploads/' + folderName)) {
                    fs.mkdir('./uploads/' + folderName, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                var imageData = []
                files.forEach(async (value, index) => {
                    var fileName = value.name;
                    var Path = './uploads/' + folderName + '/' + fileName
                    var savepath = '/uploads/' + folderName + '/' + fileName
                    if (index < 5) {
                        value.mv(Path)
                        if (index == 0) {
                            var data = {
                                image: savepath,
                                productId: checkProduct._id,
                                marked: 1,
                            }
                            imageData.push(data)
                        } else {
                            var data = {
                                image: savepath,
                                productId: checkProduct._id
                            }
                            imageData.push(data)
                        }
                    }
                })
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
     /**
     * This function is use for delete category
      @params {} req.params.productId
      @body {} res
     * @returns
     */
    deleteProduct: async function (req, res) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            var checkProduct = await productSchema.findOne({ _id: req.params.productId, isDeleted: false });
            if (!checkProduct) {
                return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_NOT_FOUND, null);
            }
            checkProduct.isDeleted = true
            checkProduct.save()
            var img = await imageSchema.find({ productId: req.params.productId, isDeleted: false });
            for (let i = 0; i < img.length; i++) {
                img[i].isDeleted = true
                img[i].save()
            }
            const folderName = req.params.productId.valueOf()
            fs.rm('./uploads/' + folderName, { recursive: true, force: true }, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            return send(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, Message.PRODUCT_DELETE, null);
        } catch (error) {
            console.log('error', error);
            return send(res, HttpStatus.INTERNAL_SERVER_CODE, HttpStatus.INTERNAL_SERVER_CODE, Message.SOMETHING_WENT_WRONG, null);
        }
    },
}