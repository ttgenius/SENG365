var db = require('../../config/db.js');

exports.getAll = function(done){
    db.get().query('SELECT * FROM Conversations', function (err, rows) {
              if (err) return done({"ERROR": "Error selecting"});
              return done(rows);
      });
};

exports.insert = function(conv_name, done){
    var values = [conv_name];
  
  db.get().query('INSERT INTO Conversations (convo_name) VALUES ?', values, function(err, result) {
    if (err) return done(err);
    
    done(result);
  });
};

exports.alter = function(conv_name, convId, done){
    var values = [conv_name];
  
  db.get().query("UPDATE Conversations SET convo_name='" + values + "' WHERE convo_id = ?", convId, function (err, rows) {
    if (err) return done(err);
    done(rows);
  })
};

exports.remove = function(convId, done){
  db.get().query('DELETE FROM Conversations WHERE convo_id = ?', convId, function (err, rows) {
    if (err) return done(err);
    done(rows);
  })
};

exports.getOne = function(convId, done){
    db.get().query('SELECT * FROM Conversations WHERE convo_id = ?', convId, function (err, rows) {
     if (err) return done(err);
     done(rows);
    });
};

exports.getAllMessages = function(convId, done){
    db.get().query('SELECT * FROM Messages WHERE convo_id = ?', convId, function (err, rows) {
     if (err) return done(err);
     done(rows);
    });
};

exports.insertMessage = function(convId, user_data, done){
    var user = user_data['user_id'].toString();
        
    var values = [
        [user, convId],
    ];
  
  db.get().query('INSERT INTO Messages (user_id, convo_id) VALUES ?', [values], function(err, result) {
    if (err) return done(err);
    done(result);
  });
};

exports.getOneMessage = function(convId, messId, done){
    db.get().query("SELECT * FROM Messages WHERE convo_id = " + convId + " AND message_id = ?", messId, function (err, rows) {
     if (err) return done(err);
     done(rows);
    });
};