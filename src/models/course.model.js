const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const CourseSchema = new Schema({  
	name: String,
	hasProject: Boolean,
	semesterLevel: Number,
	maxFailingGrade: Number
});

module.exports = mongoose.model('Course', CourseSchema);
