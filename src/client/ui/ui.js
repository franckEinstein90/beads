/******************************************************************************
 * 
 ******************************************************************************/
"use strict"
/******************************************************************************/
/******************************************************************************/

const deviceRatios = [
    {id: 1, ratio: '4x3'}, 
    {id: 2, ratio: '16x9'}, 
    {id: 3, ratio: '3x2'}
]
    
const ui = (function(){

    let _windowHeight = null
    let _windowWidth = null

    let _screenDimensions = _ => {
        _windowHeight = $( window ).height()
        _windowWidth = $( window ).width()
    }

    let _setHeight = (element, height) => {
        element.height(height)
    }

    let _configureUIElements = () => {

        _screenDimensions()
        debugger       

        let topNavHeight = $(window).height()/10
        _setHeight( $('#topNav'), topNavHeight ) 

        let bottomNavHeight = $(window).height() / 15
        _setHeight( $('#bottomNav'), bottomNavHeight)

           
        $('#bottomNav').css({
            top: `${_windowHeight - bottomNavHeight}px`, 
            left: '0'
        })

        let contentHeight = _windowHeight - topNavHeight - bottomNavHeight 
        _setHeight( $('#leftNav'), contentHeight) 
        $('#leftNav').css({
                    top: `${topNavHeight}px`, 
                    left: '0', 
                    width: `${$(window).width() > 1200 ? 145 : 0}`
        })

        _setHeight( $('#content'), contentHeight) 
         $('#content').css({
            top: `${topNavHeight}px`, 
            left: $('#leftNav').width(), 
            width: $(window).width() - $('#leftNav').width()
                
        })
    }

    return {

        configure : function( app, elements){
            elements.forEach( element => {

            })
            _configureUIElements()
            $(window).resize(()=> {
                _configureUIElements()
            })
        }


    }
})()

const addUiFeature = app => {

    ui.configure( app )

    app.ui = ui
    app.addFeature({
        tag: 'ui', 
        state: 'implemented'
    })
    require('./modal').addModalFeature( app, [
            {}
    ])


    return ui
}

module.exports = {
    addUiFeature
}
