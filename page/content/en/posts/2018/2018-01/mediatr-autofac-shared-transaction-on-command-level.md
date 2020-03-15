---
title: 'Autofac + MediatR - Shared transaction between ORMs on a command level'
slug: '/2018/01/04/mediatr-autofac-shared-transaction-on-command-level/'
date: Thu, 04 Jan 2018 14:17:50 +0000
draft: false
featured_image: 'images/2018/01/autofac.png'
aliases: ['/2018/01/04/mediatr-autofac-shared-transaction-on-command-level/']
category: 'ORM'
tags: ['Autofac', 'Dapper', 'Entity Framework', 'MediatR']
---

This post describes how to achieve database transaction, **on a command level**, with Autofac DI and MediatR.

Sometimes there is a need to share transaction between two different ORMs which uses the same database - in my case [Entity Framework](https://docs.microsoft.com/en-us/ef/) and [Dapper](https://github.com/StackExchange/Dapper). It will allow you to be sure that changes, made by two different tools, will be done completely or not. To realize such scenario you can use [TransactionScope](https://www.codeproject.com/Articles/690136/All-About-TransactionScope) class. It provides an option to create a transaction, which will be used by SQL connection.

First, you need to create new pipeline behavior - an action which embraces every command. It is a mechanism very well defined in MediatR [documentation](https://github.com/jbogard/MediatR/wiki/Behaviors).
```
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
```
The behavior creates transaction every executed action and inside this transaction runs a command handler. These posts ([1](https://blogs.msdn.microsoft.com/dbrowne/2010/06/03/using-new-transactionscope-considered-harmful/), [2](https://particular.net/blog/transactionscope-and-async-await-be-one-with-the-flow)) describe why, by default, you should create **TransactionScope **with above options.

Then you need to register your filter during the creation of Autofac **ContainerBuilder **\- typically when the application is being started.
```
	var builder = new ContainerBuilder(); 
	..
	builder.RegisterGeneric(typeof(TransactionBehavior<,>))
               .As(typeof(IPipelineBehavior<,>));
	..
```
MediatR checks if there are any registered pipeline behaviors and applies them to all incoming commands.

PS. [Here](/2018/01/04/asp-net-autofac-shared-transaction-on-request-level/) you find how to achieve database transaction on a **request level**.

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Autofac-MediatR-Shared-transaction-between-ORMs-on-a-command-level-Radek-Maziarka-Blog "") - <time datetime="2018-01-10 09:55:32">Jan 3, 2018</time>

**Autofac + MediatR – Shared transaction between ORMs on a command level | Radek Maziarka Blog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[Dariusz Lenartowicz]( "dariusz.lenartowicz@gmail.com") - <time datetime="2018-01-11 09:18:00">Jan 4, 2018</time>

You forget about TransactionScopeAsyncFlowOption.Enabled. :)
#### 
[Paweł Iżycki](http://www.izzydev.net "pawelizycki@gmail.com") - <time datetime="2018-01-11 10:11:00">Jan 4, 2018</time>

Cool post. I guess we can also pass Isolation level in request. The request would implement ITransactional interface with read only property specifing isolation level. The handler would have simple checking if request implements ITransactional. What do you think?
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-12 23:12:00">Jan 5, 2018</time>

Thanks Dariusz, I added it with some comment :)
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-12 23:32:00">Jan 5, 2018</time>

From one perspective sounds reasonable. From other, I am not sure if the command should have any information about infrastructural details. But it is doable :)
#### 
[Paweł Iżycki](http://www.izzydev.net "pawelizycki@gmail.com") - <time datetime="2018-01-13 11:17:00">Jan 6, 2018</time>

I did that in one of my projects and it turned out well. We implemented ITransictional interface in explicit way so it would be only accessible when referencing command of this particular interface and not implementation type. This way all infrastructual is hidden inside implementation :)

In what way are you going to specify trans isolation level in approach you presented? Just curious, maybe I don't see everything :)
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-15 00:25:00">Jan 1, 2018</time>

After few thoughts I would rather not add this interface to the command. Instead of it, I would try to embrace MediatR mechanism to add isolation level additionally as a parameter, during publishing it. Maybe it's an quite over-engineering but it allows you to keep your command not aware of infrastructural details and more flexible to different use-cases.
