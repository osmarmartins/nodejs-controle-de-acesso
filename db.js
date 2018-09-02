var knex = require('knex');

var db = knex({
  client: 'mysql',
  connection: {
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'bf016c61466a71',
    password: 'c444a7c0',
    database : 'heroku_baf02b0fa31f705'
  }
});
// mysql://bf016c61466a71:c444a7c0@us-cdbr-iron-east-01.cleardb.net/heroku_baf02b0fa31f705?reconnect=true

/*
var db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password: 'prisma',
    database : 'autenticacao'
  }
});
*/

module.exports = db;
