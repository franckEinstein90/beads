/******************************************************************************
 * beads
 * A programming IDE for portables
 * -------------------------------
 *
 *  client side entry point 
 *
 *  **************************************************************************/
"use strict"
/*****************************************************************************/
class Feature {

    constructor( options ){
        this.label          = options.label
        this.implemented    = options.implemented || false
        this.method         = options.method || false
    }

}

function AppComponent( component ){

    let _features = new Map()
    this.addFeature =  function(feature){
        if(!('label' in feature)) throw 'error in feature definition'
        if(_features.has(feature.label)) throw "feature already exists"
        _features.set( feature.label, feature)
        if('method' in feature) this[ feature.label ] = feature.method
    }
}

const featureSystem = function( app ){

    let _features       = new Map()
    let _components     = new Map()
    let _reqMajor       = 0
    let _requirements   = new Map()

    return {
        get listComponents() {
            let components = {}
            _components.forEach((value, key) => {
                components[key] = value
            })
            return components
        }, 
        get listFeatures()  {
            let features = {}
            _features.forEach((value, key)=>{
                features[key] = value
            })
            return features
        },

        implements  : featureLabel => _features.has(featureLabel), 

        addRequirement  : function({
            req, 
            parentReq
        }) {
            if( parentReq === undefined || parentReq === null){
                _reqMajor += 1
                _requirements.set(  _reqMajor, req)
            }
        },

        includes: featureName => {
            if(_features.has(featureName)) return _features.get(featureName)
            return false
        },

        addComponent : function({label}){
            let newComponent = new AppComponent( {} )
            _components.set(label, newComponent)
            app[label] = newComponent 
        }, 

        add : function( feature ){
            if(!('label' in feature)) throw 'error in feature definition'
            if(_features.has(feature.label)) throw "feature already exists"
            _features.set( feature.label, feature)
            if('method' in feature) app[ feature.label ] = feature.method
        }
    }
}

const addFeatureSystem = function( app ){
    return new Promise( resolve => {
        let features = featureSystem( app )
        Object.defineProperty( app, 'features', { get: () => features.listFeatures})
        Object.defineProperty( app, 'components', { get: ()=> features.listComponents})
        app.addRequirement = features.addRequirement        
        app.addComponent   = features.addComponent
        app.Feature = Feature
        app.addFeature = features.add
        app.implements = features.implements
        return resolve(app)
    })
}

module.exports = {
    addFeatureSystem
}
