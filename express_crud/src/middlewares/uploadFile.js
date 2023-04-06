const express = require('express');
const multer = require('multer');
const tesseract = require("node-tesseract-ocr")
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const User = require('../modules/user.module');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/images'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
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



module.exports = upload;