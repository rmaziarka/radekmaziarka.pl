---
title: 'PowerApps - few words against'
slug: '/2017/07/08/powerapps-few-words-against/'
date: Sat, 08 Jul 2017 20:21:50 +0000
draft: false
featured_image: 'images/2017/07/3338426105_771215c074_b.jpg'
category: 'Other'
tags: ['']
---

For my client I wanted to add option to create quality complaint just from mobile device - run camera and take few photos, add some description and push it to world. I heard that [PowerApps](https://powerapps.microsoft.com/pl-pl/) are very good for such functionality - they are cross-platform, mostly clickable without knowledge how device operation system runs, you need only to add some controls to the form and it's working. Unfortunately reality has appeared totally different. I found cases which forbidded me to go deeper into that idea and at the end I had to divide my way with PowerApps. Here you got some points to reveal my way:

### Editor is user-hostile

I was really amazed by PowerApps editor, how it can be unclear and unfriendly for a newcomer. From my perspective it was really hard to write your own data functions (you need to write a lot of them to do something useful in PowerApps) and digging through documentation wasn't exactly helping. E.g. function **Text **in documentation is responsible for "Formats a number as a string for display.". So of course you are using it to format dates as well. I was trying put function **LookUp **(responsible for dynamic joins) in card header but the same code working in textbox couldn't work in label. Madness. In editor you can move all fields by dragging them, except for DataCards - they are moveable by option fields  in right panel. I was trying to move a copy of an input from DataCard to other place but app didn't allow for such things. I was trying to find how searchbox works and I failed. On the top of it whole application is just slow. I am quite used to it, due to my experience with Visual Studio, but this app froze even when I was trying to put some controls on form or edit query.

### Schemaless datasource is not working

There is a plugin to connect CosmosDB (former DocumentDb) to PowerApps. And it's not very useful. You can see how many databases there are, and get their names, see how many collections there are and get their names, see how many docs are in each collection. But you can't **get access to a single document**. All is explained [here](https://powerusers.microsoft.com/t5/PowerApps-Forum/PowerApp-DocumentDB/td-p/30387) - "PowerApps requires to understand the schema". In my opinion, releasing such plugin deceives people that PowerApps is really powerful product but actually is a very leaky and inflated.

### SQL Views  are not working

At the beginning I created SQL view to pull it in PowerApps and list all items. I made simple query to gather all foreign tables in single view. And I spent a lot of time resolving problem with not showing this view in PowerApps field editor. And I couldn't do it because **it is not possible** - there is an [open reques](https://powerusers.microsoft.com/t5/PowerApps-Ideas/PowerApps-must-also-see-SQL-Azure-Queries-not-only-Tables/idi-p/863)t in PowerApps' ideas box, staying there from april 2016. At the end I had to use LookUp function with strange dynamic joins and really bad performance outcome.

### Custom code is not  an option

You are unable to write custom code to improve behaviour of your application and ease managing it. **Only functions are available** with theirs unfriendly meta-language which makes you each time to look into Google Search to find a resolution to your problem.

### API is (not) an option

Because your API from itself does not contains schema you are unable to connect to it just like you would in your C# application, making GETs and POSTs to it. At the beginning I had tocreate schema for my endpoint, using [Open API](https://swagger.io/getting-started/) (from my experience completely not trival thing to do when you need to post some files). Then I created endpoint connection using online PowerApps [management portal](https://powerapps.microsoft.com/pl-pl/tutorials/register-custom-api/) \- you cannot do it from desktop app. At the end I was trying to connect my form to this API but of course I failed - I could find my API in data sources but I couldn't click on it to make it selected. Of course it was working  for SQL tables. I spent hour to resolve it and nothing. At the end: ![](https://cdn.someecards.com/someecards/usercards/1346750453712_6755651.png) I went back to build online app to do that complaint report functionality.