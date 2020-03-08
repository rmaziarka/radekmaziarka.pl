---
title: 'FluentValidation - wstrzykiwanie zależności'
slug: '/2016/04/18/fluentvalidation-wstrzykiwanie-zaleznosci/'
date: Mon, 18 Apr 2016 22:11:15 +0000
draft: false
featured_image: 'images/2016/04/photo-1456428746267-a1756408f782-1.jpg'
category: 'Fluent Validation'
tags: ['']
---


#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/FluentValidation-wstrzykiwanie-zaleznosci-RadBlog "") - <time datetime="2016-04-18 23:18:15">Apr 1, 2016</time>

**FluentValidation – wstrzykiwanie zależności | RadBlog** Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
<hr />
#### 
[Dariusz Lenartowicz]( "dariusz.lenartowicz@gmail.com") - <time datetime="2016-04-19 09:53:00">Apr 2, 2016</time>

Mała uwaga! Walidatory w Web API są buforowane przez samo Web API w związku z czym kolejnym razem ten sam walidator będzie miał tą samą instancję wszystkich zależności co może łatwo doprowadzić do katastrofy. Rozwiązaniem jest użycie Func lub własna mała infrastrukturka, która zanim wykona cokolwiek w akcji kontrolera wykona najpierw walidację modelu.
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-04-19 20:17:00">Apr 2, 2016</time>

Oczywiście tak jest - możliwym rozwiązaniem jest tak jak podałeś powyżej wstrzykiwanie Func zamiast IService, dzięki czemu w kontrolerach będziemy mieli pewność, że dostajemy nową instancję serwisu. Można się również pokusić o usunięcie cachowania / buforowania walidatorów przez lekki hak na WebAPI: Assembly httpAssembly = Assembly.Load("System.Web.Http"); Type cacheType = httpAssembly.GetType("System.Web.Http.Validation.IModelValidatorCache"); GlobalConfiguration.Configuration.Services.Clear(cacheType)); Co usunie nam mechanizm buforowania i sprawi że zawsze będzie wywoływane tworzenie walidatora. Niestety interfejs IModelValidatorCache jest internal, przez wymagane jest wsparcie się refleksją.
<hr />
