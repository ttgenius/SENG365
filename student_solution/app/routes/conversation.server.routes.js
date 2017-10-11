var convs = require('../controllers/conversation.server.controller');

module.exports = function(app){
    app.route('/api/conversations')
        .get(convs.list)//List all convs
        .post(convs.create);//Add convs
        
                
    app.route('/api/conversations/:convId')
        .get(convs.read)//One conv
        .put(convs.update)//Update convs
        .delete(convs.delete);//Delete convs
        
    app.route('/api/conversations/:convId/messages/')
        .get(convs.listMessages)//List all messages of a conv
        .post(convs.createMessage)//Add message to a conv
    
    app.route('/api/conversations/:convId/messages/:messId')
        .get(convs.readMessage)//List one message from the conv
}