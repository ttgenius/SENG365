var users = require('../controllers/user.server.controller');
 
module.exports = function(app){
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		next();
	});
	
	app.route('/api/users')
	   .get(users.list)
	   .post(users.create);
 
	app.route('/api/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);

};
