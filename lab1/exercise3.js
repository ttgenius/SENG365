/**
 * Created by yzh231 on 20/07/17.
 */
const http = require("http"), URL = require('url').URL;

http.createServer(function(request,response){
    const parameters = new URL(request.url,'http://localhost:8081').searchParams.toString();
    //write the response
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end('Here is your data: ' + parameters);
}).listen(8081);

