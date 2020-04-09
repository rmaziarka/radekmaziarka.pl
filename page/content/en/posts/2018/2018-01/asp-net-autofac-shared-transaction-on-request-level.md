---
title: 'Autofac + ASP.NET - Shared transaction between ORMs on a request level'
url: '/2018/01/04/asp-net-autofac-shared-transaction-on-request-level/'
date: Thu, 04 Jan 2018 01:01:24 +0000
draft: false
featured_image: 'images/2018/01/autofac.png'
category: 'ASP.NET'
tags: ['ASP.NET', 'Autofac', 'Dapper', 'Entity Framework', 'Web Api']
---

This post describes how to achieve database transaction, **on a request level**, with Autofac DI and ASP.NET WebApi.

Sometimes there is a need to share transaction between two different ORMs which uses the same database - in my case [Entity Framework](https://docs.microsoft.com/en-us/ef/) and [Dapper](https://github.com/StackExchange/Dapper). It will allow you to be sure that changes, made by two different tools, will be done completely or not. To realize such scenario you can use [TransactionScope](https://www.codeproject.com/Articles/690136/All-About-TransactionScope) class. It provides an option to create a transaction, which will be used by SQL connection.

First, you need to create an instance of Autofac interface **IAutofacActionFilter** - filter which is run before and after every HTTP action:
```
    public class TransactionActionFilter : IAutofacActionFilter
    {
        private TransactionScope _transaction;

        public Task OnActionExecutedAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            if (actionExecutedContext.Exception == null)
            {
                this.\_transaction.Complete();
            }

            this.\_transaction.Dispose();
            return Task.CompletedTask;
        }

        public Task OnActionExecutingAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            var transactionOptions = new TransactionOptions
            {
                IsolationLevel = IsolationLevel.ReadCommitted,
                Timeout = TransactionManager.MaximumTimeout
            };
            this.\_transaction = new TransactionScope(TransactionScopeOption.Required, transactionOptions, 
                                                     TransactionScopeAsyncFlowOption.Enabled);

            return Task.CompletedTask;
        }
    }
```
The filter creates transaction every executed action and completes it when there is no error. These posts ([1](https://blogs.msdn.microsoft.com/dbrowne/2010/06/03/using-new-transactionscope-considered-harmful/), [2](https://particular.net/blog/transactionscope-and-async-await-be-one-with-the-flow)) describe why, by default, you should create **TransactionScope **with above options.

Then you need to register your filter during the creation of Autofac **ContainerBuilder **\- typically when the application is being started.
```
        protected void Application\_Start()
        {
            ..
            var builder = new ContainerBuilder();
            builder.Register(c => new TransactionActionFilter())
                .InstancePerRequest()
                .AsWebApiActionFilterFor<ApiController>();
            ..
        }
```
The filter is registered with an **InstancePerRequest **option, which forces to create filter only once per request. Without it, for OnActionExecutingAsync and OnActionExecutedAsync, Autofac creates 2 instances of the filter.

In most cases you want to register the filter for all controllers, that's why its registered against **ApiController**.But you can implement more sophisticated logic there, even with some reflection included.

PS. [Here](/2018/01/04/mediatr-autofac-shared-transaction-on-command-level/) you find how to achieve database transaction on a **command** **level**.

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Autofac-ASPNET-Shared-transaction-between-ORMs-on-a-request-level-Radek-Maziarka-Blog "") - <time datetime="2018-01-05 13:04:18">Jan 5, 2018</time>

**Autofac + ASP.NET – Shared transaction between ORMs on a request level | Radek Maziarka Blog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[Dariusz Lenartowicz]( "dariusz.lenartowicz@gmail.com") - <time datetime="2018-01-06 14:16:00">Jan 6, 2018</time>

Based on my experience I treat this pattern as anti-pattern.
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-06 15:23:00">Jan 6, 2018</time>

I understand your point of view, but for different scenarios, different solutions can be applied. It is very well explained in article at .NET Microservices. Architecture for Containerized .NET Applications book - https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/microservice-ddd-cqrs-patterns/domain-events-design-implementation#single-transaction-across-aggregates-versus-eventual-consistency-across-aggregates where they withstand two different sights on that case: Single transaction across aggregates versus eventual consistency across aggregates.
