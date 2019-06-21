const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const Account = require('../models/account.model');
const Director = require('../models/director.model'); 

var User = require('../models/user.model');

const EXPIRE_24_HRS = 86400;

function isValidPassword(receivedPass, savedPass) {
	return bcrypt.compareSync(receivedPass, savedPass);
}

exports.register = function (req, res) {
	var salt = bcrypt.genSaltSync(); // using default parameters
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

			var token = jwt.sign({ id: newAccount._id, director: newAccount._director }, config.secret, {
				expiresIn: EXPIRE_24_HRS
			});
			res.status(200).send({ auth: true, token: token });
		});
	});
};

exports.login = function (req, res) {
	Account.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			return res.status(500).send('Error on the server.');
		}
		if (!user) {
			return res.status(404).send('No user found.');
		}
		if (!isValidPassword(req.body.password, user.password)) {
			return res.status(401).send({ auth: false, token: null });
		}
		
		var token = jwt.sign(
			{
				id: user._id,
				director: user._director,
				professor: user._professor,
				student: user._student
			},
			config.secret,
			{
				expiresIn: EXPIRE_24_HRS
			}
		);
		
		res.status(200).send({ auth: true, token: token });
	});
};

exports.logout = function (req, res) {
	res.status(200).send({ auth: false, token: null });
};
