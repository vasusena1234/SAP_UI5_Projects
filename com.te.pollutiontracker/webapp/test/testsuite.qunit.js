sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: com.te.pollutiontracker",
		defaults: {
			page: "ui5://test-resources/com/te/pollutiontracker/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "com/te/pollutiontracker/",
				never: "test-resources/com/te/pollutiontracker/"
			},
			loader: {
				paths: {
					"com/te/pollutiontracker": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for com.te.pollutiontracker"
			},
			"integration/opaTests": {
				title: "Integration tests for com.te.pollutiontracker"
			}
		}
	};
});
