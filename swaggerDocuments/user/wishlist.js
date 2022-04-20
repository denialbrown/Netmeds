/**
 * @swagger
 * /add/wishList:
 *   post:
 *     summary: add product to wishList 
 *     tags: [wishList]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 624ee4b0f743d56f49901b41
 *     responses:
 *       200:
 *         description: wishlist product added sucessfully
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
 *                   example: wishlist product added sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *       500:
 *         description: add wishlist product  failed
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
 * /get/wishList:
 *   get:
 *     summary: list product to wishList 
 *     tags: [wishList]
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
 *         description: list wishlist product sucessfully
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
 *                   example: list wishlist product sucessfully
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
 *                       example: path 
 *                     productName:
 *                       type: string
 *                       example: abc 
 *                     details:
 *                       type: string
 *                       example: xyz
 *                     price:
 *                       type: Number
 *                       example: 999  
 *                     pricedetails:
 *                       type: Number
 *                       example:  20
 *       500:
 *         description: wishlist product list failed
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
 * /delete/wishList/{wishListId}:
 *   delete:
 *     summary: delete product to wishList 
 *     tags: [wishList]
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
 *        name: wishListId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     responses:
 *       200:
 *         description:  wishlist product deleted sucessfully
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
 *                   example:  wishlist product deleted sucessfully
 *       500:
 *         description:  wishlist product delete failed
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