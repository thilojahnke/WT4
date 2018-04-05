sap.ui.define([ "sap/ui/core/mvc/Controller",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"WT4/controller/formater"

], function(Controller, ResourceModel, JSONModel, Filter, Formater) {

	"use strict";

	return Controller.extend("WT4.controller.address", {
		onInit : function() {
			var oAdrComponent = this.getOwnerComponent();
			var oJModelData = {
				meta : {
					nummer : 0,
					
				},
				kunnr : "",
				name1 : "",
				name2 : ""
			};

			var oJsonModel = new JSONModel(oJModelData);
			this.getView().setModel(oJsonModel);

			var oAdrElement = this.getView().byId("page1");
			
			var oOAdrModel = oAdrComponent.getModel("oAdr");
            oOAdrModel.read("/ADRESSES",{
            	success : function(oData,response){
            	  var oModelData = { "ADRESSES":  oData.results };
            	  var oAdrModel = oAdrComponent.getModel("adr");
            	  oAdrModel.setData(oModelData);
            	},
            	error: function(oError){
            	 alert("Reading the ODATA Service Failed");
            	}
            	
            } );
			/*
			 * var oInputElement = this.getView().byId("inputIndex"); let
			 * oMessageManger = sap.ui.getCore().getMessageManager();
			 * oMessageManger.registerObject(oInputElement,true);
			 */
			// var oAdrBinding = "/";
			// var oAdrElementBound = oAdrElement.bindElement(oAdrBinding);

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
			let sPathToAdress = "/ADRESSES/" + strShowNumber + "/";
			let oAdrModelDetail = oAdrModel.getProperty(sPathToAdress);
			oDefaultModel.setProperty("/kunnr", oAdrModelDetail.KUNNR);
			oDefaultModel.setProperty("/name1", oAdrModelDetail.NAME1);
			oDefaultModel.setProperty("/name2", oAdrModelDetail.NAME2);

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
			oDefaultModel.setProperty("/meta/nummer", nEntryNumber);

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
		onDialogClose : function() {
			let oDialogView = this.getView();
			let oDialog = oDialogView.byId("listDialog");
			if (oDialog) {
				oDialog.close();
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
					if (oModelData.Adresses[i].KUNNR === sText) {
						oDefaultModel.setProperty("/meta/nummer", i);
						this.jumpAdressNumber(this);
						break;
					}
				}
			}
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

});