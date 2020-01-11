/******************************************************************************
 * beads
 * A programming IDE for portables
 * -------------------------------
 *
 *  client side entry point 
 *
 *  **************************************************************************/

"use strict"

const THREE = require('three')
const renderer = require('./threeD/renderer').renderer(THREE)
const Scene = require('./threeD/scene').Scene
const Camera = require('./threeD/camera').Camera


$(function(){
   
    let container = document.querySelector('#scene-container')

    let camera = new Camera({ 
        THREE, 
        width: container.clientWidth, 
        height: container.clientHeight
    })

    renderer.config({ container })
    container.appendChild( renderer.domElement() )

    let scene = new Scene({
        THREE, 
        renderer, 
        camera
    })
    renderer.render(scene)

   //
   // scene.init()
   // scene.render()
   
  
}) 

