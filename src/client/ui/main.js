/******************************************************************************
 * 
 ******************************************************************************/
"use strict"; 
/******************************************************************************/
/******************************************************************************/


const ui = function( app ){
    app.ui = {}; 
    app.ui.frame = require('./frame/main.js').uiFrameFeature( app )
}


const resizeUI = function( app ){
    app.ui.visualElements.resize();
}

const addUiFeature = app => {
    ui( app );
    $( window ).resize(()=>{
        resizeUI( app ); 
    })
   return app; 
}

module.exports = {
    addUiFeature
}