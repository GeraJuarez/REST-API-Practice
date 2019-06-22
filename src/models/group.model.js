const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const hourRegex = '^[0-24]:[0-59]$';

const GroupSchema = new Schema({  
    schedule: {
        startTime: String,
        endTime: String
    },
    name: {
        number: {type: String, match: /^[1-9]$/},
        letter: {type: String, match: /^[a-zA-Z]$/}
    },
    _students: [{ type: Schema.Types.ObjectId, ref:'Students' }],
	_course:{ type: Schema.Types.ObjectId, ref:'Course' },
    _professor:{ type: Schema.Types.ObjectId, ref:'Professor' },
    _classroom:{ type: Schema.Types.ObjectId, ref:'Classroom' }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true 
    }
});

GroupSchema.virtual('name.full').get(function () {
    return this.name.number + '' + this.name.letter;
});

module.exports = mongoose.model('Group', GroupSchema);
