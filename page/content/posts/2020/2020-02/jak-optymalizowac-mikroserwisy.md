---
title: 'Jak optymalizować mikroserwisy? O procesie decyzyjnym...'
slug: '/2020/02/17/jak-optymalizowac-mikroserwisy/'
date: Mon, 17 Feb 2020 21:59:43 +0000
draft: false
category: 'Wzorce projektowe'
tags: ['microservices', 'modulith', 'monolith']
---

[![](https://radekmaziarka.pl/wp-content/uploads/2020/02/bait.gif)](https://radekmaziarka.pl/wp-content/uploads/2020/02/bait.gif)

Tytuł tego artykułu jest przynętą (zarzutką), ale celową.

Przy konsultacjach z kolejnym klientem, który ma problemy z mikroserwisami, zacząłem się zastanawiać nad naszą branżą. Jak to możliwe, że brniemy ślepo w rozwiązania, które kompletnie nie są odpowiednie do problemów przed nami postawionych.

Klienci chcą optymalizować swoje systemy oparte o mikroserwisy. Narzekają, że wdrożenie tej architektury nie wniosło do ich systemów żadnych benefitów. W teorii zespoły miały pracować bardziej niezależnie, serwisy miały bez trudności skalować się do olbrzymiego ruchu, a nowe funkcjonalności miały pojawiać się dzień po dniu. Skończyło się jak zwykle – dużą ilością pracy i jeszcze większymi problemami.

Wydaje mi się (i oczywiście mogę się mylić), że problem leży w procesie podejmowania decyzji. Wychodzimy od strony przeciwnej i **staramy się dostosować nasz problem do wybranego rozwiązania**. I jakoś tak wychodzi, że zawsze tym rozwiązaniem są mikroserwisy. A później rozpoczynają się problemy i trzeba optymalizować.

A można inaczej…

Impact Mapping
==============

Sposobów na lepsze podejmowanie decyzji jest kilka. Ostatnio stosuję i staram się promować model Gojko Adzica zwany Impact Mappingiem:

[![](https://radekmaziarka.pl/wp-content/uploads/2020/02/impact-mapping.jpg)](https://radekmaziarka.pl/wp-content/uploads/2020/02/impact-mapping.jpg)

Aby poprawnie wybrać właściwe rozwiązanie, najpierw trzeba odpowiednio zdefiniować jaki cel chcemy osiągnąć. Na jego podstawie możemy zdefiniować aktorów, czyli osoby, które będą partycypowały w uzyskaniu tego celu. Następnie przechodzimy do opisania wpływu jaki te osoby dokonają na naszym celu. Na końcu określamy jakimi narzędziami wypracujemy ten wpływ. Te narzędzia mogą się dzielić na jeszcze mniejsze zadania.

I niestety, w przeważającej ilości przypadków mikroserwisy są definiowane jako cel, a powinny być narzędziem, a nawet tylko jednym z elementów narzędzia.

Cel – po co optymalizować?
==========================

Pierwszym, bezwzględnym pytaniem, jakie trzeba sobie zadać jest: Co chcemy osiągnąć? Nawet jeśli mikroserwisy muszą być rozwiązaniem, to w zależności od celu mikroserwisy można wdrożyć na wiele sposobów.

Brak zdefiniowanego celu jest typowy dla osób z naszej branży. Zakładamy, że narzędzia same rozwiążą problemy, nie zdając sobie sprawy, że czasami te narzędzia tworzą więcej problemów. Rok 2019 był bardzo obfity w [artykuły](https://docs.google.com/spreadsheets/d/1vjnjAII_8TZBv2XhFHra7kEQzQpOHSZpFIWDjynYYf0/edit#gid=0) opisujące trudności z mikroserwisami i wyjaśniające, dlaczego nie warto od nich rozpoczynać projektu.

Dlatego też **określenie celu jest kluczowe, by móc dobrze dobrać do niego właściwe rozwiązanie**. Możliwe jest, że dla zdefiniowanego celu, nasze zakładane rozwiązanie wcale nie będzie właściwe. Możliwe, że trzeba będzie naszą propozycję zmodyfikować, aby była dobrze dopasowana do potrzeb. Nawet niewielka zmiana w celu potrafi kompletnie zmienić wymagane rozwiązanie.

Aby odpowiednio zdefiniować cel warto pamiętać, że powinien on spełniać zasady [SMART](https://www.mindtools.com/pages/article/smart-goals.htm). Cel „chcemy większej autonomii” nie spełnia chyba żadnej możliwej normy i nie da nam odpowiedzi czy nasza transformacja w stronę mikroserwisów przebiega odpowiednio. Za to cel „Po 3 miesiącach chcemy niezależnie od innych zespołów wdrażać zmiany na produkcję” ma już więcej realizmu.

To co jest ważne podczas definicji celu to współpraca z biznesem – piszemy system dla kogoś, a nie dla nas samych. Cel powinien być wspólny zarówno dla osób technicznych jak i interesariuszy projektu. W przeciwnym wypadku nawet najlepsze rozwiązanie będzie po prostu bezużyteczne.

Aktorzy – jakimi rękoma będziemy optymalizowali
===============================================

Tutaj przechodzimy do nieco nieoczekiwanej części – kim jesteśmy w stanie zrealizować dany cel. Ta kwestia na początku wydaje się oczywista, ale jeśli głębiej się nad nią zastanowimy to już taka nie jest. Np. w omawianym tutaj kontekście nie zawsze jest nią zespół programistyczny.

*   Dla celu „Implementacja zadań przez zespoły nie dotyka tego samego kodu” osobą może być Product Owner, który zacznie lepiej dzielić zadania na obszary.
*   Dla celu „Mamy pewność, że wypuszczona zmiana nie wpływa na inne części systemu” osobą może być dodatkowy tester, który zautomatyzuje część scenariuszy i przetestuje manualnie te pozostałe.
*   Dla celu „Zmniejszenie błędów na styku zespół A – B o 80%” osobą będzie project manager, który zorganizuje spotkanie liderów zespołu by raz na 2 tygodnie przegadywali wspólnie planowane zmiany.

Nie chodzi tutaj o wyjście z wszystkimi możliwymi osobami z projektu. Raczej o pewien eksperyment myślowy, który pozwoli wyjść poza ramy typowych odpowiedzi. Czasem rozwiązanie przychodzi z zewnątrz, czasem nie wszystko trzeba rozwiązywać technicznie.

Wpływ – jaką zmianę wywołamy na optymalizacji
=============================================

W tej części skupiamy się jak nasza akcja wpłynie na ostateczny cel. Czyli chcemy zdefiniować zmianę, która dokona się na danym aktorze bądź, jak aktor przysłuży się nam do osiągnięcia celu. Łatwo jest jednak się pomylić i wychodzić tutaj z listą rozwiązań, zamiast faktycznych zmian w drodze do celu.

Co nie jest wpływem:

*   Mikroserwisy
*   Osobne kanały wdrożeniowe
*   Różne bazy danych

Co jest wpływem:

*   Autonomia pracy zespołów
*   Możliwość wdrażania niezależnych zmian
*   Modele danych dostosowane do problemu

Dlaczego to jest ważne? **Definiując wpływ, a nie rozwiązania, możemy wyjść z różnymi rozwiązaniami do danego wpływu.** Skupiając się na rozwiązaniu zawsze będziemy sobie mogli uzasadnić, że nie ma innego wyjścia z danej sytuacji.

Narzędzia – czym będziemy optymalizowali
========================================

Mając zdefiniowane powyższe obszary można przejść do proponowania rozwiązań. Jeśli odpowiednio przeszliśmy przez powyższe punkty, to powinniśmy mieć przynajmniej kilka możliwych pomysłów jak zaadresować daną sytuację.

Wtedy też można dokonać walidacji czy nasze pierwsze rozwiązania dalej mają sens i czy nie znaleźliśmy czegoś bardziej dostosowanego do naszego problemu. I może być tak, że te mikroserwisy wcale nie są najlepszym (a już na pewno najprostszym) rozwiązaniem na dany moment.

Chcąc osiągnąć:

*   Autonomię pracy zespołów trzeba odpowiednio podzielić zakres odpowiedzialności i zdefiniować ramy kooperacji,
*   Możliwość wdrażania niezależnych zmian można zrealizować jako monorepo z różnymi ścieżkami i budowanie ich niezależnie
*   Osobne modele danych dostosowane do problemu da się wykonać wewnątrz jednej bazy danych, wymuszając brak relacji pomiędzy sobą (testami bądź zaleceniami)

itd.

Na żadną z powyższych kwestii same mikroserwisy nie dadzą nam odpowiedzi. Dużo z problemów, z którymi musimy się rozprawić wdrażając mikroserwisy, **są nie tylko techniczne, ale także socjotechniczne bądź biznesowe**:

*   Jak podzielić naszą domenę biznesową na mniejsze części
*   Jak zarządzać wymaganiami na styku domen
*   Które zespoły będą opiekować się poszczególnymi mikroserwisami
*   Czy te zespoły mają odpowiednie kompetencje do takiej pracy
*   Czy mamy wsparcie klienta w zmianach
*   Czy klient rozumie problemy wynikające z mikroserwisów (opóźnienia, możliwą niespójność danych, dodatkową pracę)

Simon Brown i mikroserwisy
==========================

W dużej części przypadków mikroserwisy nie są odpowiedzią na postawiony cel, przynajmniej nie na początku projektu. Wszystko to zamyka się w odpowiednio podzielonym monolicie i dobrze odseparowanych od siebie modułach / komponentach. Simon Brown w swojej [prezentacji](https://www.youtube.com/watch?v=5OjqD-ow8GE) przedstawiał drogę do mikroserwisów jako ostatni etap dobrej komponentyzacji (twór własny) swojego systemu:

[![](https://radekmaziarka.pl/wp-content/uploads/2020/02/monolith-microservices.jpg)](https://radekmaziarka.pl/wp-content/uploads/2020/02/monolith-microservices.jpg)

To co się rzuca w oczy na tym diagramie to fakt, że mikroserwisy zawierają w sobie głownie aspekty techniczne. I na nich skupiają się programiści, zapominając jednak o najważniejszym.

Aby mieć dobry system mikroserwisowy trzeba umieć go dobrze skomponentyzować. I tutaj potrzebne jest myślenie nietechniczne – skupienie na możliwościach biznesowych, spójność funkcjonalności, podział danych. Mikroserwisy są dopiero kolejnym etapem i nie powinno dokonywać migracji, dopóki poprzedni krok nie jest zakończony.

Więc jeśli chcesz:

*   Odseparować logikę biznesową – wystarczą komponenty
*   Pracować niezależnie – wystarczą komponenty
*   Mieć model dostosowany do problemu – wystarczą komponenty

Lub kiedy:

*   Masz małą aplikację – nie potrzebujesz mikroserwisów (podzielisz system na 2 zbyt złączone komponenty)
*   Domena jest nieznana – nie potrzebujesz mikroserwisów (źle wydzielisz granice mikroserwisów)
*   Zespoły nie są wielofunkcyjne – nie potrzebujesz mikroserwisów (musisz najpierw zmienić strukturę zespołów)

Także najpierw należy się zastanowić po co, a później brać się za robotę 😉