---
title: 'Autofac + MediatR - Shared transaction between ORMs on a command level'
slug: '/2018/01/04/mediatr-autofac-shared-transaction-on-command-level/'
date: Thu, 04 Jan 2018 14:17:50 +0000
draft: false
featured_image: 'images/2018/01/autofac.png'
category: 'ORM'
tags: ['Autofac', 'Dapper', 'Entity Framework', 'MediatR']
---


#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Autofac-MediatR-Shared-transaction-between-ORMs-on-a-command-level-Radek-Maziarka-Blog "") - <time datetime="2018-01-10 09:55:32">Jan 3, 2018</time>

**Autofac + MediatR – Shared transaction between ORMs on a command level | Radek Maziarka Blog** Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
<hr />
#### 
[Dariusz Lenartowicz]( "dariusz.lenartowicz@gmail.com") - <time datetime="2018-01-11 09:18:00">Jan 4, 2018</time>

You forget about TransactionScopeAsyncFlowOption.Enabled. :)
<hr />
#### 
[Paweł Iżycki](http://www.izzydev.net "pawelizycki@gmail.com") - <time datetime="2018-01-11 10:11:00">Jan 4, 2018</time>

Cool post. I guess we can also pass Isolation level in request. The request would implement ITransactional interface with read only property specifing isolation level. The handler would have simple checking if request implements ITransactional. What do you think?
<hr />
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-12 23:12:00">Jan 5, 2018</time>

Thanks Dariusz, I added it with some comment :)
<hr />
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-12 23:32:00">Jan 5, 2018</time>

From one perspective sounds reasonable. From other, I am not sure if the command should have any information about infrastructural details. But it is doable :)
<hr />
#### 
[Paweł Iżycki](http://www.izzydev.net "pawelizycki@gmail.com") - <time datetime="2018-01-13 11:17:00">Jan 6, 2018</time>

I did that in one of my projects and it turned out well. We implemented ITransictional interface in explicit way so it would be only accessible when referencing command of this particular interface and not implementation type. This way all infrastructual is hidden inside implementation :) In what way are you going to specify trans isolation level in approach you presented? Just curious, maybe I don't see everything :)
<hr />
#### 
[Radek Maziarka](http://radblog.pl "maziarka.radoslaw@outlook.com") - <time datetime="2018-01-15 00:25:00">Jan 1, 2018</time>

After few thoughts I would rather not add this interface to the command. Instead of it, I would try to embrace MediatR mechanism to add isolation level additionally as a parameter, during publishing it. Maybe it's an quite over-engineering but it allows you to keep your command not aware of infrastructural details and more flexible to different use-cases.
<hr />
