---
title: 'Autofac + MediatR - Shared transaction between ORMs on a command level'
slug: '/2018/01/04/mediatr-autofac-shared-transaction-on-command-level/'
date: Thu, 04 Jan 2018 14:17:50 +0000
draft: false
category: 'ORM'
tags: ['Autofac', 'Dapper', 'Entity Framework', 'MediatR']
---

This post describes how to achieve database transaction, **on a command level**, with Autofac DI and MediatR. Sometimes there is a need to share transaction between two different ORMs which uses the same database - in my case [Entity Framework](https://docs.microsoft.com/en-us/ef/) and [Dapper](https://github.com/StackExchange/Dapper). It will allow you to be sure that changes, made by two different tools, will be done completely or not. To realize such scenario you can use [TransactionScope](https://www.codeproject.com/Articles/690136/All-About-TransactionScope) class. It provides an option to create a transaction, which will be used by SQL connection. First, you need to create new pipeline behavior - an action which embraces every command. It is a mechanism very well defined in MediatR [documentation](https://github.com/jbogard/MediatR/wiki/Behaviors).```
public class TransactionBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
	public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
	{
		var transactionOptions = new TransactionOptions
		{
			IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted,
			Timeout = TransactionManager.MaximumTimeout
		};

		using (var transaction = new TransactionScope(TransactionScopeOption.Required, transactionOptions, 
                	TransactionScopeAsyncFlowOption.Enabled))
		{
                        // handle request handler
                        var response = await next();
                         
                        // complete database transaction
                        transaction.Complete();
                        
                        return response;
		}
	}
}
```The behavior creates transaction every executed action and inside this transaction runs a command handler. These posts ([1](https://blogs.msdn.microsoft.com/dbrowne/2010/06/03/using-new-transactionscope-considered-harmful/), [2](https://particular.net/blog/transactionscope-and-async-await-be-one-with-the-flow)) describe why, by default, you should create **TransactionScope **with above options. Then you need to register your filter during the creation of Autofac **ContainerBuilder **\- typically when the application is being started.```
	var builder = new ContainerBuilder(); 
	..
	builder.RegisterGeneric(typeof(TransactionBehavior<,>))
               .As(typeof(IPipelineBehavior<,>));
	..
```MediatR checks if there are any registered pipeline behaviors and applies them to all incoming commands. PS. [Here](http://radblog.pl/2018/01/04/asp-net-autofac-shared-transaction-on-request-level/) you find how to achieve database transaction on a **request level**.