var express = require('express'),
	bodyParser = require('body-parser');
 
module.exports = function(){
	var app = express();
 
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	
	require('../app/routes/user.server.routes.js')(app);
	
	require('../app/routes/conversation.server.routes.js')(app);
	
	return app;
};
