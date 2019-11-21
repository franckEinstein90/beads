"use strict"

const THREE = require('three')
const OrbitControls = require('./orbitControls').OrbitControls


const shapes = (function(){
    let balls = []
    let objectLoader = new THREE.ObjectLoader()
    let ballTemplate = null
    objectLoader.load('models/plugModel.json', function (obj){
            ballTemplate = obj
     })
 
    return{

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


const Ball = function(scene, coords){
   this.coords = coords
   this.threeObj = shapes.makeBall(scene, coords) 
}


const Connection = function(scene, ball1, ball2){
    this.origin = ball1
    this.target = ball2
    let geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( ball1.coords.x, ball1.coords.y, ball1.coords.z),
        new THREE.Vector3( ball2.coords.x, ball2.coords.y, ball2.coords.z)
    )
    let material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    })
    let line = new THREE.Line( geometry, material )
    scene.add( line )
}

const scene = (function (){

    let _scene = new THREE.Scene()
    _scene.background = new THREE.Color( 'skyblue' )
    _scene.add( new THREE.AmbientLight( 0xf0f0f0 ) )

    let _renderer  = new THREE.WebGLRenderer( {antialias: true} )
    let _rayCaster = new THREE.Raycaster()
    let _container = null
    let _camera = null
    let _cameraControls = null
    let _mouse = new THREE.Vector2()
    
    let initPlane =  function(){

        let gridHelper = new THREE.GridHelper(100, 100)
        gridHelper.position.y = 1
        gridHelper.material.opacity = 0.25
        gridHelper.material.transparent = true
        _scene.add(gridHelper)

        let planeGeometry = new THREE.PlaneBufferGeometry(100, 100)
        planeGeometry.rotateX( - Math.PI / 2) 
        let planeMaterial = new THREE.ShadowMaterial( {opacity: 0.2} )
        let plane = new THREE.Mesh( planeGeometry, planeMaterial )
        plane.receiveShadow = true
        plane.position.y = 0
        _scene.add( plane ) 
     }
    let initCamera = function(){
        _camera = new THREE.PerspectiveCamera( 60, _container.clientWidth / _container.clientHeight, 1, 10000)
        _camera.position.set( 100, 100, 100)
        _camera.lookAt(0,0,0)
        _cameraControls = new OrbitControls( _camera, _renderer.domElement)
        _cameraControls.addEventListener('change', scene.render)
           
     } 
     let initBalls = function(){
        let ball1 = new Ball(_scene,  {x:-10, y:10, z:10})
        let ball2 = new Ball(_scene, {x:10, y:30, z:10})
        let connection12 = new Connection(_scene, ball1, ball2)
        let ball3 = new Ball(_scene, {x:30, y:10, z: 10}) 
        let connection32 = new Connection(_scene, ball3, ball2)
        let ball4 = new Ball(_scene, {x: 10, y: 50, z: 30})
        let ball5 = new Ball(_scene, {x:10, y:30,z:50})
        let connection45 = new Connection(_scene, ball4, ball5)
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
   
   return{

     init: function(){
        _container = document.querySelector('#scene-container')
        _renderer.setSize( _container.clientWidth, _container.clientHeight)
        _renderer.setPixelRatio( window.devicePixelRatio ) 
        _renderer.shadowMap.enabled = true
        _container.appendChild( _renderer.domElement )
        _rayCaster = new THREE.Raycaster()

        initCamera()
        initPlane()
        scene.initLights()
        initBalls()
        scene.render()
        //_container.onmousedown = clickEvent

     }, 

     initLights: function( ){
        let ambientLight, directionalLight 
        ambientLight = new THREE.AmbientLight( 0x606060 )
        _scene.add( ambientLight )

        directionalLight = new THREE.DirectionalLight(0xffffff)
        directionalLight.castShadow = true
        directionalLight.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera(70, 1, 200, 200 ))
        _scene.add( directionalLight)
        
     }, 

     render: function(){

        if( this.intersectedObject === undefined ){
            this.intersectedObject = null
        }

        /*_rayCaster.setFromCamera( _mouse, _camera )
        let intersects = _rayCaster.intersectObjects( _scene.children )
        if ( intersects.length === 0 ){
            _renderer.render(_scene, _camera)
            return 
        }
        if (this.intersectedObject === intersects[0].object){
             _renderer.render(_scene, _camera)
            return 
        }
        this.intersectedObject = intersects[0].object
        alert('hit something')*/
        _renderer.render(_scene, _camera)
     }
   }

})()

module.exports = {
    scene
}
