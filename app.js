var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express()

const systemF = require('@progEngine/systemF').systemF

const pug = (n,l) => ({name:n, label:l})

const types = [
  {   htmlID:"NUM",
      color: 'yellow' ,
      pugs: [ pug('user-a','a'), 
              pug('user-b','b')] ,
      signatureDescription: ["NUM"], 
      pos: {left:20, top:150}},

  {   htmlID:"NUM-NUM", 
      color: 'red',
      pugs: [ pug('minus', '-'), 
              pug('cos', 'cos'), 
              pug('sin', 'sin') ],
      signatureDescription: ["NUM", "NUM"], 
      pos: {left:20, top:250}}, 

 {    htmlID:"NUM-NUM-NUM", 
      color: 'beige',
      pugs: [ pug('minus', '-'), 
              pug('mult', '*'), 
              pug('plus', '+'), 
              pug('div', '/') ],
      signatureDescription: ["NUM", ["NUM", "NUM"]], 
      pos: {left:20, top:350}}
]

const prog = new systemF.Program()

let initApp = function(){
// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
}

initApp()

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
