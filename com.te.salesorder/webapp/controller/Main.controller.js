sap.ui.define([
	"./BaseController",
	"sap/ui/comp/library",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/type/String',
	"sap/ui/model/json/JSONModel",
	"sap/m/SearchField",
	"sap/m/Token",
	"sap/ui/table/Column",
	"sap/m/Column",
	"sap/m/Label",
	"sap/m/Text",
	"sap/m/ColumnListItem",
], function (BaseController, compLibrary, Filter, FilterOperator, TypeString, JSONModel, SearchField, Token, UIColumn, MColumn, Label, Text, ColumnListItem) {
	"use strict";

	var ValueHelpRangeOperation = compLibrary.valuehelpdialog.ValueHelpRangeOperation;

	return BaseController.extend("com.te.salesorder.controller.Main", {
		onInit: function () {

			let tableFragment = sap.ui.xmlfragment(this.getView().getId(), "com.te.salesorder.view.Items", this)
			this.getView().byId("main").insertContent(tableFragment);

			let filterFragment = sap.ui.xmlfragment(this.getView().getId(), "com.te.salesorder.view.Filter", this)
			this.getView().byId("main").insertContent(filterFragment);

			this._oInput = this.getView().byId("SOrd");
			this._oMultiInput = this.getView().byId("SOrd");
			this._oMultiInput.addValidator(this._onMultiInputValidate);

			let cols = {
				"cols" : [
					{
						"label" : "Sales Order",
						"template" : "SalesOrder"
					},
					{
						"label" : "Sales Order Type",
						"template" : "SalesOrderType"
					}
				]
			}
			this.oColModel = new JSONModel(cols);

		},

		_onMultiInputValidate: function (oArgs) {
			if (oArgs.suggestionObject) {
				let oObject = oArgs.suggestionObject.getBindingContext().getObject();
				let oToken = new Token();
				oToken.setKey(oObject.SalesOrder);
				oToken.setText(oObject.SalesOrderType + " (" + oObject.SalesOrder + ")");
				return oToken;
			}
			return null;
		},

		onSuggestionItemSelected: function (oEvent) {
			oEvent.preventDefault();
		},

		onValueHelpRequested: function () {
			this._oBasicSearchField = new SearchField();
			this.loadFragment({
				name: "com.te.salesorder.view.SOHelp"
			}).then(function (oDialog) {
				var oFilterBar = oDialog.getFilterBar(), oColumnProductCode, oColumnProductName;
				this._oVHD = oDialog;

				this.getView().addDependent(oDialog);

				oDialog.setRangeKeyFields([{
					label: "Sales Order",
					key: "SalesOrder",
					type: "string",
					typeInstance: new TypeString({}, {
						maxLength: 7
					})
				}]);

				oFilterBar.setFilterBarExpanded(false);
				oFilterBar.setBasicSearch(this._oBasicSearchField);

				this._oBasicSearchField.attachSearch(function () {
					oFilterBar.search();
				});

				oDialog.getTableAsync().then(function (oTable) {

					oTable.setModel();

					if (oTable.bindRows) {
						oTable.bindAggregation("rows", {
							path: "/A_SalesOrder",
							events: {
								dataReceived: function () {
									oDialog.update();
								}
							}
						});
						oColumnProductCode = new UIColumn({ label: new Label({ text: "Sales Order" }), template: new Text({ wrapping: false, text: "{SalesOrder}" }) });
						oColumnProductCode.data({
							fieldName: "SalesOrder"
						});
						oColumnProductName = new UIColumn({ label: new Label({ text: "Sales Order Type" }), template: new Text({ wrapping: false, text: "{SalesOrderType}" }) });
						oColumnProductName.data({
							fieldName: "SalesOrderType"
						});
						oTable.addColumn(oColumnProductCode);
						oTable.addColumn(oColumnProductName);
					}

					if (oTable.bindItems) {
						oTable.bindAggregation("items", {
							path: "/A_SalesOrder",
							template: new ColumnListItem({
								cells: [new Label({ text: "{SalesOrder}" }), new Label({ text: "{SalesOrderType}" })]
							}),
							events: {
								dataReceived: function () {
									oDialog.update();
								}
							}
						});
						oTable.addColumn(new MColumn({ header: new Label({ text: "Sales Order" }) }));
						oTable.addColumn(new MColumn({ header: new Label({ text: "Sales Order Type" }) }));
					}
					oDialog.update();
				}.bind(this));

				oDialog.setTokens(this._oMultiInput.getTokens());
				oDialog.open();
			}.bind(this));
		},
		
		onValueHelpOkPress: function (oEvent) {
			var aTokens = oEvent.getParameter("tokens");
			this._oMultiInput.setTokens(aTokens);
			this._oVHD.close();
		},

		onValueHelpCancelPress: function () {
			this._oVHD.close();
		},

		onValueHelpAfterClose: function () {
			this._oVHD.destroy();
		},

		_parseRangeToken: function (oToken) {
			let oRangeData = oToken.data("range");
			if (!oRangeData) {
				return null;
			}

			let sOperation = oRangeData.operation;
			let sValue1 = oRangeData.value1;
			let sValue2 = oRangeData.value2;
			let bExclude = oRangeData.exclude;

			let oFilter;
			switch (sOperation) {
				case ValueHelpRangeOperation.EQ:
					oFilter = new Filter("SalesOrder", FilterOperator.EQ, sValue1);
					break;
				case ValueHelpRangeOperation.BT:
					oFilter = new Filter({
						filters: [
							new Filter("SalesOrder", FilterOperator.BT, sValue1),
							new Filter("SalesOrder", FilterOperator.BT, sValue2)
						],
						and: true
					});
					break;
				case ValueHelpRangeOperation.Contains:
					oFilter = new Filter("SalesOrder", FilterOperator.Contains, sValue1);
					break;
				case ValueHelpRangeOperation.StartsWith:
					oFilter = new Filter("SalesOrder", FilterOperator.StartsWith, sValue1);
					break;
				case ValueHelpRangeOperation.EndsWith:
					oFilter = new Filter("SalesOrder", FilterOperator.EndsWith, sValue1);
					break;
				case ValueHelpRangeOperation.GE:
					oFilter = new Filter("SalesOrder", FilterOperator.GE, sValue1);
					break;
				case ValueHelpRangeOperation.GT:
					oFilter = new Filter("SalesOrder", FilterOperator.GT, sValue1);
					break;
				case ValueHelpRangeOperation.LE:
					oFilter = new Filter("SalesOrder", FilterOperator.LE, sValue1);
					break;
				case ValueHelpRangeOperation.LT:
					oFilter = new Filter("SalesOrder", FilterOperator.LT, sValue1);
					break;
				case ValueHelpRangeOperation.NE:
					oFilter = new Filter("SalesOrder", FilterOperator.NE, sValue1);
					break;
				default:
					oFilter = new Filter("SalesOrder", FilterOperator.EQ, sValue1);
			}

			if (bExclude) {
				return new Filter({ filters: [oFilter], and: true, not: true });
			}

			return oFilter;
		},

		onSearch: function () {
			let oTable = this.getView().byId("idSalesTable");
			let oBindingInfo = oTable.getBindingInfo("items");

			let aFilters = [];

			let aTokens = this._oMultiInput.getTokens();
			if (aTokens.length > 0) {
				let aTokenFilters = [];
				aTokens.forEach(function (oToken) {
					let oRangeData = oToken.data("range");
					if (oRangeData) {
						let oParsedFilter = this._parseRangeToken(oToken);
						if (oParsedFilter) {
							aTokenFilters.push(oParsedFilter);
						}
					} else {
						aTokenFilters.push(new Filter("SalesOrder", FilterOperator.EQ, oToken.getKey()));
					}
				}.bind(this));

				if (aTokenFilters.length > 0) {
					aFilters.push(new Filter({ filters: aTokenFilters, and: false }));
				}
			}

			let sSalesOrderType = this.getView().byId("SOrdTy").getValue();
			if (sSalesOrderType) {
				aFilters.push(new Filter("SalesOrderType", FilterOperator.EQ, sSalesOrderType));
			}

			let sSalesOrg = this.getView().byId("SOrg").getValue();
			if (sSalesOrg) {
				aFilters.push(new Filter("SalesOrganization", FilterOperator.EQ, sSalesOrg));
			}

			oTable.bindItems({
				path: "/A_SalesOrder",
				filters: aFilters,
				sorter: oBindingInfo ? oBindingInfo.sorter : undefined,
				template: this.getView().byId("sales")
			});
		}
	});
});
