sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel", "sap/f/library"], function (BaseController, JSONModel, fioriLibrary) {
    "use strict";

    return BaseController.extend("com.te.pollutiontracker.controller.Master", {

        onInit: function () {
            var countriesModel = new JSONModel('https://e24a2784-f019-4696-a387-0dc73eb050ed.mock.pstmn.io/countries');
            countriesModel.setSizeLimit(1000);
            this.getView().setModel(countriesModel, 'countries');
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onCountryPress: function (oEvent) {
            var country = oEvent.getSource().getBindingContext("countries").getObject().country;
            this.oRouter.navTo("detail", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, country: country });
        }
    });
});
