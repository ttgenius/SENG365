/**
 * Created by yzh231 on 5/08/17.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());

function connect(){
    let con = mysql.createConnection({
        host: 'localhost',
        port: 6033,
        user: 'seng365',
        password: 'secret',
        database: 'lab3'
    });
    return con;
}

app.get("/users",function(req,res){
    const con = connect();
    con.connect(function(err){
        if(!err){
            console.log("Connected to the database");
            con.query('SELECT * from Users', function(err,rows,fields){
                con.end();
                if (!err){
                    res.send(JSON.stringify(rows));
                }else{
                    console.log(err);
                    res.send({"ERROR": "Error getting users"});
                }
            });
        }else{
            console.log("Error connecting to database");
            res.send({"ERROR": "Error connecting to database"});
        }
    });
});

app.get("/users/:id",function(req,res){
    const con =connect();
    let id=req.params.id;
    con.connect(function(err) {
        if(!err){
            console.log("Connected to the database");
            con.query('SELECT * from Users WHERE user_id=?',[id],function(err,rows,fields){
                con.end();
                if (!err){
                    res.send(JSON.stringify(rows));
                }else{
                    console.log(err);
                    res.send({"ERROR": "Error getting users"});
                }

            });
         }else {
            console.log("Error connecting to database");
            res.send({"ERROR": "Error connecting to database"});
        }
    });
});

app.post("/users",function(req,res){
    let user_data = {
        "username": req.body.username
    };
    const con = connect();

    con.connect(function(err){
        if(!err) {
            console.log("Connected to the database");
            let user = user_data['username'].toString();
            const sql = "INSERT into Users(username) VALUES ?";

            let VALUES = [[user]];

            con.query(sql, [VALUES], function (err, result) {
                con.end();
                if (!err) {
                    res.send({"SUCCESS": "Successfully inserted user"});
                } else {
                    console.log(err);
                    res.send({"ERROR": "Error inserting users"});
                }
            });
        }else {
            console.log("Error connecting to database");
            res.send({"ERROR": "Error connecting to database"});}
    });
});

app.put("/users/:id",function(req,res){
    const con =connect();

    con.connect(function(err) {
        if(!err){
            console.log("Connected to the database");
            con.query('UPDATE Users SET username = ? WHERE user_id=?',[req.body.username,req.params.id],function(err,rows,fields){
                con.end();
                if (!err){
                    res.send(JSON.stringify(rows));
                }else{
                    console.log(err);
                    res.send({"ERROR": "Error getting users"});
                }

            });
        }else {
            console.log("Error connecting to database");
            res.send({"ERROR": "Error connecting to database"});
        }
    });
});

app.delete("/users/:id",function(req,res){
    const con =connect();

    con.connect(function(err) {
        if(!err){
            console.log("Connected to the database");
            con.query('DELETE FROM Users WHERE user_id = ?',[req.params.id],function(err,rows,fields){
                con.end();
                if (!err){
                    res.send(JSON.stringify(rows));
                }else{
                    console.log(err);
                    res.send({"ERROR": "Error getting users"});
                }

            });
        }else {
            console.log("Error connecting to database");
            res.send({"ERROR": "Error connecting to database"});
        }
    });
});


app.listen(3000,function(){
    console.log("Example app listening on port:"+ 3000);
});