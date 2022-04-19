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
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                       example:  id
 *                     subCategoryId:
 *                       type: string
 *                       example: id
 *                     profileImg:
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
 *         description: signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
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
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                       example:  id
 *                     subCategoryId:
 *                       type: string
 *                       example: id
 *                     profileImg:
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
 *         description: signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
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
 *                 responseMessage:
 *                    type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                       example:  id
 *                     subCategoryId:
 *                       type: string
 *                       example: id
 *                     profileImg:
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
 *         description: signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
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
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                       example:  id
 *                     subCategoryId:
 *                       type: string
 *                       example: id
 *                     profileImg:
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
 *         description: signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
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
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseCode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 *                 responseData:
 *                   type: object
 *       500:
 *         description: signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsecode:
 *                   type: integer
 *                 responseMessage:
 *                    type: string
 */
