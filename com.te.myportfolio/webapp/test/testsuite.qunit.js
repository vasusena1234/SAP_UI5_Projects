sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: com.te.myportfolio",
		defaults: {
			page: "ui5://test-resources/com/te/myportfolio/Test.qunit.html?testsuite={suite}&test={name}",
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
				only: "com/te/myportfolio/",
				never: "test-resources/com/te/myportfolio/"
			},
			loader: {
				paths: {
					"com/te/myportfolio": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for com.te.myportfolio"
			},
			"integration/opaTests": {
				title: "Integration tests for com.te.myportfolio"
			}
		}
	};
});
