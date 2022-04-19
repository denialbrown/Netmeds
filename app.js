const express = require('express');
const app = express()
const fileupload = require('express-fileupload')
require("dotenv").config()
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require("mongoose");


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(fileupload())
app.use('/api', require("./routes/user/cart"));
app.use('/api', require("./routes/user/review"));
app.use('/api', require("./routes/user/search"));
app.use('/api', require("./routes/user/wishlist"));
app.use('/api', require("./routes/user/address"));
app.use('/api', require("./routes/user/user"));
app.use('/api', require("./routes/admin/product"));
app.use('/api', require("./routes/admin/category"));
app.use('/api', require("./routes/admin/subcategory"));
app.use("/uploads", express.static("./uploads"));

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:9000/api',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./swaggerDocuments/admin/*.js','./swaggerDocuments/user/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



var url = process.env.MONGODB_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, db) {

    if (err) throw err;
    app.listen(9000, () => {

        console.log('Server is up on PORT 9000');

    })

});


