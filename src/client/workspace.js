/**********************************************************
 * FranckEinstein90 - Poet coder 
 * --------------------------------------
 *  Module workspace.js
 *  client side workspace engine
 *  ******************************************************/
"use strict"

const THREE = require('three')
const userInput = require('./userInput').userInput
const shapes = require('./shapes').shapes

const beadTypes = {
    brick: "brick",
    perl: "perl",
    connect: "connect"
}


const beads = (function() {

    return {
        Bead: class {
            constructor(scene, coords, beadType) {
                this.coords = coords
                this.type = (typeof beadType === 'undefined') ? beadTypes.perl : beadType
                this.threeObj = null
                if (this.type === beadTypes.perl) {
                    this.threeObj = shapes.makeBall(scene, coords)
                } else if (this.type === beadTypes.brick) {
                    this.threeObj = shapes.makeBrick(scene, coords)
                } else {
                    throw ('end of the world')
                }
            }
        }

    }
})()





const Connection = function(scene, ball1, ball2) {
    this.origin = ball1
    this.target = ball2
    let geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(ball1.coords.x, ball1.coords.y, ball1.coords.z),
        new THREE.Vector3(ball2.coords.x, ball2.coords.y, ball2.coords.z)
    )
    let material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    })
    let line = new THREE.Line(geometry, material)
    scene.add(line)
}


const prog = (function() {
    let _scene = null
    let programRoot = null
    let floors = 2
    let intervalV = 20

    return {
        init: function(scene) {
            _scene = scene
            let intervalH = 30
            programRoot = new beads.Bead(_scene, {
                x: 10,
                y: floors * intervalV,
                z: 10 
            })
               
            let ball1a = new beads.Bead(_scene, {
                x: programRoot.coords.x - intervalH/2, 
                y: programRoot.coords.y - intervalV,
                z: 10
            })
            let connection1a = new Connection(_scene, ball1a, programRoot) 
            let ball1b = new beads.Bead(_scene, {
                x: programRoot.coords.x + intervalH/2, 
                y: programRoot.coords.y - intervalV,
                z: 10
            })
            let connection1b = new Connection(_scene, ball1b, programRoot) 
       }
    }
})()


const workspace = (function() {

    let _scene = new THREE.Scene()
    _scene.background = new THREE.Color('skyblue')
    _scene.add(new THREE.AmbientLight(0xf0f0f0))


    let _renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    let _rayCaster = new THREE.Raycaster()
    let _container = null
    let _camera = null

    let initPlane = function() {

        let gridHelper = new THREE.GridHelper(100, 100)
        gridHelper.position.y = 1
        gridHelper.material.opacity = 0.25
        gridHelper.material.transparent = true
        _scene.add(gridHelper)

        let planeGeometry = new THREE.PlaneBufferGeometry(100, 100)
        planeGeometry.rotateX(-Math.PI / 2)
        let planeMaterial = new THREE.ShadowMaterial({
            opacity: 0.2
        })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.position.y = 0
        _scene.add(plane)
    }
    let initCamera = function() {
        _camera = new THREE.PerspectiveCamera(
            60,
            _container.clientWidth / _container.clientHeight,
            1,
            10000)
        _camera.position.set(100, 100, 100)
        _camera.lookAt(0, 0, 0)

    }

    return {

        init: function() {
            _container = document.querySelector('#scene-container')
            _renderer.setSize(_container.clientWidth, _container.clientHeight)
            _renderer.setPixelRatio(window.devicePixelRatio)
            _renderer.shadowMap.enabled = true
            _container.appendChild(_renderer.domElement)
            _rayCaster = new THREE.Raycaster()
            initCamera()

            userInput.init(_container, _camera, _renderer)
            userInput.addEventListener('change', workspace.render)
            workspace.initLights()
            prog.init(_scene)
            initPlane()
            workspace.render()
            return true
        },

        initLights: function() {
            let ambientLight, directionalLight
            ambientLight = new THREE.AmbientLight(0x606060)
            _scene.add(ambientLight)

            directionalLight = new THREE.DirectionalLight(0xffffff)
            directionalLight.castShadow = true
            directionalLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 200))
            _scene.add(directionalLight)

        },

        render: function() {
            if (this.intersectedObject === undefined) {
                this.intersectedObject = null
            }
            _renderer.render(_scene, _camera)
        }
    }

})()

module.exports = {
    workspace
}
