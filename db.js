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

module.exports = db;
