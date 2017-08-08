/**
 * Created by yzh231 on 5/08/17.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'seng365',
    password: 'secret',
    port: '6033',
    database:'lab3'
});

function get_users(req,res){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);
        connection.query("select * from Users", function(err,rows){
            connection.release();
            if(!err){
                res.json(rows);
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}
app.get("/users",function(req,res){
    get_users(req,res);
});

function post_users(req,res,user_data){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);

        let user = user_data['username'].toString();
        const sql = "INSERT INTO Users (username) VALUES ?";
        console.log(user);
        let values = [[user]];

        connection.query(sql,[values],function(err,result){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully inserted user"});
            }else{
                console.log(err);
                res.json({"ERROR":"Error inserting user"});
            }
        });
    connection.on('error',function(err){
        res.json({"ERROR": "Error in connection database"});
        return;
    });
  });
}

app.post('/users',function(req,res){
    var user_data = {
        "username": req.body.username};
    post_users(req,res,user_data);

});


//get all conversations
function get_conversations(req,res){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);
        connection.query("select * from Conversations", function(err,rows){
            connection.release();
            if(!err){
                res.json(rows);
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}
app.get("/conversations",function(req,res){
    get_conversations(req,res);
});

//get a single conversation
function get_conversation(req,res,id){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);
        connection.query("select * from Conversations WHERE convo_id = ?",[id],function(err,asdf){
            connection.release();
            if(!err){
                if(asdf.length===0){
                    res.status(405);
                    res.json({"ERROR": "no id in database"});
                    return;
                }
                res.json(asdf);
            }


        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}
app.get("/conversations/:id",function(req,res){
    get_conversation(req,res,req.params.id);
});

//post a new conversation
function post_conversation(req,res,conversation){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);

        let convo_name = conversation['convo_name'].toString();
        const sql = "INSERT INTO Conversations (convo_name) VALUES ?";
        console.log(convo_name);
        let values = [[convo_name]];

        connection.query(sql,[values],function(err,result){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully inserted user"});
            }else{
                console.log(err);
                res.json({"ERROR":"Error inserting user"});
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}

app.post('/conversations',function(req,res){
    var conversation = {
        "convo_name": req.body.convo_name};
    post_conversation(req,res,conversation);
});

//edit an existing conversation
function put_conversation(req,res,conversation,id){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);

        let convo_name = conversation['convo_name'];
        const sql = "UPDATE Conversations SET convo_name = ? WHERE convo_id = ?";
        console.log(convo_name);

        connection.query(sql,[[convo_name],id],function(err,result){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully updated conversation"});
            }else{
                console.log(err);
                res.json({"ERROR":"Error updating conversation"});
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}
app.put('/conversations/:id',function(req,res){
    var conversation = {
        "convo_name": req.body.convo_name};
    put_conversation(req,res,conversation,req.params.id);
});

//delete a conversation
function delete_conversation(req,res,id){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);

        const sql = "DELETE FROM Conversations WHERE convo_id = ?";
        connection.query(sql,[id],function(err,result){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully inserted user"});
            }else{
                console.log(err);
                res.json({"ERROR":"Error inserting user"});
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}

app.delete('/conversations/:id',function(req,res){
    delete_conversation(req,res,req.params.id);
});


//get all messages from a convo
function get_messsages(req,res,id){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);
        connection.query("select * from Messages,Conversations WHERE Conversations.convo_id = ? AND Messages.convo_id = Conversations.convo_id", [id], function(err,rows){
            connection.release();
            if(!err){
                res.json(rows);
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}
app.get("/conversations/:id/messages",function(req,res){
    get_messsages(req,res,req.params.id);
});

//get a single msg from a convo
function get_msg(req,res,convo_id,msg_id){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);

        const sql = "select * from Messages,Conversations WHERE Conversations.convo_id = ? AND Messages.convo_id = Conversations.convo_id AND Messages.message_id = ? ";

        connection.query(sql,[convo_id,msg_id],function(err,rows){
            connection.release();
            if (!err) {
                res.json(rows);
            }else{
                console.log(err);
                res.json({"ERROR":"Error getting user"});
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}

app.get("/conversations/:id/messages/:msg_id",function(req,res){

   get_msg(req,res,req.params.id,req.params.msg_id);

});

//add a new msg to convo
function post_message(req,res,id){
    pool.getConnection(function(err,connection){
        if (err){
            console.log(err);
            res.json({"ERROR": "Error in connection database"});
            return;
        }
        console.log('connected as id'+connection.threadId);

        const sql = "INSERT INTO Messages(convo_id) VALUES ?";

        connection.query(sql,[id],function(err,result){
            connection.release();
            if (!err) {
                res.json({"SUCCESS": "successfully inserted user"});
            }else{
                console.log(err);
                res.json({"ERROR":"Error inserting user"});
            }
        });
        connection.on('error',function(err){
            res.json({"ERROR": "Error in connection database"});
            return;
        });
    });
}

app.post('/conversations/:id/messages',function(req,res){
    post_message(req,res,req.params.id);
});

app.listen(5000,function(){
    console.log("Example app listening on port:"+ 3000);
});