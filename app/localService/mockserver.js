sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	return {
		init: function () {
			// create
			var oMockServer = new MockServer({
				rootUri: "/v2/AdressODATA/"
			}); 
/*			var oUriParameters = jQuery.sap.getUriParameters();
			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 1000
			}); */
			// simulate
//			var sPath = jQuery.sap.getModulePath("WT4.localService");
			oMockServer.simulate("../localService/metadata.xml", 
					{sMockdataBaseUrl: "../localService/mockdata",
				     bGenerateMissingMockData: false });
			// start
			oMockServer.start();
		}
	};
});