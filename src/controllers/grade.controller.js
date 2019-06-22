const Grade = require('../models/grade.model');

exports.create = function (req, res) {
    let grade = new Grade(
        {
            grade: req.body.grade,
            _student: req.body.students,
            _course: req.body.course
        }
    );

	grade.save(function (err) {
		if (err) {
            return res.status(500).send(err);
		}
        res.status(200).send(grade);
	});
};

exports.getAll = function (req, res) {
    Grade.find({})
    .populate('_student')
    .populate('_course')
    .exec(function (err, grade) {
        if (err) { 
            return res.status(500).send("There was a problem finding");
        }
        res.status(200).send(grade);
    });
};

exports.getById = function (req, res) {
    Grade.findById(req.params.id, function (err, grade) {
        if (err) {
            return res.status(500).send("There was a problem finding");
        }
        if (!grade) {
            return res.status(404).send("No grade found.");
        }
        res.status(200).send(grade);
    });
};

exports.delete = function (req, res) {
    Grade.findByIdAndRemove(req.params.id, function (err, grade) {
        if (err) {
            return res.status(500).send("There was a problem deleting the grade.");
        }
        res.status(200).send("grade deleted");
    });
};

exports.update = function (req, res) {
    Grade.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, grade) {
        if (err) {
            return res.status(500).send("There was a problem updating the grade.");
        }
        res.status(200).send(grade);
    });
}
