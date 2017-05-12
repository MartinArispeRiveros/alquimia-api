'use strict';

var util = require('util');
var jwt = require('jwt-simple');
var secret = 'xxx';

const model = require('./../../db/knex');

module.exports = {
  login: login
};

function login(req, res) {
    var userName = req.body.user_name;
    var password = req.body.password;

    new model.User({ "user_name": userName, "password": password }).fetch({
        withRelated: ['client']
    }).then(function (user) {
        if (user) {
            var token = jwt.encode({ "user_id": user.get("user_id").toString() }, secret);
            user = user.toJSON();
            user.password = "";
            res.json({
                "token": token,
                "user": user
            });
        } else {
            res.status(401).send(
                {
                    "message": "Invalid credentials"
                }
            );
        }
    })
}