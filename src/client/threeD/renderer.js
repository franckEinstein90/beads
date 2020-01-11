/******************************************************************************
 * beads
 * A programming IDE for portables
 * -------------------------------
 *
 *  client side entry point 
 *
 *  **************************************************************************/

"use strict"

const renderer = function( THREE ){

    let _container = null 
    let _renderer = null

    return {
        
        config: function({
            container
            }){

            _container = container
            _renderer = new THREE.WebGLRenderer( {antialias: true} )
            _renderer.setSize( _container.clientWidth, _container.clientHeight)
            _renderer.setPixelRatio( window.devicePixelRatio ) 
        }, 

        render: function({
            scene, 
            camera
        }){
            _renderer.render(scene, camera)
        }, 

        domElement : _ => _renderer.domElement        
        
    }
}


module.exports = {
    renderer
}
