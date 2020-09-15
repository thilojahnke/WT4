sap.ui.define([ "sap/ui/core/mvc/Controller" ,
	            "sap/ui/core/routing/History",
				"WT4/controller/formater"],
		function(Controller,History,Formater){ 
	"use strict";
	 var oObject = Controller.extend("WT4.controller.Detail", {
			/**
			* Called when a controller is instantiated and its View controls (if available) are already created.
			* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			* @memberOf view.AddAdress
			*/
				onInit: function() {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					var oAnyRoute = oRouter.getRoute("detail");
					oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched,this);
					
				},
		       _onObjectMatched : function(oEvent){
		    	  // var sBinding = "/" + oEvent.getParameter("arguments").detailPath;
		    	   var sBinding = "/ADRESSES/"+oEvent.getParameter("arguments").detailPath+"/";
		    	  this.getView().bindElement({
		    		  path: sBinding,
		    		  model: "vAdr"
		    	  }) ;
		    	  var oVadrModel = this.getView().getModel("vAdr");
		    	  var sPath = sBinding + "Value";
		    	  var sValue = oVadrModel.getProperty(sPath);
		    	  if (typeof sValue === "number"){
		    	  this.getView().byId("rating").setValue(sValue);
		    	  }
		       },
		       onNavBack: function(){
          // BewertungsControl zurücksetzen		    	   
		    	 var oValueControl = this.getView().byId("rating");
		    	 oValueControl.reset();
		    	 var oHistory = History.getInstance();  
		    	 var sPrevious = oHistory.getPreviousHash();
		    	 if (sPrevious !== undefined){
		    		 window.history.go(-1);
		    	 } else {
		    		 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		    		 oRouter.navTo("address",{},true);
		    	 }
		       },
		       onRatingChange: function(oEvent){
		    	   
		    	   var fRatingValue = oEvent.getParameter("value");
		    	   var oVadrModel = this.getView().getModel("vAdr");
		    	   var sPath = this.getView().getElementBinding("vAdr").getBoundContext().getPath();
                   var sProp = sPath+"/Value";
                   var oDMod = this.getOwnerComponent().getModel();
                   var oAdrMod = this.getOwnerComponent().getModel("oAdr");
                   oDMod.setProperty("/value",fRatingValue);
                   const fnRatingChange = (sUrl) => {
                       const oAdress = { KUNNR: oDMod.getProperty("/kunnr"),
                                 NAME1: oDMod.getProperty("/name1"),
                                NAME2: oDMod.getProperty("/name2"),
                               Value : oDMod.getProperty("/value")} ;
                       return new Promise((resolve,reject)=>{
                            oAdrMod.update(sUrl,oAdress,{
                            success: (oData)=>{
                                resolve(oData);
                            },
                            error: (error)=>{
                                reject(error);
                            }
                            })
                       })

                   };
                   const sUrl = "/Adress('"+oDMod.getProperty("/kunnr") +"')" ;
                   fnRatingChange(sUrl).then( () => { 
                       oDMod.setProperty("/value",fRatingValue);
                       oVadrModel.setProperty(sProp,fRatingValue );
                       sap.m.MessageToast.show("Rating Changed");
                     });
		    	   

		    	   
		       },

			/**
			* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			* (NOT before the first rendering! onInit() is used for that one!).
			* @memberOf view.AddAdress
			*/
//				onBeforeRendering: function() {
			//
//				},

			/**
			* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			* This hook is the same one that SAPUI5 controls get after being rendered.
			* @memberOf view.AddAdress
			*/
//				onAfterRendering: function() {
			//
//				},

			/**
			* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			* @memberOf view.AddAdress
			*/
//				onExit: function() {
			//
//				}

		       joiner : Formater.joiner   
		       
		});

		 
	return oObject });




