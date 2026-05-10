sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: com.te",
		defaults: {
			page: "ui5://test-resources/com/te/Test.qunit.html?testsuite={suite}&test={name}",
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
				only: "com/te/",
				never: "test-resources/com/te/"
			},
			loader: {
				paths: {
					"com/te": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for com.te"
			},
			"integration/opaTests": {
				title: "Integration tests for com.te"
			}
		}
	};
});
