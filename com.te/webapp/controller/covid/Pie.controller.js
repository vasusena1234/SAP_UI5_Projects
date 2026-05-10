sap.ui.define([
	"../BaseController",
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format'
], function (BaseController, JSONModel, ChartFormatter, Format) {
	"use strict";

	return BaseController.extend("com.te.controller.covid.Pie", {

		dataPath: "https://api.rootnet.in/covid19-in/stats/latest",
		oVizFrame: null,
		onInit: function () {
			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFramepie");
			oVizFrame.setVizProperties({
                legend: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false
                }
            });
			var dataModel = new JSONModel(this.dataPath);
			oVizFrame.setModel(dataModel);

			var oPopOver = this.getView().byId("idPopOverpie");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
		}
	});
});