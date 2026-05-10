sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel"], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.te.myportfolio.controller.Main", {
		onInit: function () {
			let oModel = new JSONModel("../model/data.json");
			this.getView().setModel(oModel, "portfolio")
		}
	});
});
