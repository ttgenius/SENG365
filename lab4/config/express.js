/**
 * Created by yzh231 on 8/08/17.
 */
const express = require('express'),
    bodyParser = require('body-parser');


//initialise express,sets up body-parser and return the app
module.exports = function(){
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    require('../app/routes/user.server.routes.js')(app);
    return app;
}