
/**
 * @swagger
 * /add/review:
 *   post:
 *     summary: add review 
 *     tags: [review]
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
 *               star:
 *                 type: string
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *     responses:
 *       200:
 *         description: review added sucessfully
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
 *                   example: review added sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *       500:
 *         description: review add failed
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
 * /list/review:
 *   get:
 *     summary: list review 
 *     tags: [review]
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
 *         description: list review sucessfully
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
 *                    example: list review sucessfully
 *                 responseData:
 *                   type: array
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 62395a01adb56e8f5964ea45
 *                     star:
 *                       type: integer
 *                       example: 5
 *                     name:
 *                       type: integer
 *                       example: 5
 *                     title:
 *                       type: integer
 *                       example: 5
 *                     details:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: list review failed
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
 * /get/review/{productId}:
 *   get:
 *     summary: list review 
 *     tags: [review]
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
 *         description: review listed sucessfully
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
 *                    example: review listed sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     star:
 *                       type: string
 *                     name:
 *                       type: string
 *                     title:
 *                       type: string
 *                     details:
 *                       type: string
 *       500:
 *         description: review list failed
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
 * /delete/review/{reviewId}:
 *   delete:
 *     summary: delete review 
 *     tags: [review]
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
 *        name: reviewId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45
 *     responses:
 *       200:
 *         description:  review deleted sucessfully
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
 *                    example:  review deleted sucessfully
 *       500:
 *         description:  review delete failed
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