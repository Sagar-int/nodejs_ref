const express = require('express');
const app = express();
const PORT = 5000 || process.env
const router = require("./routes.js")
app.use(router)

app.set("view engine", 'ejs')

app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
})