---
title: 'Serverless - Introduction [1]'
slug: '/2017/07/05/serverless-introduction-1/'
date: Wed, 05 Jul 2017 22:35:42 +0000
draft: false
featured_image: 'images/2017/07/benjamin-child-19747.jpg'
aliases: ['/2017/07/05/serverless-introduction-1/']
category: 'Serverless'
tags: ['']
---

_This post is one in the cycle of posts related to serverless topic. To check all of them go to [serverless category](/category/serverless/)._

### Introduction

Serverless is currently the biggest hype of IT industry - everyday more and more posts / videos / speeches are created around this topic; moreover there is a [conference](http://serverlessconf.io/) embracing only the serverless ideas . Everyone wants to do something even slightly connected with this trend.

I will not try to give you fully explanation - there are so many great posts describes serverless and to dive into this idea I recommend to read [this article](https://martinfowler.com/articles/serverless.html) at Martin Fowler's blog.  But big story short: You are using services / running code with breakout from infrastructure perspective and paying only for used resources. We describe two types of serverless:

 *   **Function as a Service** (FaaS) - you are running your code in small, disposable containers that are removed just after execution of your code. One of example is [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) - ability to run simple functions in Azure environment.
 *   **Backend as a Service** (BaaS) - you are using services provided by 3-rd party company which are combined into your code. One of example is [Auth0](https://auth0.com/) \- service to add authentication to your application as external component.

Biggest change that we need to accomplish to switch our model of creating application to serverless is to **switch our thinking** to be more detailed, more domain specific. In this architecture we do not concern about whole application - we try to split it to the separate use-cases and treat them as their own, with **different model and different internal logic**. Let's look quickly on serverless model provided by Microsoft which explains how car's telemetry can be splitted into independent elements:

![](https://i-msdn.sec.s-msft.com/dynimg/IC865521.png)

### In my opinion

Serverless is worth considering if we would like to quickly deliver functionality to our clients without overhead caused by infrastructure configuration or complexity of our existing application. We are creating components there are being connected to our applications by events / API calls and serves as additional functionality.

Currently **Internet lacks of business cases** where you can use serverless to provide value to your client. Currently, for my client in the food industry, I delivered few serverless tasks, which I would like to share with you in the following posts:

 *   Resizing photos after creating quality complaint
 *   Creating PDF report when sending complaint to supplier
 *   Hosting HTML website with simple actions

I hope that you will find these use-cases interesting :)