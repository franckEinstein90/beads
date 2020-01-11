/******************************************************************************
 * beads
 * A programming IDE for portables
 * -------------------------------
 *
 * camera.js 
 *
 *  **************************************************************************/

"use strict"

const Camera = function({

    THREE, 
    width, 
    height

    }){

        let camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
        camera.position.set( 100, 100, 100)
        camera.lookAt(0,0,0)
}

module.exports = {
    Camera
}
