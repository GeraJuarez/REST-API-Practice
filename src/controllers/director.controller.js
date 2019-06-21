const bcrypt = require('bcryptjs');
const Account = require('../models/account.model');
const Director = require('../models/director.model');


exports.directorCreate = function (req, res) {
	var salt = bcrypt.genSaltSync();
	var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
    let newUser = new Director(
        {
            name: req.body.name,
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
                _director: newUser._id
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

exports.directorGetAll = function (req, res) {
    Director.find({}, function (err, users) {
        if (err) { 
            return res.status(500).send("There was a problem finding the users.");
        }
        res.status(200).send(users);
    });
};

exports.directorGetById = function (req, res) {
    Director.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    });
};

exports.directorDelete = function (req, res) {
    Director.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem deleting the user.");
        }
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
};

exports.directorUpdate = function (req, res) {
    Director.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem updating the user.");
        }
        res.status(200).send(user);
    });
}
