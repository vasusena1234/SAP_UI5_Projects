sap.ui.define([
	"../BaseController",
	'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.te.controller.vacc.Vacc", {

		onInit: function () {

			let myVaccModel = new JSONModel("../model/vacc.json");
			this.getView().setModel(myVaccModel, "vacc");

			let myViewConfig = {
				"table" : true,
				"calendar" : false
			}

			let myViewModel = new JSONModel(myViewConfig);
			this.getView().setModel(myViewModel, "view");
		},
		formatDate : function(input){
			return new Date(input);
		},
		formatState : function(input){
			let currDate = new Date();
			let inputDate = new Date(input);
			if(currDate > inputDate)  return 'Success'
			else  return 'Error'
		}
	});
});