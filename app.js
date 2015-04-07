// Load modules
var express = require('express'),
fs = require('fs'),
http = require('http'),
bodyParser = require('body-parser');

// Configure global path
global.__base = __dirname + '/';

// Load configs
var config = require(__base + 'app/config');

// Load controllers
var webhooks = require(__base + 'app/webhooks');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
  next();
});

// Render views
app.use(express.static('www'));

// Register webhooks route
app.route('/github').post(webhooks.github);

app.set('http-port', process.env.PORT || 5042);

// HTTP
http.createServer(app).listen(app.get('http-port'), function () {
  console.log('Express HTTP server listening on port ' + app.get('https-port'));
});
