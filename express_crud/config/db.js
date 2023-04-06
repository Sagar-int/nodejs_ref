const mongoose = require('mongoose');
const config = require('config');

const dbUrl = config.get('database.url'); // 'mongodb://0.0.0.0:27017/demodb'

const connect = async ()=>{
    console.log('Connection Successfull');
    // return mongoose.connect('mongodb://127.0.0.1:27017/demodb')
    // return mongoose.connect('mongodb://0.0.0.0:27017/demodb')
    return mongoose.connect(dbUrl)
}

module.exports = connect;