/**
 * Created by yzh231 on 8/08/17.
 */
const users = require('../controllers/user.server.controller');

// const middleWare = function(req, res, next){
//     console.log(req.header)
//     next()
//     if (err) {
//         res.status(400).send("oh no!")
//     }
// }

module.exports = function(app){
    app.use(function (req,res,next) {
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next()
    });

    app.route('/api/users')
        .get(users.list)
        .post(users.create);
    app.route('/api/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
    app.route('/api/conversations/:id/messages')
        .get(users.listMsg)
        .post(users.postMsg);
    app.route('/api/conversations/:id/messages/:mid')
        .get(users.listOneMsg);
};

