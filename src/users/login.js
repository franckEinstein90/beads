/******************************************************************************
 * beads
 * by
 *  - FranckEinstein90
 *  **************************************************************************/
"use strict"


const login = function(req, res, next) {
    res.render('login', { 
        title: 'beads'
    })
}

module.exports = {
    login
}
