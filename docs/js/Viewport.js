/**
 * @author mrdoob / http://mrdoob.com/
 */


const viewPort = (function(){
	let _signals = null
	let _renderer = null
	let _sceneHelpers = null
	let _camera = null
   let _raycaster = new THREE.Raycaster();
	let _mouse = new THREE.Vector2();

	let _initGrid = function(){
		let grid = new THREE.GridHelper( 100, 100, 0x444444, 0x888888 );
		_sceneHelpers.add( grid );
		let  array = grid.geometry.attributes.color.array;
		for ( var i = 0; i < array.length; i += 60 ) {
			for ( var j = 0; j < 12; j ++ ) {
				array[ i + j ] = 0.26;
			}
		}
	}
	return {
		init: function( editor ){
			_signals = editor.signals
			_sceneHelpers = editor.sceneHelpers
			_camera = editor.camera
			_initGrid()
		}, 
		getSignals: function() {
			return _signals
		}, 
	   getMousePosition: function( dom, x, y ) {
			let rect = dom.getBoundingClientRect();
			return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
		}, 
		getIntersects: function( point, objects ) {
			_mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
			_raycaster.setFromCamera( _mouse, _camera );
			return _raycaster.intersectObjects( objects );
		}
	}
})()


var Viewport = function ( editor ) {
	viewPort.init(editor)
	var container = new UI.Panel();
	container.setId( 'viewport' );
	container.setPosition( 'absolute' );

	container.add( new Viewport.Camera( editor ) );
	container.add( new Viewport.Info( editor ) );

	var renderer = null;
	var camera = editor.camera;
	var scene = editor.scene;
	var sceneHelpers = editor.sceneHelpers;
	var objects = [];

	var box = new THREE.Box3();
	var selectionBox = new THREE.BoxHelper();
	selectionBox.material.depthTest = false;
	selectionBox.material.transparent = true;
	selectionBox.visible = false;
	sceneHelpers.add( selectionBox );

	var objectPositionOnDown = null;
	var objectRotationOnDown = null;
	var objectScaleOnDown = null;

	var transformControls = new THREE.TransformControls( 
			  camera, 
			  container.dom )

	transformControls.addEventListener( 'change', function () {
		var object = transformControls.object;
		if ( object !== undefined ) {
			selectionBox.setFromObject( object );
			if ( editor.helpers[ object.id ] !== undefined ) {
				editor.helpers[ object.id ].update();
			}
			viewPort.getSignals().refreshSidebarObject3D.dispatch( object );
		}
		render();
	})

	transformControls.addEventListener( 'mouseDown', function () {
		var object = transformControls.object;
		objectPositionOnDown = object.position.clone();
		objectRotationOnDown = object.rotation.clone();
		objectScaleOnDown = object.scale.clone();
		controls.enabled = false;

	})

	transformControls.addEventListener( 'mouseUp', function () {
		var object = transformControls.object;
		if ( object !== undefined ) {
	   	if ( ! objectPositionOnDown.equals( object.position ) ) {
				editor.execute( new SetPositionCommand( editor, object, object.position, objectPositionOnDown ) );
			}
		controls.enabled = true;
		}
	})

	sceneHelpers.add( transformControls );

	var onDownPosition = new THREE.Vector2();
	var onUpPosition = new THREE.Vector2();
	var onDoubleClickPosition = new THREE.Vector2();

	function handleClick() {
		if ( onDownPosition.distanceTo( onUpPosition ) === 0 ) {
			var intersects = viewPort.getIntersects( onUpPosition, objects );
			if ( intersects.length > 0 ) {
				var object = intersects[ 0 ].object;
				if ( object.userData.object !== undefined ) {
					editor.select( object.userData.object );
				} else {
					editor.select( object );
				}
			} else {
				editor.select( null );
			}
			render();
		}
	}

	function onMouseDown( event ) {
		event.preventDefault();
		let array = viewPort.getMousePosition( 
				  	container.dom, 
				   event.clientX, 
				   event.clientY )
		onDownPosition.fromArray( array )
		document.addEventListener( 'mouseup', onMouseUp, false );
	}

	function onMouseUp( event ) {
		let array = viewPort.getMousePosition( 
				  	container.dom, 
				  	event.clientX, 
				  	event.clientY );
		onUpPosition.fromArray( array )
		handleClick()
		document.removeEventListener( 'mouseup', onMouseUp, false )
	}

	function onTouchStart( event ) {
		var touch = event.changedTouches[ 0 ];
		var array = viewPort.getMousePosition( container.dom, touch.clientX, touch.clientY );
		onDownPosition.fromArray( array );
		document.addEventListener( 'touchend', onTouchEnd, false );
	}

	function onTouchEnd( event ) {

		var touch = event.changedTouches[ 0 ];

		var array = viewPort.getMousePosition( container.dom, touch.clientX, touch.clientY );
		onUpPosition.fromArray( array );

		handleClick();

		document.removeEventListener( 'touchend', onTouchEnd, false );

	}

	function onDoubleClick( event ) {

		var array = viewPort.getMousePosition( container.dom, event.clientX, event.clientY );
		onDoubleClickPosition.fromArray( array );

		var intersects = getIntersects( onDoubleClickPosition, objects );

		if ( intersects.length > 0 ) {

			var intersect = intersects[ 0 ];

			signals.objectFocused.dispatch( intersect.object );

		}

	}

	container.dom.addEventListener( 'mousedown', onMouseDown, false );
	container.dom.addEventListener( 'touchstart', onTouchStart, false );
	container.dom.addEventListener( 'dblclick', onDoubleClick, false );

	// controls need to be added *after* main logic,
	// otherwise controls.enabled doesn't work.

	var controls = new THREE.EditorControls( camera, container.dom );
	controls.addEventListener( 'change', function () {
		viewPort.getSignals().cameraChanged.dispatch( camera );
	});


	viewPort.getSignals().editorCleared.add( function () {
		controls.center.set( 0, 0, 0 );
		render();
	})

	viewPort.getSignals().transformModeChanged.add( function ( mode ) {
		transformControls.setMode( mode );
	})

	viewPort.getSignals().snapChanged.add( function ( dist ) {
		transformControls.setTranslationSnap( dist );
	})

	viewPort.getSignals().spaceChanged.add( function ( space ) {
		transformControls.setSpace( space );
	})

	viewPort.getSignals().rendererChanged.add( function ( newRenderer ) {
		if ( renderer !== null ) {
			container.dom.removeChild( renderer.domElement );
		}

		renderer = newRenderer;
		renderer.autoClear = false;
		renderer.autoUpdateScene = false;
		renderer.gammaOutput = true;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( container.dom.offsetWidth, container.dom.offsetHeight );

		container.dom.appendChild( renderer.domElement );
		render();

	} );

	viewPort.getSignals().sceneGraphChanged.add( function () {
		render();
	} );

	viewPort.getSignals().cameraChanged.add( function () {
		render();
	})

	viewPort.getSignals().objectSelected.add( function ( object ) {
		selectionBox.visible = false;
		transformControls.detach();
		if ( object !== null && object !== scene && object !== camera ) {
			box.setFromObject( object );
			if ( box.isEmpty() === false ) {
				selectionBox.setFromObject( object );
				selectionBox.visible = true;
			}
			transformControls.attach( object );
		}
		render();
	})

	viewPort.getSignals().objectFocused.add( function ( object ) {

		controls.focus( object );

	} );

	viewPort.getSignals().geometryChanged.add( function ( object ) {

		if ( object !== undefined ) {

			selectionBox.setFromObject( object );

		}

		render();

	} );

	viewPort.getSignals().objectAdded.add( function ( object ) {
		object.traverse( function ( child ) {
			objects.push( child );
		})
	})

	viewPort.getSignals().objectChanged.add( function ( object ) {
		if ( editor.selected === object ) {
			selectionBox.setFromObject( object );
		}
		if ( object.isPerspectiveCamera ) {
			object.updateProjectionMatrix();
		}
		if ( editor.helpers[ object.id ] !== undefined ) {
			editor.helpers[ object.id ].update();
		}
		render()
	})

	viewPort.getSignals().objectRemoved.add( function ( object ) {
		controls.enabled = true; // see #14180
		if ( object === transformControls.object ) {
			transformControls.detach();
		}
		object.traverse( function ( child ) {
			objects.splice( objects.indexOf( child ), 1 );
		})
	})

	viewPort.getSignals().helperAdded.add( function ( object ) {
		objects.push( object.getObjectByName( 'picker' ) );
	})

	viewPort.getSignals().helperRemoved.add( function ( object ) {
		objects.splice( objects.indexOf( object.getObjectByName( 'picker' ) ), 1 );

	} );

	viewPort.getSignals().materialChanged.add( function ( material ) {
		render();
	});

	viewPort.getSignals().sceneBackgroundChanged.add( function ( backgroundColor ) {
		scene.background.setHex( backgroundColor );
		render();
	})

	viewPort.getSignals().viewportCameraChanged.add( function ( viewportCamera ) {
		if ( viewportCamera.isPerspectiveCamera ) {
			viewportCamera.aspect = editor.camera.aspect;
			viewportCamera.projectionMatrix.copy( editor.camera.projectionMatrix );
		} else if ( ! viewportCamera.isOrthographicCamera ) {
			throw "Invalid camera set as viewport";
		}
		camera = viewportCamera
		render()
	})

	//

viewPort.getSignals().windowResize.add( function () {
		editor.DEFAULT_CAMERA.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
		editor.DEFAULT_CAMERA.updateProjectionMatrix();
		camera.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( container.dom.offsetWidth, container.dom.offsetHeight );
		render();
	})

	viewPort.getSignals().showGridChanged.add( function ( showGrid ) {
		grid.visible = showGrid;
		render();
	} );

	var prevTime = performance.now();
	function animate( time ) {
		requestAnimationFrame( animate );
		var mixer = editor.mixer;
		if ( mixer.stats.actions.inUse > 0 ) {
			mixer.update( ( time - prevTime ) / 1000 );
			render();
		}
		prevTime = time;
	}

	requestAnimationFrame( animate );

	function render() {
		scene.updateMatrixWorld();
		renderer.render( scene, camera );
		if ( camera === editor.camera ) {
				sceneHelpers.updateMatrixWorld();
				renderer.render( sceneHelpers, camera );
		}
	}

	return container;
};
