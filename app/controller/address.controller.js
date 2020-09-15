sap.ui.define([ "sap/ui/core/mvc/Controller",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"WT4/controller/formater"

], function(Controller, ResourceModel, JSONModel, Filter, Formater) {

	"use strict";
    var oControllerObject = Controller.extend("WT4.controller.address", {
		onInit : function() {
			var oAdrComponent = this.getOwnerComponent();
			var oJModelData = {
				meta : {
					nummer : 0,
					insert : false
					
				},
				kunnr : "",
				name1 : "",
				name2 : "",
				value : ""
            };
            var oAdr = oAdrComponent.getModel("oAdr");

        const fnReadCustomer = (sUrl)=>{
            return new Promise((resolve,reject)=>{
                oAdr.read(sUrl,{
                    success: (oData,response)=>{
                        resolve(oData.results)
                    },
                    error: (error)=>{
                        reject(error);
                    }

                })
            })
        }
			var oJsonModel = new JSONModel(oJModelData);
			//this.getView().setModel(oJsonModel);
            oAdrComponent.setModel(oJsonModel);
            fnReadCustomer("/Adress").then(
                (results)=>{
                    var oModelData = {"ADRESSES":  results };
                    var oAdrModel = oAdrComponent.getModel("adr");
            	    oAdrModel.setData(oModelData);
                }

            ).catch(()=>{
                alert("init ODATA Services failed");
            });


		},
		onButtonPressUp : function() {
			this.nextAdress("UP");
		},
		onButtonPressDown : function() {
			this.nextAdress("DOWN");
		},
		jumpAdressNumber : function(self) {

			let oAdrComponent = self.getOwnerComponent();
			let oDefaultModel = self.getView().getModel();
			let oAdrModel = oAdrComponent.getModel("adr");
			let iAdrLength = oAdrModel.getProperty("/ADRESSES").length;
			let strShowNumber = oDefaultModel.getProperty("/meta/nummer");
			let iShowNumber = parseInt(strShowNumber);
			oDefaultModel.setProperty("/meta/nummer", strShowNumber);
			oDefaultModel.setProperty("/meta/insert", true );
			let sPathToAdress = "/ADRESSES/" + strShowNumber + "/";
			let oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
			oDefaultModel.setProperty("/kunnr", oAdrModelDetail.KUNNR);
			oDefaultModel.setProperty("/name1", oAdrModelDetail.NAME1);
            oDefaultModel.setProperty("/name2", oAdrModelDetail.NAME2);
            oDefaultModel.setProperty("/value", oAdrModelDetail.Value);

		},
		nextAdress : function(direction) {
			var oAdrComponent = this.getOwnerComponent();
			var oDefaultModel = this.getView().getModel();
			var oAdrModel = oAdrComponent.getModel("adr");
			var nEntryNumber = oDefaultModel.getProperty("/meta/nummer");
			if (direction === "UP") {
				nEntryNumber++;
			} else {
				nEntryNumber--;
			}
			;

			var sPathToAdress = "/ADRESSES/" + nEntryNumber + "/";

			var oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);

			oDefaultModel.setProperty("/kunnr", oAdrModelDetail.KUNNR);
			oDefaultModel.setProperty("/name1", oAdrModelDetail.NAME1);
            oDefaultModel.setProperty("/name2", oAdrModelDetail.NAME2);
            oDefaultModel.setProperty("/value" ,oAdrModelDetail.Value);
			oDefaultModel.setProperty("/meta/nummer", nEntryNumber);
			oDefaultModel.setProperty("/meta/insert", true );

        },
        
		
		onButtonList : function() {
			let oDialogView = this.getView();
			let oDialog = oDialogView.byId("listDialog");

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oDialogView.getId(),
						"WT4.view.selectList", this);
				oDialogView.addDependent(oDialog);
			}
			oDialog.open();

		},
		onButtonNew : function(){
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.getOwnerComponent().getRouter().navTo("AddAdress",{});
			//oRouter.navTo("add");
		},
		onButtonAdd:function(){
			var oAdrComponent = this.getOwnerComponent();
			var oVAdr = oAdrComponent.getModel("vAdr");
			var oVBew = "/ADRESSES/" + oVAdr.getProperty("/ADRESSES").length + "/";
			
			var oDefMod = oAdrComponent.getModel();
			var oJson = {"KUNNR": oDefMod.getProperty("/kunnr"), "NAME1": oDefMod.getProperty("/name1"),
					 "NAME2" : oDefMod.getProperty("/name2"), "Value" : oDefMod.getProperty("/value")};
			oVAdr.setProperty(oVBew, oJson );
		},
		onPressDetail: function(oEvent){
			var oAdrComponent = this.getOwnerComponent();
			var oVAdr = oAdrComponent.getModel("vAdr");
			var oItem = oEvent.getSource();
			var sItem = oItem.getBindingContext("vAdr").getPath().substr('/ADRESSES/'.length) ;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail",{
				detailPath : sItem
			});
		},
		onPressOpenMenu:function(oEvent){
			var oButton = oEvent.getSource();
			if (!this._menu){
				this._menu = sap.ui.xmlfragment("WT4.view.menu",this);
				this.getView().addDependent(this._menu);
			}
			var eDock = sap.ui.core.Popup.Dock;
			this._menu.open(this._bKeyboard,oButton,eDock.BeginTop,eDock.BeginBottom,oButton);
			
        },
        onDialogClose : function() {
			let oDialogView = this.getView();
			let oDialog = oDialogView.byId("listDialog");
			if (oDialog) {
				oDialog.close();
			}
		},
		handleMenuItemPress:function(oEvent){
			
			
			var sId = oEvent.getParameter("item").getId();
			
				
			switch( sId ){
			case "_menu_newAdress":
				this.onButtonNew();
				break;
			case "_menu_addAdress":
				
                this.onButtonAdd();
				break;
			case "_menu_searchAdress":
				this.onButtonList();
			    break;
			default :
				break;
			}
				
			
			
		},
		
		
		handleValueHelp : function(oEvent) {
			let sInputValue = oEvent.getSource().getValue();
			let oDialogView = this.getView();
			let oDialog = oDialogView.byId("listDialog");

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oDialogView.getId(),
						"WT4.view.selectList", this);
				oDialogView.addDependent(oDialog);
			}
			oDialog.getBinding("items").filter([new Filter("KUNNR",sap.ui.model.FilterOperator.Contains,sInputValue)]);
			oDialog.open(sInputValue);
		},
			handleValueHelpClose:function(oEvent){
			var oSelectedItem= oEvent.getParameter("selectedItem");
			if (oSelectedItem){
				var sText = oSelectedItem.getTitle();
				var oAdrComponent = this.getOwnerComponent();
				let oDefaultModel = this.getView().getModel();
				var oAdrModel = oAdrComponent.getModel("adr");
				var oModelData = oAdrModel.getData();
				for ( let i = 0; i < oModelData.ADRESSES.length ; i++) {
					if (oModelData.ADRESSES[i].KUNNR === sText) {
						oDefaultModel.setProperty("/meta/nummer", i);
						this.jumpAdressNumber(this);
						break;
					}
				}
			}
		},
		handleSubmit: function(oEvent){
			var oString = oEvent;
		},
		handleSearch:function(oEvent){
			let sValue = oEvent.getParameter("value");
			var oFilter = new Filter(
					"KUNNR",
					sap.ui.model.FilterOperator.Contains, sValue
				);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		handleValueHelpCancel:function(oEvent){
			oEvent.getSource().getBinding("items").filter([]);
		},

		joiner : Formater.joiner

	});

 
	return oControllerObject 
	});