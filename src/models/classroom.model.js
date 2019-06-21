const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({  
	location: String,
	name: String
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
