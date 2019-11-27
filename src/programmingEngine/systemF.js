"use strict"

const ts = require('./typeSignatures').typeSignatures
const context = require('./context').context

const systemF = (function(){

    let systemTypes = new Map()
    let aliases = new Map()

    let registerType = function(typeSignature, {alias, color}){
        let key = typeSignature.toString({format:'index'})
        if(systemTypes.has(key)){
            throw "alredy in register"
        }
        systemTypes.set( key, new types.Type(typeSignature, {alias, color}) ) 
    }

    let registerAlias = function( typeSignature, alias ){
        if(aliases.has(alias)){
            throw "already in register"
        }
        aliases.set(alias, typeSignature)
    }

    return {

        types: {
                forEach: function(callBack){
                    let typeIterator, tyPtr
                    typeIterator = systemF.typeIterator()
                    tyPtr = typeIterator.next()
            
                    while (!tyPtr.done){
                        callBack(tyPtr.value);
                        tyPtr = typeIterator.next() 
                    }
                }
        },

        typeIterator: function(){
            return systemTypes.values()
        },

        onReady: function( ){
        },

        addType: function(signatureDescription, alias="", color){
            let typeSignature
            try{
                typeSignature = ts.signature( context, signatureDescription)
                registerType(typeSignature, {alias, color})
                registerAlias(typeSignature, alias)

            }catch(e){

            }
        },

        addTypes: function(){

        },

        addPug: function(signatureDescription, pug){
            let typeSignature = ts.signature(context, signatureDescription)
            if(systemTypes.has(typeSignature.key)){
                systemTypes.get(typeSignature.key).addPug(pug)
            }
        }, 

        addPugs: function(typeSignature, pugs){
            pugs.forEach(pug => {
               this.addPug(typeSignature, pug) 
            });
        },

        Program: function( typeSignature ){

        }, 

        stringify: function(sysFObject, options = null){
            if(options.format){
                switch(options.format){
                    case "short":
                        if(sysFObject.alias !== ""){
                            return sysFObject.alias;
                            break; 
                        }
                    default:
                        return sysFObject.toString()
                        break
                }
            }
        }
    }
})()

module.exports = {
    systemF
}