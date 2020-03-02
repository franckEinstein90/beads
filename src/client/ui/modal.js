/******************************************************************************
 * beads
 * A programming IDE for portables
 * -------------------------------
 *
 *  client side entry point 
 *
 *  **************************************************************************/
"use strict"


const showModal = ({

    title, 
    content

  }) =>{

    $('#modalTitle').text( title )
    $('#modalContent').html( content )
    document.getElementById('modalWindow').style.display = 'block'
}

const addModalFeature = function( app ){
    app.ui.showModal = showModal
    app.addFeature({label: 'modal-window'})
}

module.exports = {
    addModalFeature
}