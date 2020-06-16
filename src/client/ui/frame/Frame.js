/*****************************************************************************/
"use strict";

/*****************************************************************************/

const Scene = function({
    htmlId, 
    colBegin, colEnd, 
    rowBegin, rowEnd, 
    css }){
    this.htmlId = htmlId;
    this.css = css; 
    this.colBegin = colBegin; 
    this.colEnd = colEnd; 
    this.rowBegin = rowBegin; 
    this.rowEnd = rowEnd; 
}

const Frame = function( viewport ){
    this.currentIndex = 1; 
    this.viewport = viewport; 
    this.elements = new Map();
    this.scenes = new Map();
}

Frame.prototype.next = function(){
}

const _drawBorders =  function( htmlId, elt, viewport ){

    let borderSpecs = $(`#${htmlId}`).data('borders');
    let topBorder = true;  
    let leftBorder = true;  
    let bottomBorder = true;  
    let rightBorder = true;  

    if(borderSpecs && viewport.name in borderSpecs){
        let borderInstructions = borderSpecs[viewport.name];
        if (borderInstructions === "none"){
            leftBorder = false;
            bottomBorder = false;  
            topBorder = false; 
            rightBorder = false; 
        }
    }       
    let gutterWidth = viewport.dimensions.width / 100; 
    if( rightBorder) {
        let odv = $([       //right border
            `<div class="gutter" style="left:${elt.css.left + elt.css.width}`,  
            `width:${gutterWidth}; top:${elt.css.top}`, 
            `height:${elt.css.height}"></div>`].join(';'));
        $("body").append(odv);
    }
    if( leftBorder ) {
        let odv = $([       //right border
            `<div class="gutter" style="left:${elt.css.left}`,  
            `width:${gutterWidth}; top:${elt.css.top}`, 
            `height:${elt.css.height}"></div>`].join(';'));
        $("body").append(odv);
    }

    if( topBorder ){
        let odh =  $([
            `<div class="gutter" style="top:${elt.css.top}`,  
                `height:${viewport.dimensions.height/ 100}; left:${elt.css.left}`, 
                `width:${elt.css.width}"></div>`].join(';'));
            $("body").append(odh);
    } 
    
    if( bottomBorder ){
        let odh =  $([
            `<div class="gutter" style="top:${elt.css.top + elt.css.height}`,  
            `height:${viewport.dimensions.height/ 100}; left:${elt.css.left}`, 
            `width:${elt.css.width + gutterWidth}"></div>`].join(';'));
        $("body").append(odh);
   }
}


Frame.prototype.store = function(id, css, rowColInfo, sceneInfo){
    let row = rowColInfo.row;
    let col = rowColInfo.col; 
    let msg = `element id at row ${row + 1}, col ${col + 1 }`
    if (id === undefined) throw `undefined visual ${msg}`
    if(this.elements.has(id)) throw `duplicate frame id:${id}, ${msg}`
    let scene = new Scene({
        htmlId: id, 
        colBegin: col, 
        rowBegin: row, 
        colEnd: col + rowColInfo.horSpan,
        rowEnd: row + rowColInfo.vertSpan, 
        css
    }); 
    this.elements.set(id, scene); 
    if(this.scenes.has(sceneInfo.index)){
        this.scenes.get(sceneInfo.index).push(scene)
    } else{
        this.scenes.set(sceneInfo.index,[id])
    }
}

Frame.prototype.draw = function(){
    this.elements.forEach((elt, id)=> {
       $(`#${id}`).css(elt.css); 
       _drawBorders(id, elt, this.viewport); 
    })
    this.scenes.forEach( (index, id)  => {
        if( index !== NaN && index !== this.currentIndex ){
            $(`#${id}`).hide(); 
        } else {
            $(`#${id}`).show(); 
        }
    })
}

Frame.prototype.getScene = function(htmlID){
    return this.elements.get(htmlID); 
}
/*****************************************************************************/
module.exports = {
    Frame
}