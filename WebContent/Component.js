/**
 * 
 */
sap.ui.define([ "sap/ui/core/UIComponent",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/model/json/JSONModel"
		
		],
		function(UIComponent, ResourceModel, JSONModel,Formater) {
			"use strict";
			return UIComponent.extend("WT4.Component", {
				metadata : {
					manifest : "json"
				},
				init : function() {
					UIComponent.prototype.init.apply(this, arguments);
					let oMessageManger = sap.ui.getCore().getMessageManager();
					var i18nModel = new ResourceModel({
						bundleName : "WT4.i18n.i18n"
					});
					this.setModel(i18nModel, "i18n");
//					var oJModelData = {
//						nummer : 0,
//						name1 : "Init",
//						name2 : "Init"
//					}
//
//    			   var oJsonModel = new JSONModel(oJModelData);
//					this.setModel(oJsonModel);
                   
				}
			});
		});