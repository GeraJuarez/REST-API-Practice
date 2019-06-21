const Course = require('../models/course.model');

exports.courseCreate = function (req, res) {
    let course = new Course(
        {
            name: req.body.name,
            hasProject: req.body.hasProject,
            semesterLevel: req.body.semesterLevel,
            maxFailingGrade: req.body.maxFailingGrade
        }
    );

	course.save(function (err) {
		if (err) {
            return res.status(500).send("There was a problem creating")
		}
        res.status(200).send(course);
	});
};

exports.courseGetAll = function (req, res) {
    Course.find({}, function (err, course) {
        if (err) { 
            return res.status(500).send("There was a problem finding");
        }
        res.status(200).send(course);
    });
};

exports.courseGetById = function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            return res.status(500).send("There was a problem finding");
        }
        if (!course) {
            return res.status(404).send("No course found.");
        }
        res.status(200).send(course);
    });
};

exports.courseDelete = function (req, res) {
    Course.findByIdAndRemove(req.params.id, function (err, course) {
        if (err) {
            return res.status(500).send("There was a problem deleting the course.");
        }
        res.status(200).send("course: "+ course.name +" was deleted.");
    });
};

exports.courseUpdate = function (req, res) {
    Course.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, course) {
        if (err) {
            return res.status(500).send("There was a problem updating the course.");
        }
        res.status(200).send(course);
    });
}
