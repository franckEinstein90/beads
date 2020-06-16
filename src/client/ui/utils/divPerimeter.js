/*****************************************************************************/
"use strict"
/*****************************************************************************/

const divPerimeter = function(divID){
    let returnObject =    {
        height: $( divID ).height(), 
        width:  $( divID ).width()
    }; 

    returnObject.orientation = returnObject.height > returnObject.width 
        ? 'portrait' 
        : 'landscape'; 

    return returnObject; 
}

module.exports = {
    divPerimeter
}