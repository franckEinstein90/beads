/******************************************************************************
 * beads
 * by
 *  - FranckEinstein90
 *  **************************************************************************/
"use strict"

const hbs = require('express-handlebars')
const viewSystem = (function(){

    return{
        configure : function( root, app ){

            app.engine('hbs', hbs({
                extname: 'hbs', 
                defaultLayout: 'main', 
                layoutsDir: root + '/views/layouts/', 
                partialsDir: root + '/views/partials/'

            }))
            app.set('view engine', 'hbs')
        }
    }

})()


module.exports = {
    viewSystem
}
