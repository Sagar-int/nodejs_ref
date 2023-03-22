const express = require("express");
const connect = require("./config/db");
const app = express();

const userController = require('./src/controllers/user.controller.js')

app.use(express.json());
app.use('/user', userController)

const PORT = 4000

app.listen(PORT, async () => {
    await connect()
    console.log(`Listening on the port: http://localhost:${PORT}`);
})