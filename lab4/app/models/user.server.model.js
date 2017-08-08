/**
 * Created by yzh231 on 8/08/17.
 */
const db = require('../../config/db.js');

exports.getAll = function(done){
    db.get().query('SELECT * FROM Users',function(err,rows){
        if (err) return done({"error": "Error selecting"});
        return done(rows);
    });
};

exports.getOne = function(userId,done){
    db.get().query('SELECT * FROM Users WHERE user_id = ?', userId, function(err,rows){
        if (err) return done(err);
        done(rows);
    });
};

exports.insert = function(username,done){
    let values = [username];
    db.get().query('INSERT INTO Users (username) VALUES ?',values,function(err,result){
        if (err) return done(err);
        done(result);
    });
};

exports.alter = function(username,userId,done){
    db.get().query('UPDATE Users SET username = ? WHERE user_id = ?',[username,userId],function(err,rows){
        if (err) return done(err);
        done(rows);
    });
};

exports.remove = function(userId,done){
    db.get().query('DELETE FROM Users WHERE user_id =  ?',userId,function(err,rows){
        if (err) return done(err);
        done(rows);
    });
};
