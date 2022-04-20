/**
 * @swagger
 * /user/{search}:
 *   get:
 *     summary: search product  
 *     tags: [search]
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
 *        name: search
 *        required: true
 *        default: xyz
 *     responses:
 *       200:
 *         description:  search sucessfully
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
 *                    example: search sucessfully
 *                 responseData:
 *                   type: object
 *                   properties:
 *                     search:
 *                       type: string
 *       500:
 *         description:  search failed
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