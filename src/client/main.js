/******************************************************************************
 * beads
 * A programming IDE for portables
 * -------------------------------
 *
 *  client side entry point 
 *
 *  **************************************************************************/

"use strict"

$(function(){
    const app = {}
    require('../common/features').addFeatureSystem( app )
    require('./ui/ui.js').addUiFeature( app )

    let scene = require('./ui/threeDScene.js').scene
    scene.init()
    scene.render()
   
  
}) 

