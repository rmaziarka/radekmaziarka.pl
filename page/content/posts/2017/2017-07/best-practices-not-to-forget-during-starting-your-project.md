---
title: 'Best practices not to forget during starting your project'
slug: '/2017/07/11/best-practices-not-to-forget-during-starting-your-project/'
date: Tue, 11 Jul 2017 22:19:06 +0000
draft: false
featured_image: 'images/2017/07/todd-quackenbush-701.jpg'
category: 'Other'
tags: ['build', 'practices', 'process', 'projects']
---

Everyone loves to start a new project. **Completely shiny greenfield** where you can use your loved libraries and just try something new, something completely different. You are starting adding new functionalities, feature by feature, and in a glimpse of an eye half of the year have passed. Then you can feel that something is missing and during months of your work you passed over some options that currently would help you develop your app. I went through the same process multiple times and it allowed me to gather several points that I am currently sharing with you.

It's worth spending some time during early weeks of a project to think about **following practices / ideas** - you don't need to spend whole days about implementing them but in every sprint, you should consider, if there is some work needed in this area. That would allow you not to fall into a scenario that making some move will need so big effort that nobody will be able to do it. Or not to go Bing-Bang and recreate your whole architecture just to accomplish some needed scenario.

I described six of them:

*   [Developer's notes](#developers-notes)
*   [Provisioning](#provisioning)
*   [Build / deploy system](#build-deploy)
*   [Authentication](#authentication)
*   [Monitoring](#monitoring)
*   [Data security](#data-security)

You probably won't need all these points to be implemented in your projects but all of them are worth memorizing ;)

Developer's notes
-----------------

For me it's a very important thing, even if you are a single person working on an application. You and your colleagues need a place to share your knowledge / ideas / choices about the project that you are working on. You can think that this is not a problem because you understand what is going on, but for me, this conviction has **three clear drawbacks**:

*   First is that you won't remember such things after one month / one quarter / one year, and such information could be very valuable at that time.
*   Second is that your notes can justify the choices that you made in that time - this time-travel can ease process of understanding why went way A, not B
*   Third is that new teammates will be able to dive into your application with less problem cause knowledge regarding project is described in notes

These notes can be stored in [markdown](https://en.wikipedia.org/wiki/Markdown) HTML files, [OneNote's notes](https://www.onenote.com/) in shared drive, or in Atlassian's [Confluence](https://www.atlassian.com/software/confluence) project collaboration app - most important thing is accessing to this tool should be easy and editing should be allowed to all members of a team.

Provisioning - start a project from a scratch
---------------------------------------------

This point is eluded in many projects due to a conviction that such waste of time is minimal because you are not building your environment every day. And then you got a new computer, need to change your hard drive or introduce a new person to a project. And you spend hours or days trying to set up everything from a beginning or not to forget about every single detail in the long instruction list. You **waste your time and all of the friends** which you spam with questions regarding why that tool is not working or why there are still errors in the build log.

Currently, every installation process can be automated, even for such tools as [Visual Studio](https://docs.microsoft.com/en-us/visualstudio/install/use-command-line-parameters-to-install-visual-studio) or [Microsoft SQL Server](https://docs.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server-2016-from-the-command-prompt). Moreover, there is a library to ease creating such mechanism - [MACK](https://github.com/ObjectivityLtd/MACK), which allows you to configure this process in a simple config file. You will gain certainty that all options are properly set, and some time to go drink your coffee when provisioning is running ;)

Build / deploy system
---------------------

To some point, running tests manually or deploying a website using IDE's one-click publish can be effective and straight-forward. But your team members can be more forgetful and push changes to repo without evaluating your code. It will lead to bugs that won't be found before showing the app to end users. Moreover, lack of such improvements encourages people not to run your builds / tests before committing, causing nobody will know who and what has broken your application.

That's why you need **properly defined mechanism** of continuous build and deployment - every change to codebase should run a pack of unit tests, build target package and deploy it to test environment. With such process, you will get automatic knowledge about your and your friends' commits and certainty that your changes won't break app due to lack of semicolon or mistype in the written condition statement.

To help you with this part I can recommend [Cake ](http://cakebuild.net/)\- cross-platform build automation system with a C# DSL or my [article](http://blog.objectivity.co.uk/how-to-improve-the-front-end-work-in-asp-net-using-gulp/) about [gulp](http://gulpjs.com/) tasks which describes automation of work for frontend part of the application.

Authentication
--------------

Implementing the whole process of user verification can be a very difficult task in many applications, containing weeks or month of work for a team of people. But it's worth spending some time at the beginning of a project to discuss how your client would expect that user will be authenticated. You would be surprised **how it can affect your architecture** and change the way of developing the application.

For example, I knew a project where developers modeled users with unique username - it was exclusive across the whole application. But client after few months needed an option to authenticate users by connection to Active Directory, where usernames were not unique. Creating such bonds to the AD was very difficult for developers and resulted in many hacks and workaround in the code. All these problems could be omitted with a simple question to your Product Owner.

Monitoring
----------

Recently there are many options to associate your application with live gathered logs, stored locally or in the could, which will describe how long took to handle a particular amount of your code. With such system, you will get information if your application responds correctly and if there are some requests that are not handled in your application. **Every bug reported** by your tester can be supported with information which process has failed, which will ease resolving your bug. Such logs can be extended with your application's CPU and RAM usage which can help to investigate problems with the efficiency of the created solution or outgoing problems in your environment.

Moreover, in longer terms, you will get a knowledge, which changes in your application **has decreased its performance** and where you should start working on to provide better value for your clients. With such calculations, it's easier to persuade them that changes are required and to show them your changes improved quality of an application.

There are plenty tools to implement such mechanism to your application; I can endorse Azure's [Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) which simplifies gathering logs to one management portal with contains grateful query options or [Elastic Stack](https://www.elastic.co/webinars/introduction-elk-stack) which allows building your own logs management environment with beautiful dashboards.

Data Security
-------------

This point is similar to authentication - you don't need to implement this functionality in early days when actually there is nothing to shape. But it is very important to think through how you would like to accomplish such functionality with your chosen architecture. In which layer you would like to make these changes and which components should be responsible for gathering logic which data and when should be hidden.

With leaving data security discussions to the last days of your project you will get to the point where you either need to change all layers of your code to accomplish required scenario or your change will work such inefficiently that will only annoy client's end users. I have been there and I got to know the pain regarding implementing these changes so late. Better avoid our path and remember to start that analysis as soon as possible.

Summary
-------

I can recall my friend's posts ["It is too late now"](http://lukaszolczyk.com/worst-advice-ever/) - if you start thinking about these points when they are really needed you missed the point when you should implement them. You can think about these points in term of a technical debt - it increases every day and you need to start thinking or implementing them right now because in a week / month / year it will be only worse.

Of course, there are many other things that should be implemented at the beginning of a project, which I didn't embrace in this article. If you have any idea about additional ones, please share them in comments below :)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Few-things-not-to-forget-during-starting-your-project-RadBlog "") - <time datetime="2017-07-12 14:54:02">Jul 3, 2017</time>

**Few things not to forget during starting your project | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
