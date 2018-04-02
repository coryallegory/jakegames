var _ = require('lodash');
var uuid = require('node-uuid');
var moment = require('moment');
var validator = require('validator');
var mustacheExpress = require('mustache-express');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var hostURL = "https://jakegames.herokuapp.com/";


var app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.get('/', function (req, res) {
  res.render('index', _.assign(headerAndFooterVars(req), {}));
});

app.use(express.static('private'));


/*
General app control goes below here
*/


/*
General app control goes above here
*/

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  if (host == "::") {
    host = "localhost"
    console.log("Running locally");
    app["runningLocally"] = true;

    var spawn = require('child_process').spawn;
    var child = spawn('open', ['http://localhost:'+port+'/']);
    child.on('error', function(err) {
      console.log('child_process error: ' + err);
    });
  }
  console.log('Listening at http://%s:%s', host, port);
});

process.on('SIGTERM', function () {
  server.close(function () {
    process.exit(0);
  });
});

