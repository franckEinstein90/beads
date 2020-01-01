var express = require('express');
var router = express.Router();



const redirectLogin = function(req, res, next){
    if( !req.session.userID ) {
        res.redirect('/login')
    }
    else{
        next()
    }
}

router.get('/home', redirectLogin, function(req, res, next){
    res.render('home')
})

router.get('/login', function(req, res, next){
   res.render('login')

})

router.get('/register', function(req, res, next){


})

router.post('/login', function(req, res, next){


})

router.post('/register', function(req, res, next){


})


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Plug' });
});

module.exports = router;
