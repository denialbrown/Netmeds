const express = require('express');
const router = express.Router();
const searchController = require("../../controller/user/searchController");
const middleware = require("../../helper/middleware")

router.get("/user/:search", [middleware.authenticateUser], searchController.searchProduct);
module.exports = router