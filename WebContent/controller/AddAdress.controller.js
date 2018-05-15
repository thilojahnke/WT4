sap.ui.define([ "sap/ui/core/mvc/Controller",
	            "sap/ui/core/message/Message",
	            "sap/ui/core/MessageType",
	            "sap/ui/model/json/JSONModel"
	            
	
	            ],
		function(Controller,Message,MessageType,JSONModel){ 
	"use strict";
	return Controller.extend("WT4.controller.AddAdress",{
		/* @memberOf view.AddAdress */
			onInit: function() {	
				var oView = this.getView();
 		        var oMessageManager = sap.ui.getCore().getMessageManager();
			    oView.setModel(oMessageManager.getMessageModel(),"message");
			    oMessageManager.registerObject(oView,true);
			    var oDefModel = new JSONModel({
			    	kunnr : "",
			    	name1 : "",
			    	name2 : ""
			    })
//			    oDefModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			    oView.setModel(oDefModel);
			    
			    
			 /*   var oAdrComponent = this.getOwnerComponent();
			    var oDefaultModel = oAdrComponent.getModel();
			    this.getView().setModel(oDefaultModel);
			    var oMessage = new Message({
	                message: "My generated success message",
	                type: MessageType.Success,
	                target: "/Dummy",
	                processor: this.getView().getModel()
	            });
			    oMessageManager.addMessages(oMessage); */

			},
			onValidationError:function(oEvent){
		    var source = oEvent.getSource();
		    var sourceId = source.getId();
		    var oElement = oEvent.getParameters("element");
		    var oComponent = this.getOwnerComponent();
		    var oI18nModel = oComponent.getModel("i18n");
		    var oMessageModel = sap.ui.getCore().getMessageManager().getMessageModel();
		    var oProp;
		    if (sourceId.endsWith("idAddInputKunnr")){
		    	oProp = oI18nModel.getProperty("errorKunnr");
		    	var mMessages = oMessageModel.getProperty("/");
		        mMessages.forEach(function(message){
		        	if (message.id === "F100"){
		        		sap.ui.getCore().getMessageManager().removeMessages(message);
		        		return message;
		        	}
		        });
		    	
		    } else if (sourceId.endsWith("idAddInputName1") || sourceId.endsWith("idAddInputName2")){
		    	oProp = oI18nModel.getProperty("errorName");
		    };
			 oElement.message=oProp;
				
			},
			onValidationSuccess:function(oEvent){
				var source = oEvent.getSource();
			    var sourceId = source.getId();
			    var oElement = oEvent.getParameters("element");
				var oMessageModel = sap.ui.getCore().getMessageManager().getMessageModel();
				var oProp;
			    if (sourceId.endsWith("idAddInputKunnr")){
			       var mMessages = oMessageModel.getProperty("/");
			        mMessages.forEach(function(message){
			        	if (message.id === "F100"){
			        		sap.ui.getCore().getMessageManager().removeMessages(message);
			        		return message;
			        	}
			        	}
			        )}
			        
			},
			onReset : function(){
			 var oDefMod = this.getView().getModel();
			 var oInput = this.getView().byId("idAddInputKunnr");
			 oInput.setValue("");
			 oInput = this.getView().byId("idAddInputName1");
			 oInput.setValue("");
			 oInput = this.getView().byId("idAddInputName2");
			 oInput.setValue("");
			 oDefMod.setProperty("/kunnr","");
			 oDefMod.setProperty("/name1","");
			 oDefMod.setProperty("/name2","");
			 var oMessageManager = sap.ui.getCore().getMessageManager();
			 oMessageManager.removeAllMessages();
			 
				
			},
			onAccept : function(){
				var oMessageManager = sap.ui.getCore().getMessageManager();
				if (!this.checkKunnr()){
					 var oMessage = new Message({
			                message: "Kundennummer ist bereits vergeben",
			                type: MessageType.Error,
			                target: "/kunnr",
			                id: "F100",
			                processor: this.getView().getModel()
			            });
					    oMessageManager.addMessages(oMessage); 

					
				}
				
			},
			onReject : function(){
				
			},
			
			onMessagePopoverPress: function(oEvent){
				if ( ! this._oMessagePopover ){
					this._oMessagePopover = sap.ui.xmlfragment("WT4.view.messagePopover",this);
					this.getView().addDependent(this._oMessagePopover);
				}
				
				this._oMessagePopover.openBy(oEvent.getSource());
			},
			checkKunnr : function(){
				return false;
			}

				


		 
		/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf view.AddAdress
		*/
//			onExit: function() {
		//
//			}

	});
});




