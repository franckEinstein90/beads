/**
 * @author mrdoob / http://mrdoob.com/
 */


Sidebar.Project = function ( editor ) {

	var config = editor.config;
	var signals = editor.signals;
	var strings = editor.strings;

	var rendererTypes = {

		'WebGLRenderer': THREE.WebGLRenderer,
		'SVGRenderer': THREE.SVGRenderer,
		'RaytracingRenderer': THREE.RaytracingRenderer

	};

	var container = new UI.Span();
	var projectsettings = new UI.Panel();
	var titleRow = new UI.Row();
	var title = new UI.Input( config.getKey( 'project/title' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/title', this.getValue() );

	} );

	titleRow.add( new UI.Text( strings.getKey( 'sidebar/project/title' ) ).setWidth( '90px' ) );
	titleRow.add( title );

	projectsettings.add( titleRow );

	// Editable

	var options = {};

	for ( var key in rendererTypes ) {

		if ( key.indexOf( 'WebGL' ) >= 0 && System.support.webgl === false ) continue;

		options[ key ] = key;

	}

	var rendererTypeRow = new UI.Row();
	projectsettings.add( rendererTypeRow );
		  
	var rendererPropertiesRow = new UI.Row().setMarginLeft( '90px' );
	projectsettings.add( rendererPropertiesRow );

	//

	function updateRenderer() {

		createRenderer( 
				  rendererType.getValue(), 
				  rendererAntialias.getValue() );

	}

	function createRenderer( type, antialias, shadows ) {
	   let parameters, renderer
		rendererPropertiesRow.setDisplay( type === 'WebGLRenderer' ? '' : 'none' );
		parameters = {
			antialias: antialias
		}
		renderer = new rendererTypes[ type ]( parameters );
		if ( shadows && renderer.shadowMap ) {
			renderer.shadowMap.enabled = true;
		}
		signals.rendererChanged.dispatch( renderer );
	}

	createRenderer( 
			  config.getKey( 'project/renderer' ), 
			  config.getKey( 'project/renderer/antialias' ), 
			  config.getKey( 'project/renderer/shadows' ) );


	return container;

}
