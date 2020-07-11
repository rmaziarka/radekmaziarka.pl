---
title: 'Event Storming - Co dalej?'
url: '/2019/01/26/event-storming-co-dalej/'
date: Sat, 26 Jan 2019 13:21:18 +0000
draft: false
images: ['images/2018/05/eventstorming.logo_.png']
category: 'Event Storming'
tags: ['ddd', 'domain driven design', 'event storming']
---

Co można zrobić dalej z rezultatem warsztatu Event Storming Big Picture?

Wszystko zależy do waszych potrzeb 😉 Przygotowałem parę przykładów, które mogą być dla was wskazówką w kontynuacji warsztatów. Część z nich jest zorientowana bardziej na tworzenie rozwiązania, część skupia się na dalszym brainstormingu, a cześć ma za zadanie zakończyć warsztat estymacją i roadmapą. Kolejność dość przypadkowa.

## 1 - Zdjęcie / zrzut do pliku

Przykład najbardziej trywialny. W niektórych biurach nie da zostawić się efektów warszatu na ściacie. Trzeba więc go jakoś zdigitalizować.

Zrzut zdjęć do plików, z odpowiednim kadrowaniem i opisem, pozwoli z łatwością wracać później do rezultatów warsztatu. Uczestnicy, patrząc na obrazy, przypomną sobie szczegóły i podejmowane decyzje. Osoby nieobecne będą w stanie zrozumieć nasze decyzje i kroki.

Jeśli rezultat warsztatu jest bardziej liniowy można pokusić się do zrzutu do Excela. Prościej jest wtedy przypisywać konkretne wartości a następnie je wyszukiwać. Widzimy wtedy flow i jego poszczególne modyfikacje, wraz z problemami i pozostałymi wyróżnikami.

## 2 - Design Level

To najbardziej kardynalna forma kontynuowania warsztatu. Opisany (niestety na ten moment dość skąpo) w książce [Event Storming](https://leanpub.com/introducing_eventstorming) Alberta Brandoliniego.[![](/images/2019/01/1.jpg)](https://leanpub.com/introducing_eventstorming)

Z poziomu problemu (jakim był Big Picture) przechodzimy na warstwę rozwiązania – projektujemy konkretny system, który będzie implementował zdefiniowane wcześniej potrzeby. Za pomocą komend, polityk, read modeli i agregatów opiszemy pracę naszego systemu.

Na ten moment najlepszy opis Design Levelu jest dostępny na [blogu](https://buildplease.com/pages/fpc-6/) Nicka Chamberlaina. Opisuje użycie tego rodzaju warsztatu w firmie dostarczającej kawę do klientów.

## 3 - Top Five

Idea [Top Five](http://www.designkit.org/methods/15) pożyczona jest z Design Kitu – ogromnego zbioru różnych pomysłów na wypracowywanie innowacyjnych rozwiązań.

[![](/images/2019/01/3-e1548508655865.png)](http://www.designkit.org/methods/15)

Ta metoda mówi by wybrać 5 najważniejszych problemów / usprawnień / akcji i zająć się nimi na samym początku. Możemy na nie głosować razem (jeden backlog), bądź osobno (czasem warto móc różnie wartościować problemy i usprawnienia) – wszystko zależy od naszych potrzeb.

Dzięki temu wyjdziemy z warsztatu z gotowymi pomysłami czym się zając na samym początku.

## 4 - User Story Mapping

Rozwiązanie, które może przypaść do gustu analitykom biznesowym, którzy przygotowują zadania dla zespołu.

[![](/images/2019/01/4.jpg)](https://manifesto.co.uk/user-story-mapping/)

Warsztat pozwala na zgrupowanie aktywności użytkownika na każdym ekranie i pokazuje jego podróż po systemie. Dodatkowo daje możliwość zarządzania iteracyjnością tworzenia systemu – widzimy co będzie dostarczone w pierwszym rzucie, a co dopiero później. O wiele łatwiej dzięki temu planować rezultat naszych prac w kolejnych fazach.

Powyższe zdjęcie pochodzi ze strony [manifesto.co.uk](https://manifesto.co.uk/user-story-mapping/), gdzie User Story Mapping w świetny sposób opisał Jim Bowes.

## 5 - Example Mapping

Technika polecana przez [Kenniego Baas-Schwegler](https://www.youtube.com/watch?v=WvkBKvMnyuc), który często mówi o niej jednym tchem wraz z Event Stormingiem.

[![](/images/2019/01/5.png)](https://cucumber.io/blog/2015/12/08/example-mapping-introduction)

[Example Mapping](https://cucumber.io/blog/2015/12/08/example-mapping-introduction) pozwala zwizualizować reguły jakimi rządzi się dane zadanie i jakie są przykłady spełniające te reguły. Obok wskazujemy pytania / problemy, które mogą nie być na ten moment rozwiązywalne.

Dzięki temu możemy przed implementacją zrzucić wszystkie edge-case’y, na które później byśmy się natknęli. O wiele łatwiej jest dzięki temu zrzucić takie zadanie do formy tekstowej i przydzielić danemu developerowi.

## 6 - Specification by Example

Możliwa kontynuacja powyższego warsztatu. Technika opisana pierwotnie przez Martina Fowlera na [blogu](https://martinfowler.com/bliki/SpecificationByExample.html) w 2004 roku, na podstawie której Gojko Adzic napisał później [książkę](https://www.goodreads.com/book/show/10288718-specification-by-example).

[![](/images/2019/01/6.jpg)](https://www.thoughtworks.com/insights/blog/specification-example)

Na podstawie przykładów z poprzedniego warsztatu jesteśmy w stanie stworzyć w następnym kroku powtarzalne testy, które powinien spełniać nasz system. Powyższy przykład ze strony [ThoughtWorks](https://www.thoughtworks.com/insights/blog/specification-example) opisuje takie przypadki dla aplikacji służącej do zamawiania herbaty.

W dalszym terminie te testy mogą stać się naszą specyfikacją, która będzie opisywała pracę naszego systemu. Pozwoli to mieć jego aktualny opis – jakie akcje podejmuje i jak działa.

## 7 - Value Stream Mapping

Patrząc na zdarzenia koncentrujemy się na tym co dla nas widoczne. Nie widzimy innej rzeczy – czasu jaki jest potrzebny na przejście pomiędzy kolejnymi zdarzeniami. A w wielu przypadkach to właśnie czas jest o wiele groźniejszy niż same wydarzenia.

[![](/images/2019/01/7.jpg)](https://tallyfy.com/value-stream-mapping/)

Dlatego też powstało narzędzie [Value Stream Mapping](https://tallyfy.com/value-stream-mapping/). Ma ono na celu wizualizację zarówno czasu wykonywania konkretnych akcji, jak i czasu pomiędzy nimi. Widzimy co rozpoczyna konkretny, większy proces biznesowy i gdzie się on kończy. Podsumowaniem jest analiza, ile trwała praca i jaki był jej koszt..

Takie narzędzie może nam pomóc znaleźć wąskie gardło w planowanym rozwiązaniu – miejsce, gdzie nic się nie dzieje i proces nie idzie do przodu. Rozwiązanie w postaci zmniejszenia bądź automatyzacji kilku kroków pozwoli zaoszczędzić konkretne pieniądze dla odbiorcy naszego rozwiązania. A wcale nie musi to kosztować więcej - czasem samo przearanżowanie procesu potrafi wiele usprawnić.

## 8 - Time for change

Często będziemy używać warsztatu Big Picture do opisu naszego aktualnego systemu. Jak w takim razie zarządzać zmianami?

[![](/images/2019/01/8.jpg)](/images/2019/01/8.jpg)

Polecam w tym momencie zrobić dogrywkę warsztatu używając innych kolorów karteczek. Możemy nowe zdarzenia bizensowe oznaczać np. jako karteczki fioletowe (lub dowolny inny, który nie użyliśmy). Możemy część karteczek oznaczyć X by pokazać że już one nie mają miejsca. Ograniczenia zależą jedynie od naszej kreatywności.

Taka technika pozwala zwizualizować czym się różni stan obecny od stanu pożądanego. Dodatkowo pokazuje, ile pracy jest potrzebne by nasz system doprowadzić do stanu jaki planujemy osiągnąć.

## 9 - Wardley Maps

Kupić czy napisać dany komponent samemu? Częsty problem, ale wydaje się, że Simon Wardley znalazł bardzo dobre rozwiązanie tej zagadki.

[![](/images/2019/01/9.jpg)](https://medium.com/wardleymaps)

Technika [Wardley Maps](https://medium.com/wardleymaps) pozwala na analizę komponentów w zależności od ich widoczności przez klienta i stopnia zaawansowania uproduktowienia. Na tej podstawie możemy podejmować decyzje czy dany moduł wykorzystać / kupić / stworzyć samemu.

Temat map Simona jest o wiele szerszy i pozwala na mapowanie o wiele większej ilości parametrów. Jednak na potrzeby kontynuacji warsztatu Event Stormingu ten fragment techniki wydaje się wystarczający.

## 10 - Roadmap / estimation

[![](/images/2019/01/10.jpg)](/images/2019/01/10.jpg)Mając już przemyślane i sprawdzone pozostałe kroki warto by się zastanowić nad podjęciem decyzji.

 

Pierwszym krokiem jest stworzenie roadmapy – planu na następne zadania, które będą wykonywane po sobie. Możemy się najpierw zajmować domeną A, następnie domeną B. Domena C może zaś zostać potraktowana opcjonalnie, a domena D zakupiona jako zewnętrzny komponent. Mając takie informacje możemy je współdzielić z innym stakeholderom, by wiedzieli o jakich ramach czasowych mówimy.

Nie można też zapomnieć o estymacji kosztów samego rozwiązania. Ciekawym sposobem na to jest analiza liczby zdarzeń w danej domenie. Możemy wtedy przemnożyć tę liczbę przez konkretną wartość pieniężną adekwatną do naszej firmy. Dodatkowo możemy wziąć poprawkę, jeśli dana domena jest tzw. „Core Domain” (możliwe utrudnienia) i podwyższyć cenę o 50%. [Adam Dymitruk](https://twitter.com/adymitruk), jeden z praktyków Event Stormingu, określa tą metodę estymacji za najbardziej dokładną w jego karierze.

## Podsumowanie

Sposobów, jak widać, jest wiele i zależą od rezultatów jakich oczekujemy. Zachęcam do poczytania o każdym z nich – może być tak, że w danej sytuacji dojdziecie do ściany z danym warsztatem i któreś z tych pomysłów mogą wam się przydać.

Dajcie znać z czego wy jeszcze korzystacie w ramach swoich warsztatów 😊