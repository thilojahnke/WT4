sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel",
	"WT4/controller/formater"
	
	
	
], function(Controller,ResourceModel,JSONModel,Formater ){
	
  "use strict";
  

  return Controller.extend("WT4.controller.address",{
	  onInit: function(){
		  var oAdrComponent = this.getOwnerComponent();
		  var oAdrModel = oAdrComponent.getModel("adr");
		  var oJModelData = {
				    meta   : {
				    	nummer : 0,
				    	shades: [
							sap.ui.layout.BlockLayoutCellColorShade.ShadeA,
							sap.ui.layout.BlockLayoutCellColorShade.ShadeB,
							sap.ui.layout.BlockLayoutCellColorShade.ShadeC,
							sap.ui.layout.BlockLayoutCellColorShade.ShadeD
						],
				    },
					kunnr : "Init",
					name1 : "Init",
					name2 : "Init"
				};
                     
			   var oJsonModel = new JSONModel(oJModelData);
				this.getView().setModel(oJsonModel);
           
		  
		  var oAdrElement = this.getView().byId("page1");
		  
/*		  var oInputElement = this.getView().byId("inputIndex");
		  let oMessageManger = sap.ui.getCore().getMessageManager();
		  oMessageManger.registerObject(oInputElement,true); */
//		  var oAdrBinding = "/";
//		  var oAdrElementBound = oAdrElement.bindElement(oAdrBinding);
		  
		  
		  

	  },
	  onButtonPressUp: function(){
		  this.nextAdress("UP");		  
     },
     onButtonPressDown: function(){
    	 this.nextAdress("DOWN");
     },
     jumpAdressNumber: function(self){
    	  
       	 let oAdrComponent = self.getOwnerComponent();
		  let oDefaultModel = self.getView().getModel();
		  let oAdrModel = oAdrComponent.getModel("adr");
		  let iAdrLength = oAdrModel.getProperty("/Adresses").length;
		  let strShowNumber = oDefaultModel.getProperty("/meta/nummer");
		  let iShowNumber = parseInt(strShowNumber);
		  oDefaultModel.setProperty("/meta/nummer",strShowNumber);
		  let sPathToAdress = "/Adresses/"+strShowNumber+"/";
		  let oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
		  oDefaultModel.setProperty("/kunnr", oAdrModelDetail.kunnr);
		  oDefaultModel.setProperty("/name1", oAdrModelDetail.name1);
		  oDefaultModel.setProperty("/name2", oAdrModelDetail.name2);
		
     },
     nextAdress:function(direction){
    	 var oAdrComponent = this.getOwnerComponent();
		  var oDefaultModel = this.getView().getModel();
		  var oAdrModel = oAdrComponent.getModel("adr");
		  var nEntryNumber = oDefaultModel.getProperty("/meta/nummer");
		  if (direction==="UP"){
			  nEntryNumber++;
		  }else {
			  nEntryNumber--;
		  };
	      
		  var sPathToAdress = "/Adresses/"+nEntryNumber+"/";
		  var oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
		  
		  oDefaultModel.setProperty("/kunnr", oAdrModelDetail.kunnr);
		  oDefaultModel.setProperty("/name1", oAdrModelDetail.name1);
		  oDefaultModel.setProperty("/name2", oAdrModelDetail.name2);
		  oDefaultModel.setProperty("/meta/nummer",nEntryNumber);
		  
		  
		  
     },
     onAdressEntry:function(oEvent){
    	 let strInput = oEvent.getParameter("value");
    	 this.getView().getModel().setProperty("/meta/nummer",strInput);
    	 let func = this.jumpAdressNumber;
    	 func(this);
    	 
		  
		  
     },
     onButtonList:function(){
    	 let oDialogView = this.getView();
    	 let oDialog = oDialogView.byId("listDialog");
    	 
    	 if (!oDialog){
    		 oDialog = sap.ui.xmlfragment( oDialogView.getId(), "WT4.view.selectList",this);
    		 oDialogView.addDependent(oDialog);
    	 }
    	 oDialog.open();
    	 
     },
     onDialogClose:function(){
    	 let oDialogView = this.getView();
    	 let oDialog = oDialogView.byId("listDialog");
    	 if (oDialog){
    		 oDialog.close();
    	 }
     },
     
     joiner : Formater.joiner
     
	  
  });


});