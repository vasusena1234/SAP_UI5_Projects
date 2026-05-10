sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.te.controller.Tiles", {
		onInit: function () {
			let myTilesModel = new JSONModel("../model/tiles.json");
			this.getView().setModel(myTilesModel, "tiles")
		},
		press: function (oRoute) {
			if (oRoute.substring(0, 4) === 'EXT-') {
				let selItem = JSON.parse(this.getView().getModel("tiles").getJSON()).find(item => { if (item.route == oRoute) { return item; } });
				sap.m.URLHelper.redirect(selItem.url);

			} else {

				this.getOwnerComponent().getRouter().navTo(oRoute);
			}
		}
	});
});
