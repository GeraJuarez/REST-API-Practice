const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const UserSchema = new Schema({  
	name: String,
	email: String,
	password: String,
	_userA:{ type: Schema.Types.ObjectId, ref:'UserA' },
	_userB:{ type: Schema.Types.ObjectId, ref:'UserB' }
});

module.exports = mongoose.model('User', UserSchema);
