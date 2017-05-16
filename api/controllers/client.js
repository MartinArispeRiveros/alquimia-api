'use strict';

var util = require('util');
const model = require('./../../db/knex');

module.exports = {
  saveClient: save,
  updateClient: update,
  removeClient: remove,
  getOneClient: getOne,
  getAllClients: getAll
};

function save(req, res){
    new model.Client(req.body).save().then(function(client){
        res.json(client);
    })
}

function update(req, res){
    new model.Client(req.body).save().then(function(client){
        res.json(client);
    })
}

function remove(req, res) {
    new model.Client({ "client_id": req.swagger.params.id.value }).fetch().then(function (client) {
        var deletedClient = client.toJSON();
        client.destroy().then(() => {
            res.json(deletedClient);
        });
    })
}

function getOne(req, res) {
    new model.Client({ "client_id": req.swagger.params.id.value }).fetch().then(function (client) {
        res.json(client.toJSON());
    })
}

function getAll(req, res) {
    var filter  =  req.swagger.params.code_card.originalValue;
    var query = model.knex('client').select(model.knex.raw('*'));
    if (filter) {
        query.where(model.knex.raw('code_card'), '=', filter)
    }
    query.then(function (clients) {
        res.json(clients);
    })
}