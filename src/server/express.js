/******************************************************************************
 * beads 
 * by FranckEinstein90
 *  **************************************************************************/
"use strict"

/*****************************************************************************/
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('express-handlebars');
/*****************************************************************************/


const configViewSystem = function({
    /* configures handlebar system */
    app,
    layoutsDir,
    partialsDir
}) {
    app.express.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir,
        partialsDir
    }));
    app.express.set('view engine', 'hbs');
}

const configExpress = function( app ){
    //configures express
    app.express = express();  
    configViewSystem({
        app,     
        layoutsDir:  path.join(app.root,'views','layouts/'),
        partialsDir: path.join(app.root,'views','partials/')
    })

    app.express.use(cookieParser());
    app.express.use(express.json())
    app.express.use(express.urlencoded({
        extended: false
    }))

    app.express.use(express.static(app.staticFolder))

    return app
}

module.exports = {
   configExpress 
}
