const tesseract = require("node-tesseract-ocr")
// const fs = require('fs');
// const PDFDocument = require('pdfkit');
// const path = require('path');
const User = require('../modules/user.module');

// // route for converting images to pdf.
// router.post('/convert-to-pdf', async (req, res) => {
//     const { filename } = req.body;
//     const imagePath = path.join(__dirname, `/public/images/${filename}`); // Replace with the path to your image
//     const pdfPath = path.join(__dirname, `/public/pdf/${filename}.pdf`); // 

//     const pdfDoc = new PDFDocument();
//     pdfDoc.pipe(fs.createWriteStream(pdfPath));
//     pdfDoc.image(imagePath, {
//         fit: [500, 500], // Adjust image size as needed
//         align: 'center',
//         valign: 'center'
//     });
//     pdfDoc.end();
//     res.send('PDF generated successfully');
// });


//Get all the Users
const getUsers = async (req, res) => {

    try {
        const user = await User.find({})
        res.status(200).json({
            status: 'success',
            results: user.length,
            user: user
        });
    } catch (error) {
        res.status(404).json({ message: 'Bad request', error });
    }

};

//Filter all the Users
const filterUsers = async (req, res) => {
    let c = req.query.city
    let m = req.query.mobile

    try {
        // const user = await User.find({ city: q }) //Way-1
        // const user = await User.find().where('city').equals(q) //Way-2
        // const user = await User.find().where('city').equals(c).where('mobile').equals(m) //Way-2
        const user = await User.find(req.query) //Way-3

        res.status(200).json({
            status: 'success',
            results: user.length,
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

//Create user
const addUser = async (req, res) => {
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
};

//Edit User
const editUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).send({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

//Edit User
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOneAndDelete(id);
        res.status(201).send({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
};


//uploading images and parse it into text.
const imageTotext = async (req, res) => {
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
    }

    tesseract
        .recognize(req.file.path, config)
        .then((text) => {
            res.status(201).json({ filename: req.file.filename, text });
        })
        .catch((error) => {
            console.log(error.message)
        })
};


module.exports = { getUsers, addUser, editUser, deleteUser, filterUsers , imageTotext };