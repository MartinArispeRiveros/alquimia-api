'use strict';

var util = require('util');
const model = require('./../../db/knex');

module.exports = {
  save: save,
  update: update,
  remove: remove,
  getOne: getOne,
  getAll: getAll
};

function save(req, res){
    new model.User(req.body).save().then(function(user){
        res.json(user);
    })
}

function update(req, res){
    new model.User(req.body).save().then(function(user){
        res.json(user);
    })
}

function remove(req, res) {
    new model.User({ "user_id": req.swagger.params.id.value }).fetch().then(function (user) {
        var deletedUser = user.toJSON();
        user.destroy().then(() => {
            res.json(deletedUser);
        });
    })
}

function getOne(req, res) {
    new model.User({ "user_id": req.swagger.params.id.value }).fetch().then(function (user) {
        res.json(user.toJSON());
    })
}

function getAll(req, res) {
    new model.User().fetchAll().then(function (users) {
        res.json(users.toJSON());
    })
}