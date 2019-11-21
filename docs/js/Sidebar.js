/**
 * @author mrdoob / http://mrdoob.com/
 */

var Sidebar = function ( editor ) {

	var strings = editor.strings;
	var container = new UI.TabbedPanel();
	container.setId( 'sidebar' );

	var scene = new UI.Span().add(
		new Sidebar.Scene( editor ),
		new Sidebar.Properties( editor ),
	)

	var project = new Sidebar.Project( editor );

	container.select( 'scene' );
	return container;

};
