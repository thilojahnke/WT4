sap.ui.define([ "sap/ui/core/mvc/Controller",
	            "sap/ui/core/message/Message",
	            "sap/ui/core/MessageType",
	            "sap/ui/model/json/JSONModel",
	            "sap/ui/core/routing/History",
	            
	
	            ],
		function(Controller,Message,MessageType,JSONModel,History){ 
	"use strict";
// Fields in form with valuation	
	var mFields = ["idAddInputKunnr","idAddInputName1","idAddInputName2"];
// At new valuation delete these messages	
	var mDelMessages = [{field:mFields[0] , messages:["E100","E101"]},		
		{field:mFields[1] , messages:["E102"]},
		{field:mFields[2] , messages:["E103"]}
];
    var oControllerObject = Controller.extend("WT4.controller.AddAdress",{
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
//		    oDefModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
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
			for (var i=0;i<mFields.length;i++){
		    if (sourceId.endsWith(mFields[i])){
		       var mMessages = oMessageModel.getProperty("/");
		       var iMsgIndex = mDelMessages.findIndex(function(element){
		    	    return element.field == mFields[i] ;
		    		   
		    	   
		       });
		       if (iMsgIndex > -1 ){
		    	   var mMsg = mDelMessages[iMsgIndex].messages;
		       }
		       
		        mMessages.forEach(function(message){
		        	if (mMsg.findIndex(function(element){
		        		return element === message.id
		        	}) > -1 ){
		        		sap.ui.getCore().getMessageManager().removeMessages(message);
		        		//return message;
		        	}
		        	}
		        )}
			}
		     //  return true; 
		},
		onReset : function(){
		 var oDefMod = this.getView().getModel();
		 for (var i=0;i<mFields.length;i++){
		 var oInput = this.getView().byId(mFields[i]);
		 oInput.setValue("");
		 }
		 
		 oDefMod.setProperty("/kunnr","");
		 oDefMod.setProperty("/name1","");
		 oDefMod.setProperty("/name2","");
		 var oMessageManager = sap.ui.getCore().getMessageManager();
		 oMessageManager.removeAllMessages();
		 
			
		},
		onAccept : function(){
			var oMessageManager = sap.ui.getCore().getMessageManager();
			var bStatus = true;
			var oDefMod = this.getView().getModel();
			// kunnr darf nicht leer sein
			var sProp = "/kunnr";
			if (oDefMod.getProperty(sProp) == "" ){
				this.addMessage("E101",sProp);// kunnr should not be empty
				bStatus = false;
			} else if (!this.checkKunnr()){
				 this.addMessage("E100",sProp)
				 bStatus = false;
			}
			sProp = "/name1";
			if (oDefMod.getProperty(sProp) == "" ){
				this.addMessage("E102",sProp);//name1 should not be empty
				bStatus = false;
			}
			sProp = "/name2";
			if (oDefMod.getProperty(sProp) == "" ){
				this.addMessage("E103",sProp);//name2 should not be empty
				bStatus = false;
				
			}
			 if ( bStatus ){
			     this.addAdr();	 
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
		addAdr : function(){
			var oComponent = this.getOwnerComponent();
			var oAdrModel = oComponent.getModel('adr');
//            var oAdrs = oAdrModel.getProperty("/ADRESSES"); 
            var oAdr = oComponent.getModel("oAdr");
			var oDefMod = this.getView().getModel();		
			var oNewAdr = {KUNNR: oDefMod.getProperty("/kunnr"),NAME1:oDefMod.getProperty("/name1"),
                    NAME2: oDefMod.getProperty("/name2"), Value: oDefMod.getProperty("/value" )};
            var fnAddAdress = (sUrl)=>{
                return new Promise((resolve,reject)=>{
                    oAdr.create(sUrl,oNewAdr,{
                        success: (oData,response)=>{
                            resolve(oData)
                        },
                        error: (error)=>{
                            reject(error)
                        }
                        
                    })
                }

                )};  
            fnAddAdress("/Adress").then( (oData)=>{
                var oAdrModel = oComponent.getModel('adr'); 
                var oAdrs = oAdrModel.getProperty("/ADRESSES"); 
                var sTarget = "/ADRESSES/" + oAdrs.length + "/";
                      oAdrModel.setProperty(sTarget,oData);
			    
			                sap.m.MessageToast.show("Kunde hinzugefügt");
			                this.navBack();
            })
            .catch( ()=>{

            }) ;    
			
			
		},
		checkKunnr : function(){
			var oComponent = this.getOwnerComponent();
			var oDefMod = this.getView().getModel();
			var sKunnr = oDefMod.getProperty("/kunnr");
			var oAdrModel = oComponent.getModel('adr');
			var mAdresses = oAdrModel.getProperty('/ADRESSES');
			if (mAdresses === undefined ){
				return true;
			}
			if(mAdresses.length == 0 ){
				return true;
			}
			if (mAdresses.findIndex(function(element){
				return element.KUNNR === sKunnr;
			}) > -1){
				return false;
			}
			return true;
		},
		navBack: function(){
			 var oHistory = History.getInstance();  
	    	 var sPrevious = oHistory.getPreviousHash();
	    	 if (sPrevious !== undefined){
	    		 window.history.go(-1);
	    	 } else {
	    		 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	    		 oRouter.navTo("address",{},true);
	    	 }
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
//		onExit: function() {
	//
//		}

});
 	
	   
	return oControllerObject });




