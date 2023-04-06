const express = require("express");
const connect = require("./config/db");
const app = express();
var fs = require('fs')
var path = require('path')
const config = require('config');
const morgan = require('morgan') //HTTP request logger middleware for node.js
const helmet = require("helmet");
const cors = require('cors');
const rateLimit = require('express-rate-limit') //Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const userController = require('./src/controllers/user.controller.js')
const userRoute = require('./src/routes/user.route')

const port = config.get('server.port'); // 3000
const PORT = process.env.PORT || port;

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}




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
// app.use(morgan('combined', { stream: accessLogStream })); // this will create a access.log file 
app.use(helmet());
app.use(cors())
// app.use('/api', limiter)
app.use(express.json());



// Endpoints 
app.use('/api', userRoute);
// app.use('/api', userController)

// Handle errors.
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(PORT, async () => {
    await connect()
    console.log(`Listening on the port: http://localhost:${PORT}`);
})


module.exports = app