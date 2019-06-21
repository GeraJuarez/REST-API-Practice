const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const AccountSchema = new Schema({  
	email: String,
	password: String,
	_student:{ type: Schema.Types.ObjectId, ref:'Student' },
    _professor:{ type: Schema.Types.ObjectId, ref:'Professor'},
    _director:{ type: Schema.Types.ObjectId, ref:'Director' }
});

module.exports = mongoose.model('Account', AccountSchema);
