---
title: 'ASP.NET Web Api i identyczne nazwy kontrolerów'
url: '/2016/02/11/asp-net-web-api-i-identyczne-nazwy-kontrolerow/'
date: Thu, 11 Feb 2016 22:24:05 +0000
draft: false
images: []
category: 'ASP.NET'
tags: ['']
---

Rozwijając nową funkcjonalność w projekcie dodałem w osobnym module nowy kontroler, który miał identyczną nazwę jak już istniejący. Przy uruchomieniu aplikacji pojawił się komunikat że nie znaleziono kontrolera dla przesłanego adresu. Zacząłem więc debugować ścieżki, parametry i sprawdzać masę innych rozwiązań. Po dłuższym czasie, przeklikując po stronach aplikacji, zauważyłem że pierwszy kontroler również przestał działać.

To dało mi do myślenia i już po chwili znalazłem odpowiedź: **WebApi nie wczyta nam dwóch kontrolerów o tej samej nazwie.** Co gorsza, zamiast wyrzucić wyjątek, po prostu nie wczyta żadnego z kontrolerów. Nie jestem oczywiście pierwszą osobą z takim problemem: developerzy Umbraco natknęli się już na niego i przesłali [przykład](http://shazwazza.com/post/multiple-webapi-controllers-with-the-same-name-but-different-namespaces/) kodu który może nam go rozwiązać. Również na [MSDN](https://blogs.msdn.microsoft.com/webdev/2013/03/07/asp-net-web-api-using-namespaces-to-version-web-apis/) jest podane rozwiązanie tego problemu. Niestety każde z nich zakłada dodanie dodatkowej logiki z namespace'ami, której ja chciałem uniknąć. Postanowiłem więc postanowiłem wejść trochę głębiej w temat.

Ściągnąłem [źródła](http://aspnetwebstack.codeplex.com/) WebApi, podpiąłem je do projektu i wszedłem w debugger. W **DefaultHttpControllerSelector** (domyślna klasa odpowiedzialna za wyszukiwanie kontrolerów) w metodzie **InitializeControllerInfoCache** widzimy jak duplikowane kontrolery są usuwane z listy załadowanych kontrolerów. To daje odpowiedź dlaczego nie pojawiły się żadne szczegółowe błędy - zduplikowanych kontrolerów nie ma w pamięci i ich ścieżki nie są znajdywane przez mechanizm wyszukiwania. Samo zakomentowanie usuwania kontrolerów nic nie zmienia ponieważ pierwszy znaleziony kontroler zostaje nadpisany przez drugi - kluczem słownika trzymającego dane kontrolerów jest nazwa kontrolerów, identyczna dla duplikatów.

Jakakolwiek zmiana na tej klasie byłaby dramatycznie trudna i kosztowna, dlatego postanowiłem po prostu zmienić nazwę kontrolera na inną. Samo dojście do tej wiedzy kosztowało mnie dużo czasu ale w mojej ocenie było warto bo fajnie czasem wejść w bebechy i zobaczyć jak to wszystko działa pod spodem ;)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/ASPNET-Web-Api-i-identyczne-nazwy-kontrolerow-RadBlog "") - <time datetime="2016-02-11 23:38:09">Feb 4, 2016</time>

**ASP.NET Web Api i identyczne nazwy kontrolerów – RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
