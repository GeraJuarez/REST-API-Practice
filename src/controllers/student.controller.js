const bcrypt = require('bcryptjs');
const Account = require('../models/account.model');
const Student = require('../models/student.model');


exports.studentCreate = function (req, res) {
	var salt = bcrypt.genSaltSync();
	var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
    let newUser = new Student(
        {
            name: req.body.name,
            career: req.body.career,
            semester: req.body.semester
        }
    );

	newUser.save(function (err) {
		if (err) {
            return res.status(500).send("There was a problem registering the user.")
		}
		let newAccount = new Account(
            {
                email: req.body.email,
                password: hashedPassword,
                _student: newUser._id
            }
        );

		newAccount.save(function (err) {
			if (err) {
				return res.status(500).send("There was a problem registering the user.")
			}
			res.status(200).send(newUser);
		});
	});
};

exports.studentGetAll = function (req, res) {
    Student.find({}, function (err, users) {
        if (err) { 
            return res.status(500).send("There was a problem finding the users.");
        }
        res.status(200).send(users);
    });
};

exports.studentGetById = function (req, res) {
    Student.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    });
};

exports.studentDelete = function (req, res) {
    Student.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem deleting the user.");
        }
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
};

exports.studentUpdate = function (req, res) {
    Student.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem updating the user.");
        }
        res.status(200).send(user);
    });
}
