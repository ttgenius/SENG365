/**
* Created by yzh231 on 28/07/17.
*/
const express = require('express');
const bodyParser = require('body-parser')
const data = require('./users.json');

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const users = data.users;
console.log(users[0]);

console.log(users[0].followers);

app.get('/users',function(req,res){
    res.send(users);
});

app.get('/users/:id',function(req,res){
    let id = req.params.id;
    let res_data = "No user";

    for (let user of users){
        if (id == user.id){
            res_data = user;
            break;
        }
    }
    res.send(res_data);
});

app.post('/users/', urlencodedParser, function(req,res){
    let user_data = req.body;

    users.push(user_data);
    res.send(users);
});

app.put('/users/:id',function(req,res) {
    let id = req.params.id;
    let user_data = req.body;
    //console.log(user_data);
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            users[uid]=user_data;
            break;
        }
    }
    res.send(user_data);
});

app.delete('/users/:id',function(req,res) {
    let id = req.params.id;
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            users.splice(uid, 1);// remove 1 item at index ‘uid’

        }
    }
    res.send(users);
});

app.post('/users/:id/follow/:fid',function(req,res) {
    let id = req.params.id;
    let fid = req.params.fid;
    for (let user of users){
        if (fid == user.id){
            let uid = users.indexOf(user);
            users[uid].followers.push(parseInt(id));
        }
    }
    res.send(users);
})

app.post('/users/:id/unfollow/:fid',function(req,res) {
    let id = req.params.id;
    let fid = req.params.fid;
    for (let user of users) {
        if (fid == user.id) {
            let uid = users.indexOf(user);
            users[uid].followers.pop(id);
        }
    }
    res.send(users);
});

app.get('/users/:id/viewfollowers',function(req,res){
    let id = req.params.id;
    let followers = "No followers";
    for (let user of users){
        if (id == user.id){
            let uid = users.indexOf(user);
            followers = users[uid].followers;
            break;
        }
    }
    res.send(followers);
});

app.post('/users/:id/posts/create/:content',function(req,res) {
    let id = req.params.id;
    let content = req.params.content ;
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            users[uid].posts.push(content);
        }
    }
    res.send(users);
});

app.get('/users/:id/posts/view',function(req,res) {
    let id = req.params.id;
    let posts = "No posts";
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            posts = users[uid].posts;
        }
    }
    res.send(posts);
});

app.get('/users/:id/posts/view/:postID',function(req,res) {
    let id = req.params.id;
    let post_id = req.params.postID;
    let post = "No content";
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            post = users[uid].posts[post_id];
        }
    }
    res.send(post);
});

app.put('/users/:id/posts/update/:postID/:content',function(req,res) {
    let id = req.params.id;
    let post_id = req.params.postID;
    let content = req.params.content;
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            users[uid].posts[post_id]= content;
            break;
        }
    }
    res.send(users);
});

app.post('/users/:id/post/delete/:postID',function(req,res) {
    let id = req.params.id;
    let post_id = req.params.postID;
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            users[uid].posts.pop(post_id);
        }
    }
    res.send(users);
});

app.get('/users/:id/posts/view/followers',function(req,res) {
    let id = req.params.id;
    let posts = {};
    let followers = "No followers";
    for (let user of users) {
        if (id == user.id) {
            let uid = users.indexOf(user);
            followers = users[uid].followers;
            console.log(followers)
            for (let follower of followers){
                let fid = users.indexOf(follower);
                console.log(follower);
                posts[fid].push(users[fid].posts);
            }
        break;
        }
    }
    res.send(posts);
});
app.listen(3000,function(){
    console.log("Example app listening on port 3000!");
});
