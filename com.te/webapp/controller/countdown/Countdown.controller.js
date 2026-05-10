sap.ui.define([
	"../BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.te.controller.countdown.Countdown", {
		onInit: function(){
			this.timer = {
				"days" : 0,
				"hours" : 0,
				"minutes" : 0,
				"seconds" : 0
			}
			let myTimerModel = new JSONModel(this.timer);
			this.getView().setModel(myTimerModel, "timer");
			setInterval(this.CalculateTime.bind(this),1000)
			// this.CalculateTime();
		},
		CalculateTime: function(){
			let birthday = new Date("Oct 10 2026");
			let currentdate = new Date();
			let diff = birthday.getTime() - currentdate.getTime();
			this.timer.days = Math.floor(diff/ (1000*60 * 60 * 24));
			this.timer.hours = Math.floor( (diff % (1000 * 60 * 60 * 24)) / (1000*60 * 60));
			this.timer.minutes = Math.floor( (diff % (1000 * 60 * 60)) / (1000 * 60) );
			this.timer.seconds = Math.floor( (diff % (1000 * 60 )) / (1000) )

			this.getView().getModel("timer").setData(this.timer)

		}
	});
});
