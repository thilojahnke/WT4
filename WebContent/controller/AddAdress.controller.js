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
		        	if (message.id === "E100"){
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
			        	if (message.id === "E100"){
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
				var oDefMod = this.getView().getModel();
				// kunnr darf nicht leer sein
				var sProp = "/kunnr";
				if (oDefMod.getProperty(sProp) == "" ){
					this.addMessage("E101",sProp);
					return false;
				}
				if (!this.checkKunnr()){
					 var oMessage = new Message({
			                message: "Kundennummer ist bereits vergeben",
			                type: MessageType.Error,
			                target: "/kunnr",
			                id: "E100",
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
				var oComponent = this.getOwnerComponent();
				var oAdrModel = oComponent.getModel('adr');
				var mAdresses = oAdrModel.getProperty('/ADRESSES');
				if (mAdresses === undefined ){
					return true;
				}
				if(mAdresses.length == 0 ){
					return true;
				}
				if (mAdresses.find(function(element){
					if( 1==2){
						return true;
					}
				})){
					return false;
				}
				return false;
			},
			addMessage: function(codeno,target){
				var oMessageManager = sap.ui.getCore().getMessageManager();
				var oI18nModel = this.getOwnerComponent().getModel("i18n");
				if (codeno == undefined){
					codeno = "E001"
				};
				var sCodeType = codeno[0];
				var sMType;
				switch (sCodeType){
				case "E":
					sMType = MessageType.Error;
					break;
				case "W" :
					sMType = MessageType.Warning;
					break;
				case "I" :
					 sMType = MessageType.Information;
					 break;
				case "S" :
					 sMType = MessageType.Success;
					 break;
				};
				
				var sNo = codeno.slice(1,4);
				
				var sDescript = oI18nModel.getProperty(sNo);
 				 var oMessage = new Message({
		                message: sDescript,
		                type: sMType,
		                target: target,
		                id: codeno,
		                processor: this.getView().getModel()
		            });
				    oMessageManager.addMessages(oMessage);  

				
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




