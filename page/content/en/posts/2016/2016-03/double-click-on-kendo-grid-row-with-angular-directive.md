---
title: 'Double click on kendo grid row with angular directive'
url: '/2016/03/05/double-click-on-kendo-grid-row-with-angular-directive/'
aliases: ['/en/2016/03/05/double-click-on-kendo-grid-row-with-angular-directive/']
date: Sat, 05 Mar 2016 14:42:39 +0000
draft: false
images: []
category: 'Kendo'
tags: ['']
---

In my application, I wanted to handle double click on grid's row by redirecting user to page, which contained detailed data about this particular row. Unfortunately, none of existing implementation did not satisfied me, because it either binded to _dbClick_ event in controller, or used _rowTemplate_ to show data in grid. I was very determined to create a new directive to handle it, because I needed a shared solution to avoid copying code from one controller to another. So i created my own implementation - **kendoGridRowDblClick** directive:

```javascript
(function () {
    angular.module('moduleName').directive('kendoGridRowDblClick', kendoGridRowDblClick);

    function kendoGridRowDblClick() {
        return {
            link: function (scope, element, attrs) {
                scope.$on("kendoWidgetCreated", function (event, widget) {

                    if (widget !== element.getKendoGrid())
                        return;

                    attachDblClickToRows(scope, element, attrs);

                    element.data("kendoGrid").bind('dataBound', function () {
                        attachDblClickToRows(scope, element, attrs);
                    });
                });
            }
        };

        function attachDblClickToRows(scope, element, attrs) {
                element.find('tbody tr').on('dblclick', function (event) {
                    var rowScope = angular.element(event.currentTarget).scope();
                    scope.$eval(attrs.kendoGridRowDblClick, { rowData: rowScope.dataItem });
                });
        }
    }
})();
```

Directive's link function runs before initialization of kendo grid, so we need to postpone binding to _dbClick_ event. At the beginning, I used _$timeout_ to do it, but i decided not to make such workaround in my code. Finally I bumped into [this](http://docs.telerik.com/kendo-ui/AngularJS/global-events) article, describing _kendoWidgetCreated_ event,  which allowed me to connect directly to initialization of my grid.

Then, in directive, I run _attachDblClickToRows_ function to bind dbClick event to rows. Of course, I did not forget to connect _attachDblClickToRows_ to grid's _dataBound _event - it's needed because kendo redraws the rows every time, when the new data is bound.

In _attachDblClickToRows_ function I used _angular.element _and _scope.$eval _to get data from particular row and run code from controller, which handled _dbClick_ event.

Use of this directive is very simple:

```html


<div kendo-grid options="ctrl.gridOptions" kendo-grid-row-dbl-click="ctrl.rowDblClick(rowData)">
```


```javascript
self.rowDblClick = function(rowData) {
    // redirect user to details page
};
```

Such implementation allows me to use this directive in various places in my application without bindings to the same grid's events. My controllers are cleaner and it's much easier to understand what logic is done, when _dblClick_ event is raised.

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Double-click-on-kendo-grid-row-with-angular-directive-RadBlog "") - <time datetime="2016-03-05 15:43:53">Mar 6, 2016</time>

**Double click on kendo grid row with angular directive – RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[starata]( "jimpanos@gmail.com") - <time datetime="2016-11-13 23:24:00">Nov 0, 2016</time>

Thanks a lot Radeck,

This is a very useful and helpful post.
