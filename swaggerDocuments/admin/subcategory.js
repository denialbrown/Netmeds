
/**
 * @swagger
 * /add/sub-category:
 *   post:
 *     summary: add sub subCategory 
 *     tags: [subCategory]
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
 *               subCategoryName:
 *                 type: string
 *                 example: abc
 *     responses:
 *       200:
 *         description: sucessfully added category
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
 *                   example: sucessfully added category
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *       500:
 *         description: add category failed
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
 * /list/subCategory:
 *   get:
 *     summary: list subCategory 
 *     tags: [subCategory]
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
 *         description: list subCategory sucessfully
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
 *                    example: list subCategory sucessfully
 *                 responseData:
 *                   type: array
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *                     subCategoryName:
 *                       type: string
 *                       example: abc
 *       500:
 *         description: list subCategory failed
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
 * /get/sub-category/{subCategoryId}:
 *   get:
 *     summary: list sub subCategory 
 *     tags: [subCategory]
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
 *        name: subCategoryId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     responses:
 *       200:
 *         description: list subCategory sucessfully
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
 *                    example: list subCategory sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     subCategoryName:
 *                       type: string
 *                       example: abc
 *       500:
 *         description: list subCategory failed
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
 * /update/sub-category/{subCategoryId}:
 *   post:
 *     summary: update sub subCategory 
 *     tags: [subCategory]
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
 *        name: subCategoryId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subCategoryName:
 *                 type: string
 *                 example: abc
 *     responses:
 *       200:
 *         description: sucessfully updated subCategory
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
 *                   example: sucessfully updated subCategory
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *       500:
 *         description: update subCategory failed
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
 * /delete/sub-category/{subCategoryId}:
 *   delete:
 *     summary: delete sub subCategory 
 *     tags: [subCategory]
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
 *        name: subCategoryId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     responses:
 *       200:
 *         description: delete subCategory sucessfully
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
 *                    example: delete subCategory sucessfully
 *       500:
 *         description: delete subCategory failed
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