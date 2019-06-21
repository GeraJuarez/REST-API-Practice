var jwt = require('jsonwebtoken');
var config = require('../config');

exports.has_token = function (req, res, next) {
  	var token = req.headers['x-access-token'];
  	if (!token) {
		return res.status(403).send({ auth: false, message: 'No token provided.' });
	}
    
  	jwt.verify(token, config.secret, function(err, decoded) {
    	if (err) {
      		return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    	}
      
    	// if everything good, save to request for use in other routes
    	req.userId = decoded.id;
    	next();
  });
}

exports.is_A = function (req, res, next) {
	var token = req.headers['x-access-token'];
  
	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) {
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		}

		if (!decoded.uA) {
			return res.status(403).send({ auth: false, message: 'No authorization' });
		}

		// if everything good, save to request for use in other routes
		req.userId = decoded.id;
		next();
	});
}