/**
 * Created by yzh231 on 28/07/17.
 * The   app   starts   a   server   and   listens   on   port   3000   for   connections.   When   receiving   a   HTTP
 request   for   the   root   (‘/’)   resource,   the   app   responds   with   “Hello   World!”   For   every   other   path,
 it   will   respond   with   a   ‘404   Not   Found’   HTTP   response.
 */

const express = require('express');

const app = express();

app.get('/', function(req, res){
    res.send("Hello World!");
});

app.listen(3000,function(){
    console.log("Example app listening on port 3000!");
});
