/**
 * @swagger
 * /add/product:
 *   post:
 *     summary: add product
 *     tags: [product] 
 *     parameters:
 *      - in: header
 *        name: nonce
 *        required: true
 *        default: 123456
 *      - in: header
 *        name: timestamp
 *        required: true
 *        default: 12345678
 *      - in: header
 *        name: token
 *        required: true
 *        default: 9067b6a045f321090ea476eaec169002c5e335a540cd77b5726c7547b2bf5209
 *     requestBody:
 *       required: true
 *       content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryId:
 *                   type: string
 *                   example:  624be87ecd482bdb24487846
 *                 subCategoryId:
 *                   type: string
 *                   example: 624be836cd482bdb24487843
 *                 productName:
 *                   type: string
 *                   example: abc 
 *                 details:
 *                   type: Number
 *                   example: 10 tablets
 *                 price:
 *                   type: string
 *                   example: 1000  
 *                 discount:
 *                   type: string
 *                   example:  10
 *                 manufacture:
 *                   type: string
 *                   example: netmeds pvt ltd
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format:  binary
 *     responses:
 *       200:
 *         description: sucessfully added subCategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: sucessfully added subCategory
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *       500:
 *         description: add subCategory failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */

/**
 * @swagger
 * /get/product:
 *   get:
 *     summary: list user products
 *     tags: [product] 
 *     parameters:
 *      - in: header
 *        name: nonce
 *        required: true
 *        default: 123456
 *      - in: header
 *        name: timestamp
 *        required: true
 *        default: 12345678
 *      - in: header
 *        name: token
 *        required: true
 *        default: 9067b6a045f321090ea476eaec169002c5e335a540cd77b5726c7547b2bf5209
 *     responses:
 *       200:
 *         description: list product sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: list product sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                       example:  id
 *                     subCategoryId:
 *                       type: string
 *                       example: id
 *                     image:
 *                       type: string
 *                       example: id 
 *                     productName:
 *                       type: string
 *                       example: abc 
 *                     details:
 *                       type: Number
 *                       example: xyz
 *                     price:
 *                       type: string
 *                       example: 999  
 *                     pricedetails:
 *                       type: string
 *                       example:  20% discount
 *       500:
 *         description: list product failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */

/**
 * @swagger
 * /get/product/{productId}:
 *   get:
 *     summary: list user products
 *     tags: [product] 
 *     parameters:
 *      - in: header
 *        name: nonce
 *        required: true
 *        default: 123456
 *      - in: header
 *        name: timestamp
 *        required: true
 *        default: 12345678
 *      - in: header
 *        name: token
 *        required: true
 *        default: 9067b6a045f321090ea476eaec169002c5e335a540cd77b5726c7547b2bf5209
 *      - in: path
 *        name: productId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: list product sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                       example:  id
 *                     subCategoryId:
 *                       type: string
 *                       example: id
 *                     image:
 *                       type: string
 *                       example: id 
 *                     productName:
 *                       type: string
 *                       example: abc 
 *                     details:
 *                       type: Number
 *                       example: xyz
 *                     price:
 *                       type: string
 *                       example: 999  
 *                     pricedetails:
 *                       type: string
 *                       example:  20% discount
 *       500:
 *         description: list product failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */

/**
 * @swagger
 * /update/product/{productId}:
 *   post:
 *     summary: update product
 *     tags: [product] 
 *     parameters:
 *      - in: header
 *        name: nonce
 *        required: true
 *        default: 123456
 *      - in: header
 *        name: timestamp
 *        required: true
 *        default: 12345678
 *      - in: header
 *        name: token
 *        required: true
 *        default: 9067b6a045f321090ea476eaec169002c5e335a540cd77b5726c7547b2bf5209
 *      - in: path
 *        name: productId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     requestBody:
 *       required: true
 *       content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryId:
 *                   type: string
 *                   example:  624be87ecd482bdb24487846
 *                 subCategoryId:
 *                   type: string
 *                   example: 624be836cd482bdb24487843
 *                 productName:
 *                   type: string
 *                   example: abc 
 *                 details:
 *                   type: Number
 *                   example: 10 tablets
 *                 price:
 *                   type: string
 *                   example: 1000  
 *                 discount:
 *                   type: string
 *                   example:  10
 *                 manufacture:
 *                   type: string
 *                   example: netmeds pvt ltd
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format:  binary
 *     responses:
 *       200:
 *         description: add product sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                   type: string
 *                   example: add product sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *       500:
 *         description: update product failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */

/**
 * @swagger
 * /delete/product/{productId}:
 *   delete:
 *     summary: delete user products
 *     tags: [product] 
 *     parameters:
 *      - in: header
 *        name: nonce
 *        required: true
 *        default: 123456
 *      - in: header
 *        name: timestamp
 *        required: true
 *        default: 12345678
 *      - in: header
 *        name: token
 *        required: true
 *        default: 9067b6a045f321090ea476eaec169002c5e335a540cd77b5726c7547b2bf5209
 *      - in: path
 *        name: productId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     responses:
 *       200:
 *         description: delete product sucessfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                   example: 200
 *                 responseMessage:
 *                    type: string
 *                    example: delete product sucessfully
 *       500:
 *         description: delete product failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                   type: string
 */

