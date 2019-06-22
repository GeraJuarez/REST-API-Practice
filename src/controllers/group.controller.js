const Group = require('../models/group.model');

exports.create = function (req, res) {
    let group = new Group(
        {
            name: {
                number: req.body.number,
                letter: req.body.letter
            },
            schedule: {
                startTime: req.body.startTime,
                endTime: req.body.endTime
            },
            _students: req.body.students,
            _course: req.body.course,
            _professor: req.body.professor,
            _classroom: req.body.classroom
        }
    );

	group.save(function (err) {
		if (err) {
            return res.status(500).send(err);
		}
        res.status(200).send(group);
	});
};

exports.getAll = function (req, res) {
    Group.find({})
    .populate('_professor')
    .exec(function (err, group) {
        if (err) { 
            return res.status(500).send("There was a problem finding");
        }
        res.status(200).send(group);
    });
};

exports.getById = function (req, res) {
    Group.findById(req.params.id, function (err, group) {
        if (err) {
            return res.status(500).send("There was a problem finding");
        }
        if (!group) {
            return res.status(404).send("No group found.");
        }
        res.status(200).send(group);
    });
};

exports.delete = function (req, res) {
    Group.findByIdAndRemove(req.params.id, function (err, group) {
        if (err) {
            return res.status(500).send("There was a problem deleting the group.");
        }
        res.status(200).send("group" + group.name.full + "deleted");
    });
};

exports.update = function (req, res) {
    Group.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, group) {
        if (err) {
            return res.status(500).send("There was a problem updating the group.");
        }
        res.status(200).send(group);
    });
}
