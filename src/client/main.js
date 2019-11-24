"use strict"

const workspace = require('./workspace').workspace


$(function(){
      let appStatus = null
      try{
            appStatus = workspace.init()
      }catch (err){
            appStatus = false
      }
      if(appStatus){
          workspace.render()
      }
}) 

