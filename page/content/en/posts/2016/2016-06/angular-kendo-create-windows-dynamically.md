---
title: 'Angular & kendo - create windows dynamically'
url: '/2016/06/23/angular-kendo-create-windows-dynamically/'
date: Thu, 23 Jun 2016 21:40:06 +0000
draft: false
images: ['images/2016/06/photo-1446149710962-26e48a6bda51.jpg']
category: 'Kendo'
tags: ['']
---

In my application there is a page, which contains 15 windows. Each windows is a form with a lot of inputs - comboboxes / datepickers / autocompletes etc. I found out, that opening this page takes about 1.5 sek due to rendering all windows at the begining. It was completely unacceptable so I decided to do something with it. And I did - **dynamic loader** for windows.

I created service called **windowsLoader** which listens to open windows event. Manager contains dictionary, which maps event name to windows template url and in load handler calls for template from cache. Then it compiles downloaded template and opens window. Of course, I haven't forgotten about cleaning, so it binds to **deactivate**'s event to remove element from DOM after closing window.

```javascript
angular.module('application')
    .service('someDomain.windowsLoader', windowsLoader);

windowsLoader.$inject = ['$rootScope', '$http', '$templateCache', '$compile'];
function windowsLoader($rootScope, $http, $templateCache, $compile) {

    var eventToWindowUrlDict = {
        'someDomain.openWindow': '/app/pathTo/windowTemplates/windowTemplate.html',
        'someDomain.openAnotherWindow': '/app/pathTo/windowTemplates/anotherWindowTemplate.html'
    }

    Object.keys(eventToWindowUrlDict).forEach(function (eventName) {
        $rootScope.$on(eventName, loadWindow);
    });

    function loadWindow(event) {
        var windowTemplateUrl = eventToWindowUrlDict[event.name];
        var args = arguments;

        $http.get(windowTemplateUrl, { cache: $templateCache }).success(function (tplContent) {
            var scope = $rootScope.$new();
            var element = $compile(tplContent)(scope);

            var ctrl = element.scope().ctrl;
            ctrl.openWindow.apply(ctrl, args);
            ctrl.window.bind('deactivate', function () {
                element.remove();
            });
        });
    }
}
```

To be consistent I use convention, that every window should have controller named as **ctrl**, and kendo window should be called **window**. It allows me to use this manager in every situation.

This is example of my window:
```html
<div kendo-window="ctrl.window" ng-controller="domain.someWindowCtrl as ctrl" 
    k-modal="true" k-visible="false">
     ...
</div>
```

And example of window's controller
```javascript
angular.module('application')
    .controller('domain.someWindowCtrl', ctrl);

ctrl.$inject = ['injectedService'];
function ctrl(injectedService) {
    var self = this;

    self.openWindow = function (event, eventData) {
        // logic before opening window

        self.window.center();
        self.window.open();
    }
}
```

### Problem with controls' cascading

The drawbacks of such solution is, that during template compilation, created window is still in memory. So every control, which is dependent on another control, won't find the connection and won't work correctly. It stroked me because I have window where two comboboxes relates to each other. After window opening, I noticed that second combobox works independently, and do not response on first combobox changes.

I found solution on kendo's angular documentation, which mentions about **k-ng-delay** directive. It allows to postpone control initialization, and wait till directive parameter is defined.

```html
<input kendo-drop-down-list k-ng-model="ctrl.modelId" k-cascade-from="'parentControlId'" 
       k-cascade-from-field="'fieldId'" k-ng-delay="ctrl.parentInitialized"
       k-data-source="ctrl.list" k-data-value-field="'id'" k-data-text-field="'number'"  />
```

```javascript
self.openWindow = function (event, eventData) {
    self.parentInitialized= true;
    // logic before opening window

    self.window.center();
    self.window.open();
}
```

As you can see, I attach my control to **parentInitialized** field and set it to true during window opening. And it works :)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Angular-kendo-create-windows-dynamically-RadBlog "") - <time datetime="2016-06-23 22:40:58">Jun 4, 2016</time>

**Angular & kendo – create windows dynamically | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
