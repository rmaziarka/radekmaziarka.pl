---
title: 'Kendo - several useful helpers'
slug: '/2016/07/06/kendo-quick-handicaps/'
date: Wed, 06 Jul 2016 19:36:09 +0000
draft: false
category: 'Kendo'
tags: ['']
---

I would like to share with you my kendo helper functions and directives. I hope, that they will ease develop your apps:

### Grid group count header:

Simple function to add count information to group header for all columns. If group header template is defined, it will only add count at the end (helpful for date columns etc.) \[code lang="js"\] function addCountToGroupHeader(columns){ columns.forEach(function (column) { if (!column.field) return; column.groupHeaderTemplate = column.groupHeaderTemplate || column.title + ": #= value #"; column.groupHeaderTemplate += " (#= count #)"; column.aggregates = column.aggregates || \[\]; column.aggregates.push('count'); }); } \[/code\]

### Filter multi checkboxes and search by nullable fields

By default, kendo has no option to filter fields with null value in checkbox filter. [Here](http://www.telerik.com/forums/multi-filter-with-null-values---they-are-not-visible) you got the explanation of that fact. To omit it we can replace all nullable fields with empty strings. \[code lang="js"\] var fieldsToNullify = \['field1', 'field2', 'field3', 'field4'\]; // grid declaration dataBinding: function (e) { var rows = e.items || \[\]; for (var j = 0; j < rows.length; j++) { var row = rows\[j\]; if (!row) continue; fieldsToNullify.forEach(function (field) { if (!row\[field\]) row\[field\] = ''; }); } }, \[/code\]

### Sorted checkbox multi filter list

Elements in checkbox multi filter list are displayed by their order in datasource. Typically you would like to have that list sorted, ascending or descending. \[code lang="js"\] var dictionaryFieldsToSort = { "field1": "asc", "field2": "desc" }; // grid declaration columnMenuInit: function (e) { if (dictionaryFieldsToSort\[e.field\]) { var sortOrder = dictionaryFieldsToSort\[e.field\]; filterHelper.createSortedMultiCheckList(this, e); } }, // filtrHelper method function createSortedMultiCheckList(grid, event, sortOrder) { // find chexkbox multi filter menu in normal menu or extended var filterMultiCheck = grid.thead.find("\[data-field=" + event.field + "\]").data("kendoFilterMultiCheck") || event.container.find("\[data-role='filtermulticheck'\]").data("kendoFilterMultiCheck"); filterMultiCheck.container.empty(); filterMultiCheck.checkSource.sort({ field: event.field, dir: sortOrder}); var view = filterMultiCheck.checkSource.view(); var json = view.toJSON(); filterMultiCheck.checkSource.data(json); filterMultiCheck.createCheckBoxes(); } \[/code\]

### Showing / hiding hierarchy expander

Simple directive to show / hide hierarchy expander on the basis of a expression from the attribute. \[code lang="js"\] angular.module('app').directive('hideHierarchyExpander', hideHierarchyExpanderDirective); function hideHierarchyExpanderDirective() { return { link: function (scope, element, attrs) { scope.$on("kendoWidgetCreated", function (event, widget) { if (widget !== element.getKendoGrid()) return; hideHierarchyExpander(scope, element, attrs); element.data("kendoGrid").bind('dataBound', function () { hideHierarchyExpander(scope, element, attrs); }); }); } }; function hideHierarchyExpander(scope, element, attrs) { var rows = element.getKendoGrid().tbody.find('tr'); rows.each(function () { var rowScope = angular.element(this).scope(); var hideElement = scope.$eval(attrs.kendoGridHideHierarchyExpander, { entry: rowScope.dataItem }); if (hideElement) { var expander = $(this).find('.k-hierarchy-cell a'); expander.hide(); } }); } } \[/code\] \[code lang="html"\] <div kendo-grid="ctrl.grid" options="ctrl.gridOptions" hide-hierarchy-expander="ctrl.hideHierarchyExpanderCondition(entry)"> <div k-detail-template> <div kendo-grid k-options="ctrl.detailGridOptions(dataItem)"></div> </div> </div> \[/code\]

### Model required validation

Directive for combobox and autocomplete controls to force user to select value from predefined list. \[code lang="js"\] function modelRequiredDirective() { return { require: 'ngModel', link: function (scope, element, attrs, ctrl) { scope.$on("kendoWidgetCreated", function (event, widget) { if (widget !== element.getKendoComboBox() || widget !== element.getKendoAutocomplete()) return; ctrl.$validators.modelRequired = function () { if (!widget.text()) return true; if (widget.dataItem()) return true; return false; }; }); } }; } \[/code\] Enjoy :)