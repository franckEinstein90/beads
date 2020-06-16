/******************************************************************************
 * pardners 
 * by franckEinstein90
 * ---------------------------------------------------------------------------
 *
 * Cooperate, compete, or just survive
 * ***************************************************************************/
"use strict"
/*****************************************************************************/


let out = function ( msg ){
    console.log(msg)
}

const configureAppEngine = function( app ){
    return new Promise(resolve => {
        return resolve({
            run : function() {
                app.server.start()
                app.stdout('now running')
            } 
        })
    })
}

const addComponent = function( app ){

    return configureAppEngine( app )
    .then( appEngine => {
        app.addComponent({label:'appEngine'}) 
        app.appEngine.addFeature({label: 'run', method: appEngine.run})
        return app
    })

    //express framework
    .then( require('@server/http').addHttpServer )
    .then( app => {
        return app 
    })
}

module.exports = {
    addComponent
} 