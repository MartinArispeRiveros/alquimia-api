const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];

var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);
var db = {};

var User, Client;
User = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'user_id',
    client: function() {
        return this.hasMany(Client, 'client_id');
    },
});

Client = bookshelf.Model.extend({
    tableName: 'client',
    idAttribute: 'client_id',
    user: function(){
        return this.belongsTo(User, 'user_id');
    }
});

db.User = User;
db.Client = Client;
db.bookshelf = bookshelf;
db.knex = knex;

db.respondWithServerError = function respondWithServerError(err, res) {
    console.log(err);
    res.status(500);
    res.json({
        "code": err.code,
        "message": err.message
    });
};
module.exports = db;