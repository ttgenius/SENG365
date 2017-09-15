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

exports.getMsgs= function(id,done){
    db.get().query('select * from Messages,Conversations WHERE Conversations.convo_id = ? AND Messages.convo_id = Conversations.convo_id', id, function(err,rows){
        if (err) return done(err);
        done(rows);
    });
};

exports.insertMsgs = function(id,done){
    db.get().query('INSERT INTO Messages(convo_id) VALUES (?)',id, function(err,rows){
        if(err) return done (err);
        done(rows);
    });
};

exports.getOneMsg = function(cid,mid,done){
    db.get().query("select * from Messages,Conversations WHERE Conversations.convo_id = ? AND Messages.convo_id = Conversations.convo_id AND Messages.message_id = ? ",[cid,mid], function(err,rows){
        if(err) return done (err);
        done(rows);
    });
};