var db = require('./config/db'),
	express = require('./config/express');
 
var app = express();
var port = process.env.PORT || 80;
 
// Connect to MySQL on start
db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    app.listen(3000, function() {
      console.log('Listening on port: ' +3000);
    });
  }
});
