/**
 * 
 */
sap.ui.require([
	"sap/ui/test/opaQunit"
],function(){
	"use.strict";
	QUnit.module("Navigation");
	opaTest("Open Dialog",function(Given,When,Then){
		Given.iStartMyAppInAFrame(jQuery.sap.getResourcePath("WT4/test",".html"));
		When.onTheAppPage.iPressTheListButton();
		Then.onTheAppPage.iShouldSeeADialog().and.iTeardownMyAppFrame();
	})
})