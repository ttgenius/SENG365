/**
 * Created by yzh231 on 8/08/17.
 */
const User = require('../models/user.server.model');
exports.list = function(req,res){
    User.getAll(function(result){
        res.json(result);
    });
};

exports.create = function(req,res){
    let user_data = {
        "username":req.body.username
    };
    console.log(req.body.username)
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


