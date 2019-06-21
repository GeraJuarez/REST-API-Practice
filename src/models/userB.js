const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const UserB = new Schema({
    school: String
});

module.exports = mongoose.model('UserB', UserB);