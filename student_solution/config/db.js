var mysql = require('mysql');
 
var state = {
  pool: null
};
 
exports.connect = function(done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    port: '6033',
    user: 'root',
    password: "secret",
    database: "mysql"
  });
  done();
};
 
exports.get = function() {
  return state.pool;
};
