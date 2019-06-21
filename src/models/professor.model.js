const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
    name: String,
    specialty: String
});

module.exports = mongoose.model('Professor', ProfessorSchema);
