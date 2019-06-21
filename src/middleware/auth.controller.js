var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var User = require('../models/user.model');
var UserA = require('../models/userA');
var UserB = require('../models/userB');

const EXPIRE_24_HRS = 86400;
// separate login
function isValidPassword(receivedPass, savedPass) {
	return bcrypt.compareSync(receivedPass, savedPass);
}

exports.register = function (req, res) {
	var salt = bcrypt.genSaltSync(); // using default parameters
	var hashedPassword = bcrypt.hashSync(req.body.password, salt);
	var newUser;

	if (req.body.type == 'A') {
		newUser = new UserA(
			{
				class : 'a class'
			}
		);
	} else {
		newUser = new UserB(
			{
				school : 'a school'
			}
		);
	}

	newUser.save(function (err) {
		if (err) {
            return res.status(500).send("There was a problem registering the user.")
		}
		var user;
		if (req.body.type == 'A') {
			user = new User(
				{
					name : req.body.name,
					email : req.body.email,
					password : hashedPassword,
					_userA: newUser._id
				}
			);
		} else {
			user = new User(
				{
					name : req.body.name,
					email : req.body.email,
					password : hashedPassword,
					_userB: newUser._id
				}
			);
		}

		user.save(function (err) {
			if (err) {
				return res.status(500).send("There was a problem registering the user.")
			}
			
			var token = jwt.sign({ id: user._id, uA: user._userA, uB: user._userB }, config.secret, {
				expiresIn: EXPIRE_24_HRS
			});
			res.status(200).send({ auth: true, token: token });
		});
	});
};

exports.get_me = function (req, res) {
	User.findById(req.userId, { password: 0 }, function (err, user) {
		if (err) {
			return res.status(500).send("There was a problem finding the user.");
		}
		if (!user) {
			return res.status(404).send("No user found.");
		}
		res.status(200).send(user);
	});
};

exports.login = function (req, res) {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			return res.status(500).send('Error on the server.');
		}
		if (!user) {
			return res.status(404).send('No user found.');
		}
		//var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!isValidPassword(req.body.password, user.password)) {
			return res.status(401).send({ auth: false, token: null });
		}
		
		var token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: EXPIRE_24_HRS
		});
		
		res.status(200).send({ auth: true, token: token });
	});
};

exports.logout = function (req, res) {
	res.status(200).send({ auth: false, token: null });
};


 /*
router.post('/register', function(req, res) {
  
	var hashedPassword = bcrypt.hashSync(req.body.password, 8);

	User.create({
		name : req.body.name,
		email : req.body.email,
		password : hashedPassword
	},
	function (err, user) {
		if (err) return res.status(500).send("There was a problem registering the user.")
		// create a token
		var token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});
		res.status(200).send({ auth: true, token: token });
	}); 
});


router.get('/me', VerifyToken, function(req, res, next) {

	User.findById(req.userId, { password: 0 }, function (err, user) {
		if (err) return res.status(500).send("There was a problem finding the user.");
		if (!user) return res.status(404).send("No user found.");
		res.status(200).send(user);
	});

});

router.post('/login', function(req, res) {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) return res.status(500).send('Error on the server.');
		if (!user) return res.status(404).send('No user found.');
		
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
		
		var token = jwt.sign({ id: user._id }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, token: token });
	});
});

router.get('/logout', function(req, res) {
	res.status(200).send({ auth: false, token: null });
});
*/