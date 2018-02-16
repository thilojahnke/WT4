sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel",
	"WT4/controller/formater"
	
	
	
], function(Controller,ResourceModel,JSONModel,Formater ){
	
  "use strict";
  let indexChecker = function(showNumber,adrLength){
	  let strMessageOut = '';
	  if (showNumber < 0 ) {strMessageOut= "less then 0"}
	  else if(showNumber >= adrLength){strMessageOut="higher then index"}
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
		  var oInputElement = this.getView().byId("inputIndex");
		  let oMessageManger = sap.ui.getCore().getMessageManager();
		  oMessageManger.registerObject(oInputElement,true);
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
		  let strShowNumber = oDefaultModel.getProperty("/nummer");
		  let iShowNumber = parseInt(strShowNumber);
/*		  let strMessageOut = indexChecker(iShowNumber,iAdrLength);
		
		  if (strMessageOut != ""){
			  sap.m.MessageToast.show(strMessageOut,{
				  duration: 3000
			  })
			   return;
		  } */
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
    	 let func = this.jumpAdressNumber;
    	 func(this);
    	 
		  
		  
     },
     
     joiner : Formater.joiner
     
	  
  });


});