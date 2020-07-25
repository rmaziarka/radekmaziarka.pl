---
title: 'Dlaczego Bounded Contexty są ważne - Architektura zdarzeniowa'
url: '/2019/03/26/dlaczego-bounded-contexty-sa-wazne-architektura-zdarzeniowa/'
date: Tue, 26 Mar 2019 21:28:35 +0000
draft: false
images: ['images/2018/07/private-1665019_960_720.jpg']
description: "Kolejny post z serii o Bounded Contextach - jak bounded contexty mają się do architektury zdarzeniowej."
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

 // wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/).

Wydawać by się mogło, że [architektura zdarzeniowa](https://medium.com/high-alpha/event-driven-architecture-a-primer-f636395d0295) nie będzie cierpiała na problemy braku kontekstów. Moduły aplikacji komunikują się zdarzeniami. W jednym miejscu informujemy o dokonaniu pewnej akcji, a reagujemy na nią w innym miejscu. Dzięki temu mamy większą separację modułów od siebie i lepszy rozkład odpowiedzialności. Prawda?

O wy naiwni!

## Problem

Załóżmy, że w module Sklepu, po zakupie produktu rzucasz zdarzenie ProductWasSold_. _ Zawiera ono następujące pola:

 *   Id
 *   Name
 *   Price

Integrują się z nim 2 moduły - Zamówień i Dostaw - które obsługują dodanie zamówienia i stworzenie dostawy w reakcji na zakup produktu. Funkcjonalności są od siebie oddzielone - każdy moduł spełnia swoje potrzeby.

Następnie pojawia się potrzeba biznesowa – chcemy rozdzielić cenę na netto i podatek VAT. Dokonujemy takiej zmiany w naszym module, testujemy nasze rozwiązanie – problem. System przestaje działać, bo moduły Zamówień i Dostaw nie akceptują naszych zmian.

Po konsultacjach okazuje się, że musimy wycofać nasze zmiany, bo zaadaptowanie całego systemu do kształtu nowego zdarzenia jest zbyt kosztowne. I co teraz?

Chcieliśmy uciec od piekła integracji przez bazę danych – mamy złączenie na poziomie wydarzeń.

## Zdarzenia jako bottleneck

Ten problem został już zauważony w społeczności programistycznej. Jimmy Bogard pisał na [Twitterze](https://twitter.com/jbogard/status/953202842948468736):

> exposing your event streams to the outside world is no different than handing out your SQL connection string. you're encouraging coupling

Również ThoughtWorks na swoim [Technology Radarze](https://www.thoughtworks.com/radar/techniques/recreating-esb-antipatterns-with-kafka) pisali, że widzą trend tworzenia centralnego zarządzania zdarzeniami na poziomie całej aplikacji. I opisują związane z tym problemy.

Takie zachowanie tworzy ogromne powiązania pomiędzy poszczególnymi modułami systemu. Nie jesteśmy w stanie zmodyfikować kształtu danego zdarzenia – jest ono używane w zbyt wielu miejscach. Ostatecznie kończymy z systemem, w którym jakakolwiek zmiana jest bardzo kosztowna i wymaga wielu synchronizacji pomiędzy wszystkimi członkami danego projektu.

## Rozwiązanie

Rozwiązaniem jest jasny podział na te zdarzenia, które są dostępne tylko wewnątrz naszego modułu i te, którymi dzielimy się na zewnątrz. Czyli na tzw. **zdarzenia domenowe i integracyjne**. Pisał o nich Jimmy jako rozwinięcie swojego tweeta, a ciekawą implementację można znaleźć na stronach Microsoftu (zdarzenia [domenowe](https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/microservice-ddd-cqrs-patterns/domain-events-design-implementation) / [integracyjne](https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/multi-container-microservice-net-applications/integration-event-based-microservice-communications)).

[![](/images/2019/03/image20.png)](/images/2019/03/image20.png)

Taki sposób działania pozwala ukryć nasze wewnętrzne zmiany przed światem zewnętrzym. Możemy modyfikować nasz sposób działania - dodawać nowe zdarzenia, zmieniać istniejące, usuwać niepotrzebne – o ile nasz kontrakt jest utrzymywany.

W naszym powyższym przypadku moglibyśmy mieć 2 różne zdarzenia, np.

 *   ProductWasSold
 *   ProductWasSoldIntegrationEvent

Pierwsze zdarzenie byłoby rzucane wewnętrznie. Następnie moduł chwytałby to zdarzenie i zmieniał je w zdarzenie integracyjne, obsługując zmianę informacji. Dzięki temu, nawet jeśli zdarzenie domenowe by się zmieniło, to na nas byłby jedynie obowiązek, by zapewnić ciągłość pomiędzy oboma typami zdarzeń.

## A może inaczej?

Sławek Sobótka, na swojej prezentacji [DDD Q&A](https://www.youtube.com/watch?v=do-xqIbKZ_8), mówił o innym rozwiązaniu tego problemu. Polecał on po prostu, by wewnątrz jednego kontekstu nie rzucać zdarzeń. Zmiany w kilku agregatach mogłyby się odbywać wewnątrz serwisu domenowego, który dbałby, by oba obiekty się zmieniły. Nie potrzebowalibyśmy wtedy zdarzeń wewnątrz modułowych.

Jest to pewnie rozwiązanie części problemów, w części sytuacji jednak może to nie dać rady. Jak zwykle – to zależy 😉

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Dlaczego-Bounded-Contexty-sa-wazne-Architektura-zdarzeniowa-Radek-Maziarka "") - <time datetime="2019-03-27 13:50:50">Mar 3, 2019</time>

**Dlaczego Bounded Contexty są ważne – Architektura zdarzeniowa | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
