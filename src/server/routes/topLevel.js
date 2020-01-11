/******************************************************************************
 * beads
 * by
 *  - FranckEinstein90
 *  **************************************************************************/
"use strict"

const topLevel = function(req, res, next) {

      let userStatus = {
            authenticated: false 
      }

      res.render('index', { 
            title: 'beads', 
            userStatus
      })

}

module.exports = {
    topLevel
}


