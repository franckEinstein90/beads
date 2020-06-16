/*****************************************************************************/
"use strict";

/*****************************************************************************/
const sizeToViewport = require('./sizeToViewport').sizeToViewport;
const Frame = require('./Frame').Frame; 
/*****************************************************************************/


let getRowColInfo  = function(elt, viewportTemplate){
    let pageLayoutName = viewportTemplate.name; 
    let rowColInfo = {};  
    let getValue = (info, defaultVal) => (info !== undefined && pageLayoutName in info) ? info[pageLayoutName] : defaultVal; 
    let rowInfo = elt.data('row'); 
    rowColInfo.row = getValue(rowInfo, 1) - 1; 

    let colInfo = elt.data('col'); 
    rowColInfo.col = getValue(colInfo, 1) - 1; 

    let vertSpanInfo = elt.data('vert-span');   //multiple cols? 
    rowColInfo.vertSpan = getValue(vertSpanInfo, 1)

    let horSpanInfo = elt.data('hor-span') ;
    rowColInfo.horSpan = getValue(horSpanInfo, 1); 

    return rowColInfo
}

const matchFrameScene = function(viewportName, csvViewportClientNames){
    let frames = csvViewportClientNames.split(/\s*,\s*/); 
    let sceneDesc = frames.find( frameDesc => {
        let s = frameDesc.split('_'); 
        return s[0] === viewportName;
    })
    let scene = {
        frameName: null, 
        index: NaN 
    }
    if(sceneDesc === undefined) return scene; 
    let splitDesc = sceneDesc.split('_');
    scene.frameName = splitDesc[0];
    if(splitDesc.length === 1) return scene;  
    scene.index = parseInt(splitDesc[1])
    return scene; 
}

const layoutWindowPanes = function({contentViewport , viewportTemplate, app}){
    app.currentPage = new Frame(viewportTemplate);
    $('.visual-elt').each( function(){
        let eltId = $(this).attr('id');
        console.log(`placing element ${eltId}`);
        let viewportClients = $(this).data('include-in-viewport');
        if( viewportClients ){ 
            let scene = matchFrameScene(viewportTemplate.name, viewportClients)
            if( scene.frameName ){ //if this viewport includes this elt
                let rowColInfo =  getRowColInfo( $(this), viewportTemplate) 
                let eltCss = sizeToViewport( $(this), contentViewport, viewportTemplate ); 
                app.currentPage.store(eltId, eltCss, rowColInfo, scene);
            }
            else{
                $( this ).hide();
            }
        }
    })
    app.currentPage.draw();
}

module.exports = {
    layoutWindowPanes
}