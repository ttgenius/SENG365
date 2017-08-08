/**
 * Created by yzh231 on 5/08/17.
 */
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    port: 6033,
    user: 'seng365',
    password: 'secret',
    database: 'lab3'
});

// con.connect(function(err){
//     if (err) throw err;
//     console.log("Connected!");
// });

// con.connect(function(err) {
//     if (err)throw err;
//     con.query("SELECT * FROM Users", function (err, result){
//         if (err) throw err;
//         console.log(result);
//     });
// });
con.connect(function(err){
     if (err) throw err;
     console.log("Connected!");
     let sql = "INSERT INTO Users (username) VALUES ?";
     let values = [['James'], ['Lottes'], ['Adrien'], ['Elske'], ['Alex']];
     con.query(sql,[values],function(err,result){
         if (err) throw err;
         console.log("NUMBER OF RECORDS INSERTED: " + result.affectedRows);
     });
 });




