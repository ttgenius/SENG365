/**
 * Created by yzh231 on 28/07/17.
 */

const express = require('express');

const app = express();

app.get('/', function(req, res){
    res.send("HTTP request: GET /");
});

app.put('/', function(req, res){
    res.send("HTTP request: PUT /");
});

app.post('/', function(req, res){
    res.send("HTTP request: POST /");
});

app.delete('/', function(req, res){
    res.send("HTTP request: DELETE /");
});

app.listen(3000,function(){
    console.log("Example app listening on port 3000!");
});