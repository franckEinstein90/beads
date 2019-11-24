/**********************************************************
 * FranckEinstein90 - Poet coder 
 * --------------------------------------
 *  Module shapes.js
 *  client side shapes engine
 *  ******************************************************/
"use strict"

const THREE = require('three')
const OrbitControls = require('./orbitControls').OrbitControls


const shapes = (function(){

    let objectLoader = new THREE.ObjectLoader()
    let ballTemplate = null
    let brickTemplate = null
    objectLoader.load('models/plugModel.json', function (obj){
            ballTemplate = obj
    })
    objectLoader.load('models/brickModel.json', function (obj){
            brickTemplate = obj 
    }) 
    return{
       makeBrick: function(scene, {x, y, z}){
            if(brickTemplate === null) alert('je')
            let brick = brickTemplate.clone()
            brick.castShadow = true
            brick.receiveShadow = true
            brick.position.set(x, y, z)
            brick.scale.set(10,10,10)
            scene.add(brick)
            return brick
       }, 
       makeBall: function(scene, {x, y, z}){
            let ball = ballTemplate.clone()
            ball.castShadow = true
            ball.receiveShadow = true
            ball.position.set(x, y, z)
            ball.scale.set(10,10,10)
            scene.add(ball)
            return ball
       }, 

       makeGroup: function(scene, ball1, ball2, ball3){
            shapes.makeBall(scene, ball1) 
            shapes.makeBall(scene, ball2)
            shapes.makeBall(scene, ball3) 
        }
    }
})()


module.exports = {
    shapes
}
