sap.ui.define([ "sap/ui/core/mvc/Controller" ,
	            "sap/ui/core/routing/History",
				"WT4/controller/formater"],
		function(Controller,History,Formater){ 
	"use strict";
	return Controller.extend("WT4.controller.Detail", {
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
	    	   var sBinding = "/" + oEvent.getParameter("arguments").detailPath;  
	    	  this.getView().bindElement({
	    		  path: sBinding,
	    		  model: "oAdr"
	    	  }) ;
	       },
	       onNavBack: function(){
	    	 var oHistory = History.getInstance();  
	    	 var sPrevious = oHistory.getPreviousHash();
	    	 if (sPrevious !== undefined){
	    		 window.history.go(-1);
	    	 } else {
	    		 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	    		 oRouter.navTo("address",{},true);
	    	 }
	       },

		/**
		* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		* (NOT before the first rendering! onInit() is used for that one!).
		* @memberOf view.AddAdress
		*/
//			onBeforeRendering: function() {
		//
//			},

		/**
		* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* @memberOf view.AddAdress
		*/
//			onAfterRendering: function() {
		//
//			},

		/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf view.AddAdress
		*/
//			onExit: function() {
		//
//			}

	       joiner : Formater.joiner   
	       
	});
});




