/******************************************************************
 * 
 * 
 * 
 *****************************************************************/

"use strict";
/****************************************************************/
//given a viewport and a frame description, return 
//the coordinates and dimensions


const sizeToViewport = function( elt, contentViewport, contentFrame, options ){
        let posDim = {}

        let pageLayoutName = contentFrame.name;
        let getValue = (info, defaultVal) => (info !== undefined && pageLayoutName in info) ? info[pageLayoutName] : defaultVal; 

 
        let rowInfo = elt.data('row'); 
        posDim.row = getValue(rowInfo, 1) - 1; 

        let colInfo = elt.data('col'); 
        posDim.col = getValue(colInfo, 1) - 1; 

        let vertSpanInfo = elt.data('vert-span');   //multiple cols? 
        posDim.vertSpan = getValue(vertSpanInfo, 1)

        let horSpanInfo = elt.data('hor-span') ;
        posDim.horSpan = getValue(horSpanInfo, 1); 


        let eltCss ={
            width: contentViewport.width / contentFrame.format.cols * posDim.horSpan,  
            left: contentViewport.left + (contentViewport.width / contentFrame.format.cols) * posDim.col, 
            height: contentViewport.height / contentFrame.format.rows * posDim.vertSpan, 
            top : contentViewport.top + (contentViewport.height / contentFrame.format.rows ) * posDim.row
        };  
        return eltCss; 
}


module.exports = {
    sizeToViewport
}