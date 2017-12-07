sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel"
	
], function(Controller,ResourceModel,JSONModel){
	
  "use strict";
  return Controller.extend("WT4.controller.address",{
	  onInit: function(){
		  var oAdrComponent = this.getOwnerComponent();
		  var oAdrModel = oAdrComponent.getModel("adr");
		  var oJModelData = {
					nummer : 0,
					name1 : "Init",
					name2 : "Init"
				};

			   var oJsonModel = new JSONModel(oJModelData);
				this.getView().setModel(oJsonModel);

		  
		  var oAdrElement = this.getView().byId("page1");
//		  var oAdrBinding = { path: "/Adresses/0/", model:"adr" };
		  var oAdrBinding = "/";
		  var oAdrElementBound = oAdrElement.bindElement(oAdrBinding);
		  
//		  var oJsonBinding = oDefaultModel.bindContext("/Adress");
//		  var oAdrView = this.getView();
//		  var oAdrModel = oAdrView.getModel();
	  },
	  OnButtonPress: function(){
		  var oAdrComponent = this.getOwnerComponent();
		  var oDefaultModel = this.getView().getModel();
		  var oAdrModel = oAdrComponent.getModel("adr");
		  var sPathToAdress = "/Adresses/"+oDefaultModel.getProperty("/nummer")+"/";
		  var oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
		  
		  oDefaultModel.setProperty("/name1", oAdrModelDetail.name1);
		  oDefaultModel.setProperty("/name2", oAdrModelDetail.name2);
		  oDefaultModel.setProperty("/nummer",oDefaultModel.getProperty("/nummer")+1);
		  
		  
	  
		  
     }
	  
  });


});