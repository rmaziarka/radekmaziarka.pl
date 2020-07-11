---
title: 'Kendo - several useful helpers'
url: '/2016/07/06/kendo-quick-handicaps/'
date: Wed, 06 Jul 2016 19:36:09 +0000
draft: false
images: ['images/2016/07/HNCK2697.jpg']
category: 'Kendo'
tags: ['']
---

I would like to share with you my kendo helper functions and directives. I hope, that they will ease develop your apps:

### Grid group count header:

Simple function to add count information to group header for all columns. If group header template is defined, it will only add count at the end (helpful for date columns etc.)
```javascript
function addCountToGroupHeader(columns){
	columns.forEach(function (column) {
		if (!column.field)
			return;

		column.groupHeaderTemplate = column.groupHeaderTemplate 
                    || column.title + ": #= value #";

		column.groupHeaderTemplate += " (#= count #)";

		column.aggregates = column.aggregates || [];
		column.aggregates.push('count');
	});
}
```

### Filter multi checkboxes and search by nullable fields

By default, kendo has no option to filter fields with null value in checkbox filter. [Here](http://www.telerik.com/forums/multi-filter-with-null-values---they-are-not-visible) you got the explanation of that fact. To omit it we can replace all nullable fields with empty strings.
```javascript
var fieldsToNullify = ['field1', 'field2', 'field3', 'field4'];

// grid declaration
dataBinding: function (e) {
	var rows = e.items || [];

	for (var j = 0; j < rows.length; j++) {
		var row = rows[j];
		if (!row) continue;
		
        fieldsToNullify.forEach(function (field) {
            if (!row[field])
                row[field] = '';
        });
    }
},
```

### Sorted checkbox multi filter list

Elements in checkbox multi filter list are displayed by their order in datasource. Typically you would like to have that list sorted, ascending or descending. 
```javascript
var dictionaryFieldsToSort = {
    "field1": "asc",
    "field2": "desc"
};

// grid declaration
columnMenuInit: function (e) {
    if (dictionaryFieldsToSort[e.field]) {
        var sortOrder = dictionaryFieldsToSort[e.field];
        filterHelper.createSortedMultiCheckList(this, e);
    }
},

// filtrHelper method
function createSortedMultiCheckList(grid, event, sortOrder) {
    // find chexkbox multi filter menu in normal menu or extended
    var filterMultiCheck = grid.thead.find("[data-field=" + event.field + "]").data("kendoFilterMultiCheck")
        || event.container.find("[data-role='filtermulticheck']").data("kendoFilterMultiCheck");

    filterMultiCheck.container.empty();
    filterMultiCheck.checkSource.sort({ field: event.field, dir: sortOrder});

    var view = filterMultiCheck.checkSource.view();
    var json = view.toJSON();

    filterMultiCheck.checkSource.data(json);
    filterMultiCheck.createCheckBoxes();
}
```

### Showing / hiding hierarchy expander

Simple directive to show / hide hierarchy expander on the basis of a expression from the attribute.
```javascript
angular.module('app').directive('hideHierarchyExpander', hideHierarchyExpanderDirective);

function hideHierarchyExpanderDirective() {
    return {
        link: function (scope, element, attrs) {
            scope.$on("kendoWidgetCreated", function (event, widget) {

                if (widget !== element.getKendoGrid())
                    return;

                hideHierarchyExpander(scope, element, attrs);

                element.data("kendoGrid").bind('dataBound', function () {
                    hideHierarchyExpander(scope, element, attrs);
                });
            });
        }
    };

    function hideHierarchyExpander(scope, element, attrs) {
        var rows = element.getKendoGrid().tbody.find('tr');
        rows.each(function () {
            var rowScope = angular.element(this).scope();
            var hideElement = scope.$eval(attrs.kendoGridHideHierarchyExpander, { entry: rowScope.dataItem });
            if (hideElement) {
                var expander = $(this).find('.k-hierarchy-cell a');
                expander.hide();
            }
        });
    }
}
```
```html
<div kendo-grid="ctrl.grid" options="ctrl.gridOptions" hide-hierarchy-expander="ctrl.hideHierarchyExpanderCondition(entry)">
    <div k-detail-template>
        <div kendo-grid k-options="ctrl.detailGridOptions(dataItem)"></div>
    </div>
</div>
```

### Model required validation

Directive for combobox and autocomplete controls to force user to select value from predefined list. 
```javascript
function modelRequiredDirective() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            scope.$on("kendoWidgetCreated", function (event, widget) {
                if (widget !== element.getKendoComboBox()
                        || widget !== element.getKendoAutocomplete())
                    return;

                ctrl.$validators.modelRequired = function () {
                    if (!widget.text())
                        return true;

                    if (widget.dataItem())
                        return true;

                    return false;
                };
            });
        }
    };
}
```

Enjoy :)

---
### Comments:
#### 
[Dr Feelbad]( "drumdumb@hotmail.com") - <time datetime="2016-10-24 17:53:00">Oct 1, 2016</time>

Sorted checkbox multi filter list:

I am having a problem with setting the data to the view in this example.  The view for some reason is only holding a subset of the data, so when I sort and assign the view to the data the values that were missing from view are now missing from data as well.  It looks like the view member only displays the values that are visible (i.e., in the scrollable filter dropdown) while data holds all distinct values from the column.  Thus applying the sort to the view and then assigning the view to the data deletes those values that were not visible.  Any advice on this would be helpful.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-10-25 01:23:00">Oct 2, 2016</time>

Could you describe how you get this subset of data? Paste any code? 

In my app I can filter table any way i want, and after running sorting helper this line:
var view = filterMultiCheck.checkSource.view();
returns whole column data.
#### 
[Dr Feelbad]( "drumdumb@hotmail.com") - <time datetime="2016-10-25 17:08:00">Oct 2, 2016</time>

From the moment we enter the onclick filter handler, the filter's checkSource.view() only contains a partial set of the total distinct set of columns values.  checkSource.data() contains the full set of distinct column values, but view() does not.  And since the sort has us  perform a sort on the checkSource object and then set the data to the view (transformed to JSON), the data is then set to that subset, and while it is sorted, it is not a complete set.

These two lines are the one's in question:
  filterMultiCheck.checkSource.sort({ field: fieldName, dir: "asc" });
  filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());

But as I stated above, long before we get to this point, view() and data() are not set to the same values.
#### 
[Dr Feelbad]( "drumdumb@hotmail.com") - <time datetime="2016-10-25 19:25:00">Oct 2, 2016</time>

Okay, upon further investigation, I found a filter that is being applied to the main grid datasource that is then being propagated to the checkSource object as well.  I was not aware that grid datasource filters were also applied to the filter's datasource as well.  I'm not exactly sure how resolve this because I still need the filter on the grid.  Will investigate further.
#### 
[Kirsty Pollock]( "kirstyannepollock@gmail.com") - <time datetime="2017-06-01 12:42:00">Jun 4, 2017</time>

Great article - but I cannot get the "Sorted checkbox multi filter list" example to work. No errors, just the filter is not sorted. Any useful clues at all?
#### 
[Kirsty Pollock]( "kirstyannepollock@gmail.com") - <time datetime="2017-06-01 12:45:00">Jun 4, 2017</time>

Great article - but I cannot get the "Sorted checkbox multi filter list" example to work. No errors, just the filter is not sorted.  I am at a loss what to check. Any useful clues at all?
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2017-06-01 13:50:00">Jun 4, 2017</time>

Check if "var json = view.toJSON();" returns correct data. I found out that in some cases (e.g. predefined grouping) there is different shape of data and this code is not working correctly.
#### 
[Kirsty Pollock]( "kirstyannepollock@gmail.com") - <time datetime="2017-06-02 08:15:00">Jun 5, 2017</time>

After a bit of investigation, the issue is that the 'columnMenuInit' event is never fired, only 'filterMenuInit'. When I handle 'filterMenuInit' (using standard recommended code), I find that  the view is undefined, and the call to view.toJSON therefore fails. Any idea what an overall solution might be?
