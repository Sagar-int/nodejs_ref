const express = require('express');
const { getUsers, addUser, editUser, deleteUser, filterUsers, imageTotext } = require('../controllers/user.controller');
const router = express.Router();
const Upload = require('../middlewares/uploadFile')

//Get All Users
router
    .route('/users').get(getUsers)

//Get All Filter Users
router
    .route('/users/filter').get(filterUsers)

//Add User
router
    .route("/user")
    .post(
        Upload.single('profile'),
        addUser
    );

//Edit User
router
    .route("/user/:id")
    .patch(
        editUser
    );

//Delete User
router
    .route("/user/:id")
    .patch(
        deleteUser
    );

//uploading images and parse it into text.
router
    .route("/upload")
    .post(
        Upload.single('img'),
        imageTotext
    );


module.exports = router;