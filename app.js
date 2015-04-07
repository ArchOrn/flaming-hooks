// Load modules
var express = require('express'),
fs = require('fs'),
http = require('http'),
https = require('https'),
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

app.set('https-port', process.env.PORT || 5042);

// HTTPS
var options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
  ca: fs.readFileSync('./ssl/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};
https.createServer(options, app).listen(app.get('https-port'), function () {
  console.log('Express HTTPS server listening on port ' + app.get('https-port'));
});
