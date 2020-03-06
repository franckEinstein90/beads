/******************************************************************************
 * beads
 * by FranckEinstein90
 ******************************************************************************/
"use strict"
require('module-alias/register')

const app = {
    name: 'beads'
}
require('@features').addFeatureSystem( app  )
.then( app => {
    app.addFeature({label: "stdout", method: msg => console.log(msg)})
    return app
})
.then( require('@appEngine').addComponent   )
.then(app => app.appEngine.run())
/*const createError = require('http-errors');


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

const routingSystem = 
      require('@server/routingSystem')
      .routingSystem({ app })

module.exports = app
*/