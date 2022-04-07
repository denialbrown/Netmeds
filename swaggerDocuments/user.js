/**
 * @swagger
 * /signup-signIn:
 *   post:
 *     summary: signup-signIn with phone 
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: 9898989898
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
 *                     loginToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1Y2I3NjAxZDg2OTJhZjkzMGVkMTkiLCJhY3Rpb24iOiJhY2Nlc3MiLCJpYXQiOjE2NDU1OTc4MTksImV4cCI6MTY0NTY0MTAxOX0.Zve63LUqIOh3lwhBfgQLbVE73PgbaY0tCPQ7y2vQVsk
 *       500:
 *         description: Login failed
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
 * /signup-signIn/verify:
 *   post:
 *     summary: signup-signIn verify with otp 
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *               otp:
 *                 type: string
 *                 example: 1111
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
 *                     loginToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE1Y2I3NjAxZDg2OTJhZjkzMGVkMTkiLCJhY3Rpb24iOiJhY2Nlc3MiLCJpYXQiOjE2NDU1OTc4MTksImV4cCI6MTY0NTY0MTAxOX0.Zve63LUqIOh3lwhBfgQLbVE73PgbaY0tCPQ7y2vQVsk
 *       500:
 *         description: Login failed
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
 * /userProfile:
 *   post:
 *     summary: create newuser profile
 *     tags: [user]
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
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: abc 
 *                 lastName:
 *                   type: string
 *                   example: xyz 
 *                 email:
 *                   type: Number
 *                   example: abc@gmail.com
 *                 gender:
 *                   type: string
 *                   example: male  
 *                 age:
 *                   type: string
 *                   example:  20
 *     responses:
 *       200:
 *         description: signup success
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
 *                     firstname:
 *                       type: string
 *                       example: abc
 *                     lastName:
 *                       type: string
 *                       example: xyz 
 *                     email:
 *                       type: Number
 *                       example: abc@gmail.com
 *                     gender:
 *                       type: string
 *                       example: male  
 *                     age:
 *                       type: string
 *                       example:  20
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
 * /userProfile/get:
 *   get:
 *     summary: get userProfile
 *     tags: [user]
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
 *         description: user profile 
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
 *                     firstname:
 *                       type: string
 *                       example: abc
 *                     lastName:
 *                       type: string
 *                       example: xyz 
 *                     gender:
 *                       type: string
 *                       example: male  
 *                     age:
 *                       type: string
 *                       example:  20
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
 * /userProfile/update:
 *   post:
 *     summary: update userProfile
 *     tags: [user]
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
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: abc 
 *                 lastName:
 *                   type: string
 *                   example: xyz 
 *                 gender:
 *                   type: string
 *                   example: male  
 *                 age:
 *                   type: string
 *                   example:  20
 *     responses:
 *       200:
 *         description: signup success
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
 *                     firstname:
 *                       type: string
 *                       example: abc
 *                     lastName:
 *                       type: string
 *                       example: xyz 
 *                     gender:
 *                       type: string
 *                       example: male  
 *                     age:
 *                       type: string
 *                       example:  20
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
