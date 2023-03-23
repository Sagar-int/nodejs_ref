const express = require("express");
const connect = require("./config/db");
const app = express();
var fs = require('fs')
var path = require('path')
const morgan = require('morgan') //HTTP request logger middleware for node.js
const helmet = require("helmet");
const rateLimit = require('express-rate-limit') //Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const userController = require('./src/controllers/user.controller.js')
const PORT = 4000;

// app.use(morgan('combined')) 

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//setup Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(helmet());
app.use('/api', limiter)
app.use(express.json());

app.use('/api', userController)

app.listen(PORT, async () => {
    await connect()
    console.log(`Listening on the port: http://localhost:${PORT}`);
})