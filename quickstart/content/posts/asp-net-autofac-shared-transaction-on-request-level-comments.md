---
title: 'Autofac + ASP.NET - Shared transaction between ORMs on a request level'
slug: '/2018/01/04/asp-net-autofac-shared-transaction-on-request-level/'
date: Thu, 04 Jan 2018 01:01:24 +0000
draft: false
category: 'ASP.NET'
tags: ['ASP.NET', 'Autofac', 'Dapper', 'Entity Framework', 'Web Api']
---


#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Autofac-ASPNET-Shared-transaction-between-ORMs-on-a-request-level-Radek-Maziarka-Blog "") - <time datetime="2018-01-05 13:04:18">Jan 5, 2018</time>

**Autofac + ASP.NET – Shared transaction between ORMs on a request level | Radek Maziarka Blog** Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
<hr />
#### 
[Dariusz Lenartowicz]( "dariusz.lenartowicz@gmail.com") - <time datetime="2018-01-06 14:16:00">Jan 6, 2018</time>

Based on my experience I treat this pattern as anti-pattern.
<hr />
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-06 15:23:00">Jan 6, 2018</time>

I understand your point of view, but for different scenarios, different solutions can be applied. It is very well explained in article at .NET Microservices. Architecture for Containerized .NET Applications book - https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/microservice-ddd-cqrs-patterns/domain-events-design-implementation#single-transaction-across-aggregates-versus-eventual-consistency-across-aggregates where they withstand two different sights on that case: Single transaction across aggregates versus eventual consistency across aggregates.
<hr />
