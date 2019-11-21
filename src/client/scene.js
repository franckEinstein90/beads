"use strict"

const THREE = require('three')
const OrbitControls = require('./orbitControls').OrbitControls


const scene = (function (){
    let _scene, _container, _renderer, _camera, _cameraControls

    _scene = new THREE.Scene()
    _scene.background = new THREE.Color( 'skyblue' )

   return{
     init: function(){
        _container = document.querySelector('#scene-container')

        _renderer = new THREE.WebGLRenderer( {antialias: true} )
        _renderer.setSize( _container.clientWidth, _container.clientHeight)
        _renderer.setPixelRatio( window.devicePixelRatio ) 
        _container.appendChild( _renderer.domElement )

        scene.initCamera()
        scene.initGrid()
        scene.initLights()
        _cameraControls = new OrbitControls( _camera, _renderer.domElement)
        _cameraControls.addEventListener('change', scene.render)
        scene.render()
     }, 
     initCamera: function(){
        _camera = new THREE.PerspectiveCamera(45, 
            _container.clientWidth / _container.clientHeight, 1, 10000)
        _camera.position.set( 100, 100, 100)
        _camera.lookAt(0,0,0)
     },

     initGrid: function(){
        let gridHelper = new THREE.GridHelper(100, 100)
        _scene.add(gridHelper)

        var material = new THREE.LineBasicMaterial({
         color: 0x0000ff
         });

      var geometry = new THREE.Geometry();
      geometry.vertices.push(
         new THREE.Vector3( -10, 10, 10 ),
         new THREE.Vector3( 10, 30, 10 ),
         new THREE.Vector3( 30, 10, 10 )
      );
      var line = new THREE.Line( geometry, material );
      _scene.add( line );

      geometry = new THREE.Geometry();
      geometry.vertices.push(
         new THREE.Vector3( 10, 30, 10 ),
         new THREE.Vector3( 10, 50, 30 ),
         new THREE.Vector3( 10, 30, 50 )
      );
      line = new THREE.Line( geometry, material );
      _scene.add( line );


			let object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
			object.position.set( -10, 10, 10)
         _scene.add( object )

			object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
         object.position.set( 10, 30, 10)
         _scene.add( object )

 		   object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
         object.position.set( 30, 10, 10)
         _scene.add( object )

         object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
         object.position.set( 10, 50, 30)
         _scene.add( object )

         object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
         object.position.set( 10, 30, 50)
         _scene.add( object )
  		    		    		    		   
      }, 

     initLights: function( ){
        let ambientLight, directionalLight 
        ambientLight = new THREE.AmbientLight( 0x606060 )
        _scene.add( ambientLight )
        directionalLight = new THREE.DirectionalLight(0xffffff)
        _scene.add( directionalLight)
     }, 

     render: function(){
        _renderer.render(_scene, _camera)
     }
   }

})()

module.exports = {
    scene
}
