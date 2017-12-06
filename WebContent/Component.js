/**
 * 
 */
sap.ui.define([ "sap/ui/core/UIComponent",
		"sap/ui/model/resource/ResourceModel", "sap/ui/model/json/JSONModel" ],
		function(UIComponent, ResourceModel, JSONModel) {
			"use strict";
			return UIComponent.extend("WT4.Component", {
				metadata : {
					manifest : "json"
				},
				init : function() {
					UIComponent.prototype.init.apply(this, arguments);
					var i18nModel = new ResourceModel({
						bundleName : "WT4.i18n.i18n"
					});
					this.setModel(i18nModel, "i18n");
					var oJModelData = {
						Adress : {
							name1 : "John",
							name2 : "Doom"
						}
					}
				   var oJsonModel = new JSONModel(oJModelData);
					this.setModel(oJsonModel);
                   
				}
			});
		});