sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/resource/ResourceModel"
], function(Controller,ResourceModel){
	
  "use strict";
  return Controller.extend("WT4.controller.address",{
	  onInit: function(){
		  var oAdrComponent = this.getOwnerComponent();
		  var oAdrModel = oAdrComponent.getModel("adr");
		  var oAdrElement = this.getView().byId("page1");
		  var oAdrBinding = { path: "/Adresses", model:"adr" };
		  var oAdrElementBound = oAdrElement.bindElement(oAdrBinding);
		  
//		  var oJsonBinding = oDefaultModel.bindContext("/Adress");
//		  var oAdrView = this.getView();
//		  var oAdrModel = oAdrView.getModel();
	  },
	  OnButtonPress: function(){
		  var oAdrComponent = this.getOwnerComponent();
		  var oAdrModel = oAdrComponent.getModel("adr");
		  var oAdrProperty = oAdrModel.getProperty("/Adresses/name1");
		  console.log(oAdrProperty);
	  
		  
     }
	  
  });


});