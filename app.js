/******************************************************************************
 * beads
 * by FranckEinstein90
 ******************************************************************************/
"use strict"

require('module-alias/register');

const path = require('path');
const should = require('chai').should(); 

const configureExpressComponent = require('@server/express').configExpress; 
const setAppRouters = require('@server/routingSystem').setAppRouters; 
const setAppHttpRoot = require('@server/routingSystem').setHttpRoot;

const app = Object.create({
    name        : 'beads', 
    root        : __dirname, 
    staticFolder: path.join(__dirname, 'public')
});

require('@features').addFeatureSystem( app  )
.then( app => {
    app.addFeature({label: "stdout", method: msg => console.log(msg)});
    setAppRouters(app); 
    configureExpressComponent( app );
    setAppHttpRoot(app); 
    return app; 
})

.then( require('@appEngine').addComponent)

.then(app => {
    /* Set up the routes */
    app.should.have.property('routers'); 
    app.routers.forEach( path => {
        app.express.use(path.route, path.router)
    })   
    app.server.start(); //start server 
})
