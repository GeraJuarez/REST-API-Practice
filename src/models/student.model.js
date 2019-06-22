const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: String,
    career: String,
    semester: Number
});

module.exports = mongoose.model('Student', StudentSchema);
