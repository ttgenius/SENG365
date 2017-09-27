/**
 * Created by yzh231 on 8/08/17.
 */
const User = require('../models/user.server.model');
exports.list = function(req,res){
    User.getAll(function(result){
        res.status(200).json(result);
    });
};

exports.create = function(req,res){
    let user_data = {
        "username":req.body.username
    };
    console.log(req.body)
    let user = user_data['username'].toString();
    let values = [[user]];
    User.insert(values,function(result){
        res.json(result);
    });
};

exports.read = function(req,res){
    let id = req.params.userId;
    User.getOne(id,function(result){
        res.json(result);
    });
};

exports.update = function(req,res){
    let id = req.params.userId;
    let user_data = {
        "username":req.body.username
    };
    let user = user_data['username'].toString();
    let values = [[user]];
    User.alter(values, id, function(result){
        res.json(result);
    });
};

exports.delete = function(req,res){
    let id = req.params.userId;
    User.remove(id,function(result){
        res.json(result);
    });
};

exports.userById = function(req,res){
    return null;
};

exports.listMsg = function(req,res){
    let id = req.params.id;
    User.getMsgs(id,function(result){
        res.json(result);
    });
};

exports.postMsg = function(req,res){
    let id = req.params.id;
    User.insertMsgs(id,function(result){
        res.json(result);
    });
};

exports.listOneMsg =  function(req,res){
    let cid = req.params.id;
    let mid = req.params.mid;
    User.getOneMsg(cid, mid, function(result){
        res.json(result);
    });
};




