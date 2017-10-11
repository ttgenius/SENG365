var db = require('../../config/db.js');
 
exports.getAll = function(done){
  db.get().query('SELECT * FROM Users', function (err, rows) {
    if (err) {
      console.log(err);
      return done({"ERROR": "Error selecting"});
    }
    return done(rows);
  });
};


exports.getOne = function(userId, done){
  db.get().query('SELECT * FROM Users WHERE user_id = ?', userId, function (err, rows) {
    if (err) return done(err);
    done(rows);
  });
};


exports.insert = function(username, done){
  var values = [username];
  
  db.get().query('INSERT INTO Users (username) VALUES ?', values, function(err, result) {
    if (err) return done(err);
    
    done(result);
  });
};


exports.alter = function(username, userId, done){
  var values = [username];
  
  db.get().query("UPDATE Users SET username='" + values + "' WHERE user_id = ?", userId, function (err, rows) {
    if (err) return done(err);
    done(rows);
  })
};
 
exports.remove = function(userId, done){
  db.get().query('DELETE FROM Users WHERE user_id = ?', userId, function (err, rows) {
    if (err) return done(err);
    done(rows);
  })
};
