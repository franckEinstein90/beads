/******************************************************************************
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"
/*****************************************************************************/

const setAppRouters = function( app ){
   app.routers = [];
   return app;
}

const _appRootModule = function( app ) {
   let _router = require('express').Router()
   _router.get('/', (req,res)=>{
       let pageData = {
           title: 'Beads'
       }
       res.render('index', pageData)
   }) 

   return {
       router: _router 
   }
}
const setHttpRoot = function( app ){
   app.httpRoot = _appRootModule( app )
   app.routers.push({
       route: '/',
       router: app.httpRoot.router
   })
   return app
}

module.exports = {
  setAppRouters , 
  setHttpRoot
}