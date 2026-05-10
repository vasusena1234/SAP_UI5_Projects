sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: com.te.salesorder",
		defaults: {
			page: "ui5://test-resources/com/te/salesorder/Test.qunit.html?testsuite={suite}&test={name}",
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
				only: "com/te/salesorder/",
				never: "test-resources/com/te/salesorder/"
			},
			loader: {
				paths: {
					"com/te/salesorder": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for com.te.salesorder"
			},
			"integration/opaTests": {
				title: "Integration tests for com.te.salesorder"
			}
		}
	};
});
