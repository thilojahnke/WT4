sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/resource/ResourceModel"
], function(Controller,ResourceModel){
	
  "use strict";
  return Controller.extend("WT4.controller.address",{
	  onInit: function(){
		  
	  },
	  OnButtonPress: function(){
		  var oAdrComponent = this.getOwnerComponent();
		  var oDefaultModel = oAdrComponent.getModel();
		  oDefaultModel.setProperty("/Adress/name1","William");
		  
     }
	  
  });


});