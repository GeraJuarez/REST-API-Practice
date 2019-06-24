const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const GroupSchema = new Schema({  
    grade: Number,
    _student: { type: Schema.Types.ObjectId, ref:'Students' },
	_course:{ type: Schema.Types.ObjectId, ref:'Course' }
});

module.exports = mongoose.model('Grade', GroupSchema);
