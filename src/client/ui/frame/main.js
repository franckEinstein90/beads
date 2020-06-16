/*****************************************************************************/
"use strict";
/*****************************************************************************/
const cssDef         = require('../utils/cssDef').cssDef ;
const divPerimeter   = require('../utils/divPerimeter').divPerimeter ; 
/*****************************************************************************/

let bottomNavCss = cssDef({ 
   width: s => s.width, 
   height: s => s.orientation === 'portrait' ? 55 : 30 
});

let topNavCss    = cssDef({
   width: s => s.width,
   height:55
});


const _configureOuterLayout = function( app ){
    let screen = divPerimeter( window ); 
    //figure out which type of viewPort fits this best 
    //let layoutType = figureOutLayout()
    //render surrounding ui 
    
    let contentViewport = {
        top: 0,
        left: 0,  
        height: screen.height, 
        width: screen.width, 
        bottom: screen.height
    };

    if(app.ui.visualElements.topNav){
        let topNav = app.ui.visualElements.topNav( screen ); 
        contentViewport.top += topNav.height; 
        contentViewport.height -= topNav.height; 
        $('#topNav').css(topNav);
    }

    return contentViewport; 
}


const _configureMargins = function(contentViewport){

    $('#marginLeft').css({
        top: contentViewport.top, 
        width: contentViewport.left, 
        height:contentViewport.height
    })
     $('#marginRight').css({
        top: contentViewport.top, 
        width: contentViewport.left, 
        height:contentViewport.height, 
        left: contentViewport.left + contentViewport.width
    })

}

const setFormat = function( maxDimensions, contentFormats ){
    /* Given a viewport, and a list of formats, figures out
    which format minimizes wasted space                   */
    let maxArea = maxDimensions.width * maxDimensions.height; 
    let area = (width, height) => width * height; 
    let wastedSpace = (width, height) => maxArea - area(width * height)

    let best = { wasted: maxArea};  //the most space that can be wasted is all of it
    Object.entries(contentFormats).forEach( format => {

        let formatDescription = format[1];
        let contentWidth = maxDimensions.width; 
        let contentHeight = (contentWidth * formatDescription.height / formatDescription.width); 
        while( contentHeight > maxDimensions.height ){ //scale the height 
                contentHeight = contentHeight * 0.95;   
                contentWidth = contentWidth * 0.95; 
         }
        let wasted = maxDimensions.area - (contentWidth * contentHeight); 
        if (wasted < best.wasted){
                best.name = format[0]; 
                best.format = format[1]; 
                best.wasted = wasted; 
                best.dimensions = {
                    width: contentWidth, 
                    height: contentHeight, 
                    area: contentWidth * contentHeight
                }; 
         }
    })
    best.screenDimensions = maxDimensions
    return best
}   
  
const fitToTemplate = function( maxDimensions ) {
    let contentFormats = $('#page').data('formats');
    return setFormat( maxDimensions, contentFormats )
}

const _configureLayout = function( app ){
    let contentViewport = _configureOuterLayout( app ); 
    let maxDimensions = {
        height: contentViewport.height, 
        width: contentViewport.width,
        area: contentViewport.height * contentViewport.width
    }; 
    /* now we know how much real estate we have */
    let contentFrame = fitToTemplate( maxDimensions ); //gets the layout that fits this area the best 
    let totalMarginWidth = contentViewport.width - contentFrame.dimensions.width; 
    contentViewport.left = totalMarginWidth / 2; 
    contentViewport.width = contentFrame.dimensions.width; 
    contentViewport.height = contentFrame.dimensions.height; 

    _configureMargins(contentViewport);
    layoutVisualElements({
            app, 
            contentViewport, 
            viewportTemplate: contentFrame
    }); 
    layoutText( app );
}


const uiFrameFeature = function( app ){
   app.ui.visualElements = { 
        topNav    : topNavCss, 
        bottomNav : bottomNavCss,
        resize    : _ =>  _configureLayout( app )
    };
    
   _configureLayout( app ); 
   return app; 
}

module.exports = {
   uiFrameFeature
}