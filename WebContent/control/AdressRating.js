/**
 * 
 */
sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/RatingIndicator",
	"sap/m/Label",
	"sap/m/Button"
],function(Control,RatingIndicator,Label,Button){
"use strict";
var oControllerObject = Control.extend("WT4.control.AdressRating",{
	metadata: {
		properties: {
			value : {type: "float", defaultValue: 0 }
		},
		aggregations: {
			_rating: {type: "sap.m.RatingIndicator", multiple : false, visibility: "hidden" },
			_label: {type: "sap.m.Label", multiple: false, visibility: "hidden" },
			_button1: {type: "sap.m.Button", multiple: false, visibility: "hidden" }
		},
		events : {
			change: {
				parameters: {
					value: {type: "int" }
				}
			}
		}
	},
	init: function(){
		this.setAggregation("_rating", new RatingIndicator({
			value: this.getValue(),
			maxValue : 6,
			iconSize: "2rem",
			visualMode: "Half",
			liveChange: this._onRate.bind(this)
			
			}));
		this.setAggregation("_label", new Label({
			text : "Hallo Rating"
		}).addStyleClass("sapUiSmallMargin"));
		this.setAggregation("_button1", new Button({
			text : "Button",
			press: this._onSubmit.bind(this)
		}).addStyleClass("sapUiTinyMarginTopBottom"));
	},
	
	setValue: function (fValue) {
		this.setProperty("value", fValue, true);
		this.getAggregation("_rating").setValue(fValue);
	},
	reset: function () {
		this.setValue(0);
		this.getAggregation("_label").setDesign("Standard");
		this.getAggregation("_rating").setEnabled(true);
		this.getAggregation("_label").setText("LabelInitial");
		this.getAggregation("_button1").setEnabled(true);	
	},
	_onRate : function (oEvent) {
		var fValue = oEvent.getParameter("value");
		this.setProperty("value", fValue, true);
		this.getAggregation("_label").setText(this.getRatingText(fValue));
		this.getAggregation("_label").setDesign("Bold");
	},
	_onSubmit : function (oEvent) {
		

  /*  	this.getAggregation("_rating").setEnabled(false);
		this.getAggregation("_label").setText("RatingLabelFinal");
		this.getAggregation("_button1").setEnabled(true);*/
		this.fireEvent("change", {
			value: this.getValue()
		});
	},
	getRatingText(value){
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleName : "WT4.i18n.i18n"
		});
		var test = i18nModel.getProperty("/Rating1");
		return "ungenügend";
		
		
		
	},
	renderer: function(oRM,oControl){
		oRM.write("<div");
		oRM.writeControlData(oControl);
//		oRM.addClass("myAppDemoWTProductRating");
//		oRM.writeClasses();
		oRM.write(">");
		oRM.renderControl(oControl.getAggregation("_rating"));
		oRM.renderControl(oControl.getAggregation("_label"));
		oRM.renderControl(oControl.getAggregation("_button1"));
		oRM.write("</div>");
	}

})
	
return oControllerObject;
	
})