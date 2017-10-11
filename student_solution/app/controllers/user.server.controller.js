var User = require('../models/user.server.model');
 
exports.list = function(req, res){
	User.getAll(function(result){
		res.json(result);
	});	
};
 
exports.create = function(req, res){
	console.log("hitting");
	var user_data = {
            "username": req.body.username
        };

	var user = user_data['username'].toString();

	var values = [
            [user]
        ];
	
	User.insert(values, function(result){
		res.json(result);
	});	
};
 
exports.read = function(req, res){
	var id = req.params.userId;
	User.getOne(id, function(result){
		res.json(result);
	});		
};

 
exports.update = function(req, res){
	var id = req.params.userId;
	
	var user_data = {
            "username": req.body.username
        };

	var user = user_data['username'].toString();

	var values = [
            [user]
        ];
        
	User.alter(values, id, function(result){
		res.json(result);
	});		
};
 
exports.delete = function(req, res){
	var id = req.params.userId;
	User.remove(id, function(result){
		res.json(result);
	});		
};
/*
exports.userById = function(req, res){
	return null;
};
*/