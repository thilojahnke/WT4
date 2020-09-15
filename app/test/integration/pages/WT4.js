/**
 * 
 */
sap.ui.require([ "sap/ui/test/Opa5" ], function(Opa5) {
	"use.strict";
	Opa5.createPageObjects({
		onTheAppPage : {
			actions : {
				iPressTheListButton : function() {
					var listBoxButton = null;
					return this.waitFor(
						{ controlType : "sap.m.Button",
						check : function(aButtons) {

							var mButtonIds = aButtons
									.filter(function(oButton) {
										if (oButton.getId().indexOf(
												"--LISTBUTTON") > -1) {
											return oButton;
										}
									});
							if (mButtonIds.length == 1 ){
								listBoxButton = mButtonIds[0];
								return true;
							} else {
								return false;
							}		
						},

						success : function(aButtons) {
							//listBoxButton = aButtons[2];
							listBoxButton.$().trigger("tap");
						},
						errorMessage : "Did not find the right Button"
					});
				}

			},
			assertions : {
				iShouldSeeADialog : function() {
					return this.waitFor({
						controlType : "sap.m.Dialog",
						success : function() {
							Opa5.assert.ok(true, "The dialog is open");
						},
						errorMessage : "Did not find an open Dialog"
					});
				}

			}
		}
	})
})