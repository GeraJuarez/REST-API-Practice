const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const UserA = new Schema({
    class: String
});

module.exports = mongoose.model('UserA', UserA);
