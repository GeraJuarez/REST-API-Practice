const Classroom = require('../models/classroom.model');

exports.classroomCreate = function (req, res) {
    let classroom = new Classroom(
        {
            name: req.body.name,
            location: req.body.location
        }
    );

	classroom.save(function (err) {
		if (err) {
            return res.status(500).send("There was a problem creating")
		}
        res.status(200).send(classroom);
	});
};

exports.classroomGetAll = function (req, res) {
    Classroom.find({}, function (err, classroom) {
        if (err) { 
            return res.status(500).send("There was a problem finding");
        }
        res.status(200).send(classroom);
    });
};

exports.classroomGetById = function (req, res) {
    Classroom.findById(req.params.id, function (err, classroom) {
        if (err) {
            return res.status(500).send("There was a problem finding");
        }
        if (!classroom) {
            return res.status(404).send("No classroom found.");
        }
        res.status(200).send(classroom);
    });
};

exports.classroomDelete = function (req, res) {
    Classroom.findByIdAndRemove(req.params.id, function (err, classroom) {
        if (err) {
            return res.status(500).send("There was a problem deleting the classroom.");
        }
        res.status(200).send("classroom: "+ classroom.name +" was deleted.");
    });
};

exports.classroomUpdate = function (req, res) {
    Classroom.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, classroom) {
        if (err) {
            return res.status(500).send("There was a problem updating the classroom.");
        }
        res.status(200).send(classroom);
    });
}
