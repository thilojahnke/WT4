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
return Control.extend("WT4.control.AdressRating",{
	metadata: {
		properties: {
			value : {type: "float", defaultValue: 0 }
		},
		aggregations: {
			_rating: {type: "sap.m.RatingIndicator", multiple : false, visibility: "hidden" },
			_label: {type: "sap.m.Label", multiple: false, visibility: "hidden" },
			_button: {type: "sap.m.Button", multiple: false, visibility: "hidden" }
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
		this.setAggregation("_button", new Button({
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
		this.getAggregation("_button").setEnabled(true);	
	},
	_onRate : function (oEvent) {
		var fValue = oEvent.getParameter("value");
		this.setProperty("value", fValue, true);
		this.getAggregation("_label").setText("RatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]);
		this.getAggregation("_label").setDesign("Bold");
	},
	_onSubmit : function (oEvent) {
		

		this.getAggregation("_rating").setEnabled(false);
		this.getAggregation("_label").setText("RatingLabelFinal");
		this.getAggregation("_button").setEnabled(false);
		this.fireEvent("change", {
			value: this.getValue()
		});
	},
	renderer: function(oRM,oControl){
		oRM.write("<div");
		oRM.writeControlData(oControl);
//		oRM.addClass("myAppDemoWTProductRating");
//		oRM.writeClasses();
		oRM.write(">");
		oRM.renderControl(oControl.getAggregation("_rating"));
		oRM.renderControl(oControl.getAggregation("_label"));
		oRM.renderControl(oControl.getAggregation("_button"));
		oRM.write("</div>");
	}

})
	
	
})