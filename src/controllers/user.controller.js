const User = require('../models/user.model');

exports.user_create = function (req, res) {
    let user = new User(
        {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            return res.status(500).send("There was a problem adding the information to the database.");
        }
        res.status(200).send(user);
    });
};

exports.user_get_all = function (req, res) {
    User.find({}, function (err, users) {
        if (err) { 
            return res.status(500).send("There was a problem finding the users.");
        }
        res.status(200).send(users);
    });
};

exports.user_get_by_id = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).send(user);
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem deleting the user.");
        }
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem updating the user.");
        }
        res.status(200).send(user);
    });
}