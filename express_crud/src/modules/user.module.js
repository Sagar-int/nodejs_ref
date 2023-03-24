const mongoose = require('mongoose');   

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    mobile: {type: Number, required: true},
    city: {type: String, required: true},
    profile: {type: String}
},
{
    versionKey: false,
    timestamps: true
});

const User = mongoose.model('userdata', userSchema );

module.exports = User;
