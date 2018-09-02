var knex = require('knex');

var db = knex({
  client: 'mysql',
  connection: {
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'b3df734847ac39',
    password: '16161f92',
    database : 'heroku_19021ef47f00f90'
  }
});

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
