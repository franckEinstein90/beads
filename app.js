/******************************************************************************
 * beads
 * by
 *  - FranckEinstein90
 *  **************************************************************************/

var createError = require('http-errors');


//express set up
const express = require('express')
const session = require('express-session')




var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const viewSystem = require('@server/views/views.js').viewSystem
viewSystem.configure(__dirname, app)

const setUserSessionSystem = function(){
    app.use( session ({
        secret: 'whatdafuckisthat', 
        cookie: {
            maxAge: 50 * 40 * 100
        }   
    }))
}

setUserSessionSystem()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const router = express.Router()

router.get('/', function(req, res, next) {
  
  let userStatus = {
    authenticated: false 
  }

  res.render('index', { 
            title: 'beads', 
            userStatus
  })

})

router.get('/login', (req, res)=>res.send('y'))


app.use('/', router)



//app.use('/login', require('./routes/auth'))
//app.use('/users', require('./routes/users'))
//app.use('/', require('./routes/index'))
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
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
*/
module.exports = app
