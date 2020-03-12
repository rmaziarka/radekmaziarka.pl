---
title: '"Building Microservices" by Sam Newman - book review'
slug: '/2018/02/02/building-microservices-sam-newman-book-review/'
date: Thu, 01 Feb 2018 23:34:05 +0000
draft: false
featured_image: 'images/2018/02/microservices.jpg'
category: 'Review'
tags: ['architecture', 'book', 'ddd', 'microservices', 'monitoring', 'monolith', 'review', 'SOA']
---

**TD DR**: Mandatory book for every developer who wants to work with microservices.

Microservices architecture is a trend in a modern software, which is currently implemented across our whole IT industry. Unfortunately, people started applying microservices without any greater understanding of how they should do it. It ended with massive collapses and posts like ["The death of microservice madness"](http://www.dwmkerr.com/the-death-of-microservice-madness-in-2018/).

To avoid such problems **I can fully recommend** Sam Newman's book ["Building Microservices"](http://shop.oreilly.com/product/0636920033158.do). It is a very well written compendium about microservices. Sam does not only describes the benefits of using microservices but mostly focuses what are the challenges with such architecture. And how you can overcome these difficulties. The book covers multiple technical aspects of microservices, but what is even more important, recommends soft skill's practices and advice. After this book, you will get a weapon to handle microservices monster ;)

Let me show you my list, about what I found interesting in this book [(click here to omit)](#list-end):

 *   Evolutionary Architect guidelines
 *   Explanation why we should start from monolith and when should you divide it
    
     *   And why [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) is crucial with a decomposition of a monolith
    
 *   Different models of integrations between services
 *   2 kinds of event architecture
 *   [Catastrophic failover ](https://martinfowler.com/bliki/CatastrophicFailover.html) - and how to handle it
 *   Why sometimes [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) is wrong in the world of microservices
 *   Integration patterns for User Interface
 *   [Strangler pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/strangler)  - request mappings between legacy and the new system
 *   How to split the database - 5 ideas
 *   Report databases - 5 patterns
 *   The need for deep automatization
    
     *   [Docker](https://www.docker.com/) and dynamic environments
    
 *   [Mountebank](http://www.mbtest.org/)  -  library to fake HTTP / TCP requests
 *   [Consumer-driven contract tests](https://martinfowler.com/articles/consumerDrivenContracts.html) \- remedy for end-to-end tests
    
     *   [Pact](https://docs.pact.io/) \- library for CDC tests
    
 *   [MTBF](https://en.wikipedia.org/wiki/Mean_time_between_failures) and [MTTR](https://en.wikipedia.org/wiki/Mean_time_to_repair)  - often is better to embrace failure
 *   [Graphite](https://graphiteapp.org/) \- a tool for generation and analysis of metric data - CPU, RAM, timings
 *   [Synthetic monitoring](https://martinfowler.com/bliki/SyntheticMonitoring.html) - production testing
 *   Metrics importance - well-implemented metrics helps business to react to problems and make choices
 *   Mulitple microservices authentication options
 *   [Conway's law](https://en.wikipedia.org/wiki/Conway%27s_law) - how it affects microservices
    
     *   How Conway's law affected building Microsoft Vista
    
 *   [Bulkhead](https://docs.microsoft.com/en-us/azure/architecture/patterns/bulkhead) pattern - how to achieve isolation between components
 *   Scaling databases options, both from read and write sides
 *   Dynamic service register libraries - [Consul](https://www.consul.io/) and [Eureka](https://github.com/Netflix/eureka)

Each chapter contains multiple topics that you want to add to your OneNote. I noted further appealing topics but I won't bother you with them - I am sure that each of you will find something new and outstanding in that book.

But these are only raw points - **book gets a lot when it's taken as a whole**. It is written concisely and cohesively, there is no unnecessary information here. After every chapter, you gain a deeper knowledge of microservices. After a book, you see a big picture.  Currently, I understand why Jimmy Bogard calls "Building Microservices" as ["Domain Driven Design: The Good Parts"](https://www.youtube.com/watch?v=lsmtWqcAj0E&feature=youtu.be&t=45m0s). This book contains everything to build a proper and well-living microservices system (or when not to).

To sum it up - you definitely should read this book. Soon (about summer 2018) Sam plans to release 2nd edition of the book. He will write about microservices in a frontend, serverless architecture and new solutions to migrate from monolith to microservices. Worth checking even more.

So [slash the monolith!](http://radblog.pl/wp-content/uploads/2018/02/slash-the-monolith.jpg)

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Building-Microservices-book-review-Radek-Maziarka-Blog "") - <time datetime="2018-02-02 09:03:39">Feb 5, 2018</time>

**Building Microservices - book review | Radek Maziarka Blog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
