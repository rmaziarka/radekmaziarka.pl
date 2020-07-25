---
title: 'Kendo + slider + custom labels'
url: '/2017/10/14/kendo-slider-custom-labels/'
date: Sat, 14 Oct 2017 19:51:16 +0000
draft: false
images: ['images/2017/10/kendoka-08-350.png']
description: "How to dynamically change labels in kendo slider."
category: 'Kendo'
tags: ['']
---

In my project, I wanted to change labels from slider to different one. By default, labels are defined as a range of values - for example, from 0 to 10, with a step of 2. My need was to show the array of [1, 2, 4, 6, 10, 16]. And unfortunately, **kendo slider does not accept custom values**. So I started looking what I can do in such situation.

I found in StackOverFlow [answer](https://stackoverflow.com/questions/9879625/how-to-modify-the-labels-on-a-kendoui-slider-ticks) to my question - some guy changed these values by a simple script in jquery. Seemed really straightforward, and what is obvious in such situations - it didn't help me. The script changed the values, but they returned to the previous state. Really weird situation.

It turned out that kendo, during the window's opening, **resizes the slider**. And redraws all labels. So all I had to do was to override resize function to change label after base call:
```
        $scope.$on("kendoWidgetCreated", function (event, widget) {
            if (widget === sliderControl) {
                var baseResize = widget.resize;

                widget.resize = function() {
                    baseResize.call(widget);
                    // change lables
                }
            }
        });
```
And everything started working well :)