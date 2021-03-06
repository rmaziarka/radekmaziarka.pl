---
title: 'MediatR w przykładach - Domain Events i Command Handlers'
url: '/2016/02/08/mediatr-w-przykladach-domain-events-i-command-handlers/'
date: Mon, 08 Feb 2016 22:25:23 +0000
draft: false
images: []
category: 'Wzorce projektowe'
tags: ['']
---

Zostałem poproszony przez kolegów z zespołu o przybliżenie im biblioteki MediatR, która zapewnia prostą implementację mediatora który wysyła i obsługuje wiadomości w pamięci. Zaproponowałem ją jako sposób na rozwiązanie problemu zbyt ścisłych zależności pomiędzy domenami w naszej aplikacji. Powstało więc repozytorium dostępne na [githubie](https://github.com/rmaziarka/MediatR.Examples) w którym umieściłem solucje przybliżające 2 wzorce - [CommandHandlers](https://github.com/rmaziarka/MediatR.Examples/tree/master/Examples.CommandHandlers "Examples.CommandHandlers") i [DomainEvents](https://github.com/rmaziarka/MediatR.Examples/tree/master/Examples.DomainEvents "Examples.DomainEvents").

Każdy z projektów używa Ninjecta i jego mechanizmu [konwencji](https://github.com/ninject/Ninject.Extensions.Conventions) w celu zmniejszenia ilości niepotrzebnego kodu odpowiadającego za wiązanie ze sobą interfejsów i ich implementacji. W projekcie WebApi znajduje się klasa NinjectConfig odpowiadająca za uruchomienie DI, a w projektach domenowych jest klasa NinjectModule posiadająca bindowanie odpowiednie dla danego projektu.

W zamieszczonych powyżej przykładach nie ma logiki odpowiadającej za zapisy do bazy danych czy obsługę wyjątków - w mojej ocenie nie są one wymagane do zrozumienia mechanizmów kluczowych dla tego posta.

**Command Handlers**

W aplikacji posiadamy kontroler UserAccountController który odpowiada za żądania zmian dokonywane w koncie użytkownika. Posiada 2 akcje - MakeOrderComplaint która pozwala użytkownikowi dokonać reklamacji zamówienia i ChangeUserAddressData dzięki której można zmienić dane adresowe. Każda z metod jako argument ma komendę o identycznej sygnaturze, która następnie jest przesyłana do mediatora. Komendy są obsługiwane w projekcie, która odpowiada domenowo za daną komendę.

Dodatkowo użyłem tutaj FluentValidation by pokazać jak łatwo można się wpiąć w logikę przetwarzania komend i dodać warstwę walidacji poprawności danych. W przypadku błędu rzucany jest wyjątek który po złapaniu w Web Api zwraca z kontrolera błąd 400.

---------------------------------------------------------

Ten wzorzec ma na celu zmniejszyć zależności i uprościć nasz kontroler przez przeniesienie logiki domenowej do obiektów obsługujących komendy przychodzące z warstw prezentacji. Jest to znakomity start jeśli mamy w planach wdrożyć CQRS, ale na ten moment nie chcemy rozdzielać modelu bazy danych na odczytowy i zapisowy, a jedynie uprościć logikę odpowiedzialną za dokonywanie tych akcji.

Więcej na temat danego wzorca:

[https://vimeo.com/131633177](https://vimeo.com/131633177)
[https://lostechies.com/jimmybogard/2013/12/19/put-your-controllers-on-a-diet-posts-and-commands/](https://lostechies.com/jimmybogard/2013/12/19/put-your-controllers-on-a-diet-posts-and-commands/)
[http://weblogs.asp.net/shijuvarghese/cqrs-commands-command-handlers-and-command-dispatcher](http://weblogs.asp.net/shijuvarghese/cqrs-commands-command-handlers-and-command-dispatcher)

**Domain Events**

Aplikacja WebApi zawiera kontroler CatalogController który odpowiada za obsługę żądań katalogu produktów w naszej aplikacji. W celu zakupu produktów kontroler używa ProductsService, który ma symulować [Application Service](http://www.bennadel.com/blog/2385-application-services-vs-infrastructure-services-vs-domain-services.htm) - nie chcemy by nasza logika domenowa przechodziła do kontrolerów. Ten serwis dokonuje niezbędnych zmian na encji produktów takich jak walidacja zakupu / zmniejszenie stanu produktów / obsługa współbieżnego zamówienia a następnie rzuca zdarzenie zakupu produktów ProductsPurchased.

To zdarzenie jest obsługiwane w domenie zamówień przez stworzenie zamówienia na podstawie danych z przekazanego zdarzenia. Dokonywane są wszystkie potrzebne operacje, a następnie jest rzucane kolejne zdarzenie OrderPlaced. Tego zdarzenia nasłuchuje domena statystyk, która dane zamówienia wrzuca do zdenormalizowanej tabeli w celu szybkiego przepytywania źródła danych.

Każde zdarzenie jest nasłuchiwane przez domenę logowania, która nasłuchuje wszystkich zdarzeń i zapisuje informacje o ich wystąpieniu prze NLoga. Wysyłając żądanie do kontrolera o zakupie produktów można prześledzić tworzenie i obsługę kolejnych zdarzeń sprawdzając plik logów w katalogu WebApi.

Event handlery łączyć w jedną większą klasę ale tutaj nie zastosowałem takiego podejścia.

---------------------------------------------------------

Pisząc aplikację z użyciem zdarzeń domenowych mamy dobrze rozdzielone zależności pomiędzy naszymi modułami - każdy zajmuje się dokładnie tym za co jest odpowiedzialny, a kolejne moduły tylko reagują na zmiany jakie zachodzą w początkowym module.

Publikowanie zdarzeń domenowych jest idealnym sposobem by dodać nową funkcjonalność do istniejącej już aplikacji bez specjalnej ingerencji w już istniejącą logikę. Mówi o tym Andrzej Krzywda w swojej prezentacji [From legacy to DDD](https://youtu.be/MzV2vGSTpo8?t=17m22s).

Mając długi łańcuch eventów możemy spowodować w naszej aplikacji Event Hell, ale mając odpowiednio skomplikowany łańcuch zależności trudno zakładać że kod pisany bez zdarzeń wcale byłby łatwiejszy do analizy i utrzymania - mielibyśmy jedno duże spaghetti w którym wszystko by się działo. Aby lepiej zarządzać połączonymi ze sobą zdarzeniami polecałbym użyć wzorca Sagi która połączy zdarzenia w jeden ciąg i pozwoli zapanować nad nimi - [1](https://lostechies.com/jimmybogard/2013/03/21/saga-implementation-patterns-variations/), [2](http://docs.particular.net/nservicebus/sagas/#simple-saga-data-v6-pre), [3](http://udidahan.com/2009/04/20/saga-persistence-and-event-driven-architectures/).

Więcej na temat wzorca:

[https://lostechies.com/jimmybogard/2010/04/08/strengthening-your-domain-domain-events/](https://lostechies.com/jimmybogard/2010/04/08/strengthening-your-domain-domain-events/)
[http://udidahan.com/2009/06/14/domain-events-salvation/](http://udidahan.com/2009/06/14/domain-events-salvation/)
[http://codebetter.com/gregyoung/2010/04/11/what-is-a-domain-event](http://codebetter.com/gregyoung/2010/04/11/what-is-a-domain-event)/

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/MediatR-w-przykladach-Domain-Events-i-Command-Handlers-RadBlog "") - <time datetime="2016-02-09 09:13:15">Feb 2, 2016</time>

**MediatR w przykładach – Domain Events i Command Handlers – RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
