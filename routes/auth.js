/******************************************************************************
 * beads
 * by
 *  - FranckEinstein90
 *  **************************************************************************/

"use strict"



const redirectLogin = function(req, res, next){
    if( !req.session.userID ) {
        res.redirect('/login')
    }
    else{
        next()
    }
}

router.get('/login', function(req, res, next){
   res.render('login')

})

router.post('/login', function(req, res, next){


})


router.get('/register', function(req, res, next){


})

router.post('/register', function(req, res, next){


})

module.exports = router

