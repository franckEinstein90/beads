/******************************************************************************
 * beads
 * by
 *  - FranckEinstein90
 *  **************************************************************************/
"use strict"

const express  = require('express')
const topLevel = require('@routes/topLevel').topLevel
const login = require('@users/login').login

const routingSystem = function({ app }){
     
    let router = express.Router()

    let routes = [ 
            { route: '/', handler: topLevel },
            { route: '/login', handler: login }]

    routes.forEach( r => router.get(r.route, r.handler) )
    app.use('/', router)

    return {

 
    }
}



module.exports = {
    routingSystem
}
