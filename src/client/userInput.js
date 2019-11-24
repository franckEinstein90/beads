/**********************************************************
 * FranckEinstein90 - Poet coder 
 * --------------------------------------
 *  Module userInput.js
 *  client side userInput 
 *  ******************************************************/
"use strict"

const OrbitControls = require('./orbitControls').OrbitControls

const userInput = (function(){
    let _cameraControls = null
    let _camera = null
    let _mouse = null
    let _container = null
    let _renderer = null
    let mouseDown = function( event ){
        event.preventDefault()
        alert('yo')
    }
    let clickEvent = function( event ){
        event.preventDefault()
        _mouse.x = ( event.clientX / _container.clientWidth) * 2 - 1
        _mouse.y = -( event.clientY / _container.clientHeight) * 2 + 1
        _rayCaster.setFromCamera(_mouse, _camera)
        let intersects = _rayCaster.intersectObjects( _scene.children )
        if ( intersects.length > 0 ){
            alert('he ther')
        }
        let evt = document.createEvent("MouseEvents")
        evt.initEvent('mouseup', true, true)
        _container.dispatchEvent(evt)        
     }
  
    return {
       init:function(container, camera, renderer){
        _container = container
        _renderer = renderer
        _camera = camera
        _cameraControls = new OrbitControls( _camera, _renderer.domElement)
       }, 
       addEventListener(event, render){
        _cameraControls.addEventListener(event, render)
       // _cameraControls.addEventListener('change', workspace.render)
       }
    }
})()

module.exports = {
    userInput
}
