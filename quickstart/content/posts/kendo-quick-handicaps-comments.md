---
title: 'Kendo - several useful helpers'
slug: '/2016/07/06/kendo-quick-handicaps/'
date: Wed, 06 Jul 2016 19:36:09 +0000
draft: false
category: 'Kendo'
tags: ['']
---


#### 
[Dr Feelbad]( "drumdumb@hotmail.com") - <time datetime="2016-10-24 17:53:00">Oct 1, 2016</time>

Sorted checkbox multi filter list: I am having a problem with setting the data to the view in this example. The view for some reason is only holding a subset of the data, so when I sort and assign the view to the data the values that were missing from view are now missing from data as well. It looks like the view member only displays the values that are visible (i.e., in the scrollable filter dropdown) while data holds all distinct values from the column. Thus applying the sort to the view and then assigning the view to the data deletes those values that were not visible. Any advice on this would be helpful.
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-10-25 01:23:00">Oct 2, 2016</time>

Could you describe how you get this subset of data? Paste any code? In my app I can filter table any way i want, and after running sorting helper this line: var view = filterMultiCheck.checkSource.view(); returns whole column data.
<hr />
#### 
[Dr Feelbad]( "drumdumb@hotmail.com") - <time datetime="2016-10-25 17:08:00">Oct 2, 2016</time>

From the moment we enter the onclick filter handler, the filter's checkSource.view() only contains a partial set of the total distinct set of columns values. checkSource.data() contains the full set of distinct column values, but view() does not. And since the sort has us perform a sort on the checkSource object and then set the data to the view (transformed to JSON), the data is then set to that subset, and while it is sorted, it is not a complete set. These two lines are the one's in question: filterMultiCheck.checkSource.sort({ field: fieldName, dir: "asc" }); filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON()); But as I stated above, long before we get to this point, view() and data() are not set to the same values.
<hr />
#### 
[Dr Feelbad]( "drumdumb@hotmail.com") - <time datetime="2016-10-25 19:25:00">Oct 2, 2016</time>

Okay, upon further investigation, I found a filter that is being applied to the main grid datasource that is then being propagated to the checkSource object as well. I was not aware that grid datasource filters were also applied to the filter's datasource as well. I'm not exactly sure how resolve this because I still need the filter on the grid. Will investigate further.
<hr />
#### 
[Kirsty Pollock]( "kirstyannepollock@gmail.com") - <time datetime="2017-06-01 12:42:00">Jun 4, 2017</time>

Great article - but I cannot get the "Sorted checkbox multi filter list" example to work. No errors, just the filter is not sorted. Any useful clues at all?
<hr />
#### 
[Kirsty Pollock]( "kirstyannepollock@gmail.com") - <time datetime="2017-06-01 12:45:00">Jun 4, 2017</time>

Great article - but I cannot get the "Sorted checkbox multi filter list" example to work. No errors, just the filter is not sorted. I am at a loss what to check. Any useful clues at all?
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2017-06-01 13:50:00">Jun 4, 2017</time>

Check if "var json = view.toJSON();" returns correct data. I found out that in some cases (e.g. predefined grouping) there is different shape of data and this code is not working correctly.
<hr />
#### 
[Kirsty Pollock]( "kirstyannepollock@gmail.com") - <time datetime="2017-06-02 08:15:00">Jun 5, 2017</time>

After a bit of investigation, the issue is that the 'columnMenuInit' event is never fired, only 'filterMenuInit'. When I handle 'filterMenuInit' (using standard recommended code), I find that the view is undefined, and the call to view.toJSON therefore fails. Any idea what an overall solution might be?
<hr />
