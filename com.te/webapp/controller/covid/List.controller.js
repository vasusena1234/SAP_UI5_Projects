sap.ui.define([
	"../BaseController",
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format'
], function (BaseController, JSONModel, ChartFormatter, Format) {
	"use strict";

	return BaseController.extend("com.te.controller.covid.List", {
		dataPath: "https://api.rootnet.in/covid19-in/stats/latest",

		onInit: function () {
			var dataModel = new JSONModel(this.dataPath);
			this.getView().setModel(dataModel, "Latest");


		}
		
	});
});