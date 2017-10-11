var Conv = require('../models/conversation.server.model');

exports.list = function(req, res){
    Conv.getAll(function(result){
		res.json(result);
	});	
};


exports.create = function(req, res){
    var conv_data = {
            "conv_name": req.body.conv_name
        };

	var conv = conv_data['conv_name'].toString();

	var values = [
            [conv]
        ];
	
	Conv.insert(values, function(result){
		res.json(result);
	});	
};


exports.update = function(req, res){
    var id = req.params.convId;
    
    var conv_data = {
            "conv_name": req.body.conv_name
        };

	var conv = conv_data['conv_name'].toString();

	var values = [
            [conv]
        ];
	
	Conv.alter(values, id, function(result){
		res.json(result);
	});	
};


exports.delete = function(req, res){
    var id = req.params.convId;
	Conv.remove(id, function(result){
		res.json(result);
	});
};


exports.read = function(req, res){
	var id = req.params.convId;
	Conv.getOne(id, function(result){
		res.json(result);
	});		
};

exports.listMessages = function(req, res){
    var id = req.params.convId;
	Conv.getAllMessages(id, function(result){
		res.json(result);
	});
};

exports.createMessage = function(req,res){
    var convId = req.params.convId;
    
    var user_data = {
        "user_id": req.body.user_id,
    };
    
	Conv.insertMessage(convId, user_data, function(result){
		res.json(result);
	});
};

exports.readMessage = function(req, res){
    var convId = req.params.convId;
    var messId = req.params.messId;
    
	Conv.getOneMessage(convId, messId, function(result){
		res.json(result);
	});
};