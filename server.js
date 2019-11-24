var express = require("express");
var bodyParser = require("body-parser");
var index = require('./routes/index');
var users = require('./routes/users');
var issue = require('./routes/issue');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var distDir = __dirname + "/dist/issuetracker/";
app.use(express.static(distDir));
app.set('views', __dirname+"/views/");
app.set('view engine', 'jade');
app.use('/', index);
app.use('/users', users);
app.use('/issue', issue);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;