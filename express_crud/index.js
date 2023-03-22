const express = require("express");
const connect = require("./config/db");
const app = express();
var fs = require('fs')
var path = require('path')
const morgan = require('morgan')
const userController = require('./src/controllers/user.controller.js')
const PORT = 4000;

// app.use(morgan('combined')) //HTTP request logger middleware for node.js
 
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.use(express.json());
app.use('/user', userController)

app.listen(PORT, async () => {
    await connect()
    console.log(`Listening on the port: http://localhost:${PORT}`);
})