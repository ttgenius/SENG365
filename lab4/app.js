/**
 * Created by yzh231 on 8/08/17.
 */

const db = require('./config/db');
const express = require('./config/express');

const app = express();

//connect to mysql on start
db.connect(function(err){
    if (err){
        console.log('Unable to connect to MySQL');
        process.exit(1);
    }else{
        app.listen(3000,function(){
            console.log('Listening on port: ' + 3000);
        });
    }
});