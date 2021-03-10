var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var nodeCron = require('./scalabledriverprocess/cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/loadbalancing');
var benchmarkRouter = require('./routes/benchmark');
var formbenchmarkRouter = require('./routes/formbenchmark');
var loadbalancingRouter = require('./routes/loadbalancing');
var scalabledriverRouter = require('./routes/scalabledriver');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/benchmark', benchmarkRouter);
app.use('/formbenchmark', formbenchmarkRouter);
app.use('/loadbalancing', loadbalancingRouter);
app.use('/scalabledriver', scalabledriverRouter);


nodeCron.startScalableDriver();

var isProduction = process.env.NODE_ENV === 'production';
// Monggose
if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);
}

//Models
require('./models/Patient');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
