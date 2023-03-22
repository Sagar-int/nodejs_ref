const express = require('express');
const router = express.Router()
const middleware = require("./middleware.js")
router.use(middleware)
router.get('/', async(req, res)=>{
    res.send('This is express server')
})

router.get('/about', async(req, res)=>{
    res.render('about',{
        title: "about page"
    })
})

router.get('/contact', async(req, res)=>{
    res.render('contact',{
        title: "contact page"
    })
})

module.exports = router;