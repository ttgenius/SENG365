/**
 * Created by yzh231 on 20/07/17.
 */
const http = require("http"), URL = require('url').URL;
const queryString = require('querystring');

http.createServer(function(request,response){
    const qString = new URL(request.url,'http://localhost:8081').searchParams.toString();
    var dict = queryString.parse(qString);
    var items =['milk','bread','egg','flour'];
    console.log(dict);
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end('Here is your item: ' + items[dict.item_num]);
}).listen(8081);