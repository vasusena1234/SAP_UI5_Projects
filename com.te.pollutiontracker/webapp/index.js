sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "com.te.pollutiontracker",
		height: "100%",
		settings: {
			id: "com.te.pollutiontracker"
		},
		manifest: true
	}).placeAt("content");
});
