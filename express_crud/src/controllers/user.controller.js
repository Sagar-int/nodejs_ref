const express = require('express');
const multer = require('multer');
const tesseract = require("node-tesseract-ocr")
const fs = require('fs');
const path = require('path');
const User = require('../modules/user.module');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/images'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});


router.post('/user', upload.single('profile'), async (req, res) => {
    try {
        const profile = (req.file) ? req.file.filename : null
        const { name, mobile, city } = req.body
        // const user = await User.create(req.body, profile);
        const user = new User({ name, mobile, city, profile });
        const data = user.save()
        res.status(201).send({ user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
})


// route for uploading images and parse it into text.
router.post('/upload', upload.single('img'), async (req, res) => {
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
    }

    tesseract
        .recognize(req.file.path, config)
        .then((text) => {
            console.log("Result:", text)
            res.status(201).json(text)
        })
        .catch((error) => {
            console.log(error.message)
        })
});

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
})

router.patch('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).send({ user });
    } catch (error) {
        console.log(error);
        res.status(404).send({ error });
    }
})

router.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOneAndDelete(id);
        res.status(201).send({ user });
    } catch (error) {
        res.status(505).send({ error });
    }
})

module.exports = router;