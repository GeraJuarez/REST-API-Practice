const bcrypt = require('bcryptjs');
const Account = require('../models/account.model');
const Professor = require('../models/professor.model');


exports.professorCreate = function (req, res) {
	var salt = bcrypt.genSaltSync();
	var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
    let newUser = new Professor(
        {
            name: req.body.name,
            speciality: req.body.speciality
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
                _professor: newUser._id
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

exports.professorGetAll = function (req, res) {
    Professor.find({}, function (err, users) {
        if (err) { 
            return res.status(500).send("There was a problem finding the users.");
        }
        res.status(200).send(users);
    });
};

exports.professorGetById = function (req, res) {
    Professor.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    });
};

exports.professorDelete = function (req, res) {
    Professor.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem deleting the user.");
        }
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
};

exports.professorUpdate = function (req, res) {
    Professor.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem updating the user.");
        }
        res.status(200).send(user);
    });
}
