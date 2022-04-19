/**
 * @swagger
 * /add/address:
 *   post:
 *     summary: Add adddress
 *     tags: [address]
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
 *               firstName:
 *                 type: string
 *                 example: abc 
 *               lastName:
 *                 type: string
 *                 example: xyz
 *               address:
 *                 type: string
 *                 example: street
 *               landMark:
 *                 type: string
 *                 example: landmark  
 *               city:
 *                 type: string
 *                 example: ahmedabad
 *               state:
 *                 type: string
 *                 example: gujrat
 *               pincode:
 *                 type: string
 *                 example: 382350
 *     responses:
 *       200:
 *         description: Address added successfully
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
 *                     firstName:
 *                       type: string
 *                       example: abc 
 *                     lastName:
 *                       type: string
 *                       example: xyz
 *                     address:
 *                       type: string
 *                       example: street
 *                     landMark:
 *                       type: string
 *                       example: landmark  
 *                     city:
 *                       type: string
 *                       example: ahmedabad
 *                     state:
 *                       type: string
 *                       example: gujrat
 *                     pincode:
 *                       type: string
 *                       example: 382350    
 *       500:
 *         description: failed
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
 * /get/address:
 *   get:
 *     summary: get address list
 *     tags: [address]
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
 *         description: Address added successfully
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
 *                     firstName:
 *                       type: string
 *                       example: abc 
 *                     lastName:
 *                       type: string
 *                       example: xyz
 *                     address:
 *                       type: string
 *                       example: street
 *                     landMark:
 *                       type: string
 *                       example: landmark  
 *                     city:
 *                       type: string
 *                       example: ahmedabad
 *                     state:
 *                       type: string
 *                       example: gujrat
 *                     pincode:
 *                       type: string
 *                       example: 382350    
 *       500:
 *         description: failed
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
 * /getaddress/{addressId}:
 *   get:
 *     summary: get address list
 *     tags: [address]
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
 *        name: addressId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45  
 *     responses:
 *       200:
 *         description: Address added successfully
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
 *                     firstName:
 *                       type: string
 *                       example: abc 
 *                     lastName:
 *                       type: string
 *                       example: xyz
 *                     address:
 *                       type: string
 *                       example: street
 *                     landMark:
 *                       type: string
 *                       example: landmark  
 *                     city:
 *                       type: string
 *                       example: ahmedabad
 *                     state:
 *                       type: string
 *                       example: gujrat
 *                     pincode:
 *                       type: string
 *                       example: 382350    
 *       500:
 *         description: failed
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
 * /update/address/{addressId}:
 *   post:
 *     summary: update adddress
 *     tags: [address]
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
 *        name: addressId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: abc 
 *               lastName:
 *                 type: string
 *                 example: xyz
 *               address:
 *                 type: string
 *                 example: street
 *               landMark:
 *                 type: string
 *                 example: landmark  
 *               city:
 *                 type: string
 *                 example: ahmedabad
 *               state:
 *                 type: string
 *                 example: gujrat
 *               pincode:
 *                 type: string
 *                 example: 382350
 *     responses:
 *       200:
 *         description: Address added successfully
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
 *                     firstName:
 *                       type: string
 *                       example: abc 
 *                     lastName:
 *                       type: string
 *                       example: xyz
 *                     address:
 *                       type: string
 *                       example: street
 *                     landMark:
 *                       type: string
 *                       example: landmark  
 *                     city:
 *                       type: string
 *                       example: ahmedabad
 *                     state:
 *                       type: string
 *                       example: gujrat
 *                     pincode:
 *                       type: string
 *                       example: 382350    
 *       500:
 *         description: failed
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
 * /delete/address/{addressId}:
 *   delete:
 *     summary: delete adddress
 *     tags: [address]
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
 *        name: addressId
 *        required: true
 *        default: 62395a01adb56e8f5964ea45  
 *     responses:
 *       200:
 *         description: delete address successfully
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
 *         description: failed
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