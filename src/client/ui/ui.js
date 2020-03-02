/******************************************************************************
 * 
 ******************************************************************************/
"use strict"
/******************************************************************************/
/******************************************************************************/
const ui = (function(){

    
    let _setHeight = (element, height) => {
        element.height(height)
    }

    let _configureUIElements = () => {

        let windowHeight = $(window).height()
        let topNavHeight = $(window).height()/10
        _setHeight( $('#topNav'), topNavHeight ) 

        let bottomNavHeight = $(window).height() / 15
        _setHeight( $('#bottomNav'), bottomNavHeight)

           
        $('#bottomNav').css({
                    top: `${windowHeight - bottomNavHeight}px`, 
                    left: '0'
        })

        let contentHeight = windowHeight - topNavHeight - bottomNavHeight 
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

        configure : function( ){
            _configureUIElements()
            $(window).resize(()=> {
                _configureUIElements()
            })
        }


    }
})()

const addUiFeature = app => {

    ui.configure(app)
    app.ui = ui
    app.addFeature({
        tag: 'ui', 
        state: 'implemented'
    })

    require('./modal').addModalFeature( app )
    return ui
}

module.exports = {
    addUiFeature
}