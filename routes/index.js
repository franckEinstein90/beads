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

router.get('/home', redirectLogin, function(req, res, next){
    res.render('home')
})

module.exports = router;
