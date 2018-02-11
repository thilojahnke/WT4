sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel"
	
	
	
], function(Controller,ResourceModel,JSONModel ){
	
  "use strict";
  let Formater = function(showNumber,adrLength){
	  let strMessageOut = '';
	  if (showNumber < 0 ) {strMessageOut= "less0"}
	  else if(showNumber >= adrLength){strMessageOut="higher0"}
	  else if(isNaN(showNumber)) {strMessageOut = "Not a number"};
	  return strMessageOut;
	  
  };
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
		  var oAdrBinding = "/";
		  var oAdrElementBound = oAdrElement.bindElement(oAdrBinding);
		  
		  
		  

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
		  let strShowNumber = oDefaultModel.getProperty("/nummer");
		  let iShowNumber = parseInt(strShowNumber);
		  let strMessageOut = Formater(iShowNumber,iAdrLength);
		
		  if (strMessageOut != ""){
			  sap.m.MessageToast.show(strMessageOut,{
				  duration: 3000
			  })
			   return;
		  }
		  oDefaultModel.setProperty("/nummer",strShowNumber);
		  let sPathToAdress = "/Adresses/"+strShowNumber+"/";
		  let oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
		  oDefaultModel.setProperty("/name1", oAdrModelDetail.name1);
		  oDefaultModel.setProperty("/name2", oAdrModelDetail.name2);
		
     },
     nextAdress:function(direction){
    	 var oAdrComponent = this.getOwnerComponent();
		  var oDefaultModel = this.getView().getModel();
		  var oAdrModel = oAdrComponent.getModel("adr");
		  var nEntryNumber = oDefaultModel.getProperty("/nummer");
		  if (direction==="UP"){
			  nEntryNumber++;
		  }else {
			  nEntryNumber--;
		  };
	      
		  var sPathToAdress = "/Adresses/"+nEntryNumber+"/";
		  var oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
		  
		  oDefaultModel.setProperty("/name1", oAdrModelDetail.name1);
		  oDefaultModel.setProperty("/name2", oAdrModelDetail.name2);
		  oDefaultModel.setProperty("/nummer",nEntryNumber);
		  
		  
		  
     },
     onAdressEntry:function(oEvent){
    	 let strInput = oEvent.getParameter("value");
    	 this.getView().getModel().setProperty("/nummer",strInput);
//    	 let oDefaultModel = this.getView().getModel();
    	 let func = this.jumpAdressNumber;
    	 func(this);
    	 
/*    	 let oAdrComponent = this.getOwnerComponent();
		  let oDefaultModel = this.getView().getModel();
		  let oAdrModel = oAdrComponent.getModel("adr");
		  let strInput = oEvent.getParameter("value");
		  let sPathToAdress = "/Adresses/"+strInput+"/";
		  oDefaultModel.setProperty("/nummer",strInput);
		  let oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
		  oDefaultModel.setProperty("/name1", oAdrModelDetail.name1);
		  oDefaultModel.setProperty("/name2", oAdrModelDetail.name2); */
		  
		  
     }
     
	  
  });


});