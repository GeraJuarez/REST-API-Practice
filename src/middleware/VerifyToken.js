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
      
    	req.accountId = decoded.id;
    	next();
  });
}


exports.isDirector = function (req, res, next) {
	var token = req.headers['x-access-token'];
  
	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) {
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		}

		if (!decoded.director) {
			return res.status(403).send({ auth: false, message: 'No authorization' });
		}

		req.accountId = decoded.id;
		req.userId = decoded.director;
		next();
	});
}
