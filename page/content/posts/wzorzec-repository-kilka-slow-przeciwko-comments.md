---
title: 'Wzorzec Repository - kilka słów przeciwko'
slug: '/2016/01/31/wzorzec-repository-kilka-slow-przeciwko/'
date: Sun, 31 Jan 2016 22:56:36 +0000
draft: false
category: 'Wzorce projektowe'
tags: ['']
---


#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Wzorzec-Repository-kilka-slow-przeciwko "") - <time datetime="2016-02-09 09:18:10">Feb 2, 2016</time>

**Wzorzec Repository – kilka słów przeciwko** Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
<hr />
#### 
[Kamil Jóźwiak](http://www.kamiljozwiak.net "kamil@kamiljozwiak.net") - <time datetime="2016-02-09 10:33:00">Feb 2, 2016</time>

Pytanie czy zapis i odczyt w repo narusza SRP? pewnie tak ale czy stosowanie DbContext nie narusza DIP? Ja jednak będę bronił wzorca bo wg. mnie łatwiej jest zmokować repo niż je nastrzykiwać. Pytanie jak zastąpić brak repo w przykadku architektury ports and adapters?
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-09 11:21:00">Feb 2, 2016</time>

Nie za bardzo rozumiem jak DbContext ma naruszać DIP - wstrzykuje się go, czy same IDbSety identycznie jak repozytoria. Odnośnie mocków / wstrzykiwania to preferowałbym testy na danych, głównie in-memory, lub do cięższych rzeczy zastosowanie Query Objectów. W architekturze heksagonalnej (wolę to określenie niż ports and adapters) mamy w centrum Application Domain. I tam zamiast Repository używamy jednego z wzorców opisanych powyżej.
<hr />
#### 
[Assassyn](http://blog.sasin.eu "szymon@sasin.eu") - <time datetime="2016-02-10 11:18:00">Feb 3, 2016</time>

Zawsze mozesz uzyc CQRS (ktora wspiera SRP) i takze bardzo latwo to zastapic mockiem albo stubem. No i nie ma problemow w P&A. U mnie przewaznie jeden modul wystawia interface do dostepu do danyc, a inny modul implmentuje dostep do bazy danych. Takie rozwiazanie pozwala takze na szybka podmiane bazy danych jesli potrzeba.
<hr />
#### 
[Assassyn](http://blog.sasin.eu "szymon@sasin.eu") - <time datetime="2016-02-10 11:19:00">Feb 3, 2016</time>

Czy mi sie wydaje czy "idea query objectów (finderów)" to po prostu CQ(R)S?
<hr />
#### 
[Grzegorz Morawski](http://moromind.pl/ "grzegorz.morawski.777@gmail.com") - <time datetime="2016-02-10 12:18:00">Feb 3, 2016</time>

Fajny post. Dobrze podsumowuje bolączki związane z repository. Takie "sprzeczki" w nowym projekcie są bardzo istotne i warto je kultywować. Najsłabszym podejściem jest zebranie kilku wzorców, ponieważ "w poprzednim projekcie działało", albo "tak się robi od lat". To, że wzorzec/technologia X był dobry do projektu Y nie oznacza, że warto go użyć w projekcie Z. Więcej! To że był dobry w projekcie Y nie musi oznaczać, że nadal byłby dobry gdybyśmy teraz zaczynali pisać projekt Y. Nie zawsze jesteśmy tego świadomi.
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 13:18:00">Feb 3, 2016</time>

Nie do końca - CQRS to jest raczej o wiele szerszy temat. Query/finder jest jedynie pewną częścią tego wzorca i nie ma potrzeby stosowania całego CQRS w swojej aplikacji by używać Query.
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 13:19:00">Feb 3, 2016</time>

Czym jest P&A? :)
<hr />
#### 
[Kamil Jóźwiak](http://www.kamiljozwiak.net "kamil@kamiljozwiak.net") - <time datetime="2016-02-10 13:41:00">Feb 3, 2016</time>

Ports and Adapters :)
<hr />
#### 
[Assassyn](http://blog.sasin.eu "szymon@sasin.eu") - <time datetime="2016-02-10 14:54:00">Feb 3, 2016</time>

nie zgodze sie z tym, CQRS ( czy tez CQS, bo to jest to samo) mowi tylko o podziale klasycznego "repozytorium" na dwa obiekty, teraz jak masz system ktory nie zapisuje i uzywasz Query/finder to nadal uzywasz CQRS tylko bez Commands.
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 19:40:00">Feb 3, 2016</time>

Kłócimy się tutaj nad semantyką. IMO jak używam zamiennie IDbSet i Query to nie jest to CQRS, ale głupio tracić czas nad rozróżnianiem i jeśli uznajesz inaczej to to akceptuję.
<hr />
#### 
[Arek Bal]( "arek_bal@wp.pl") - <time datetime="2016-02-10 21:47:00">Feb 3, 2016</time>

Może panowie rozjaśnię to za was: - CQS to stary jak świat "programowania" concept podzielenia chociażby różnych metod/funkcji na te które tylko coś zwracają i nic nie modyfikują, od tych które coś zmieniają. - CQRS można rozumieć na dwa sposoby, w pierwszym to to samo co powyższe, a w drugim to "nowożytna" "metodologia" budowania aplikacji oparta o CQS, kolejkowanie wiadomości/zdarzeń(Rabbit MQ, NetBus, whatever) i bazę w stylu "Event Sourcing"(najmniej chętnie SQL) Dlatego najlepiej używać CQS gdy mówimy tylko o rozdzieleniu odczytu od modyfikacji, "QueryObject" gdy mówimy o obiekcie opakowującym i reprezentującym zapytanie w trakcie, QueryBuilderze gdy mówimy o obiekcie składającym z kodu zapytanie np. (IQueryable i podobne). A CQRS gdy mówimy o tej "modnej" koncepcji.
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 22:05:00">Feb 3, 2016</time>

To też bym nazwał jedną z wizji. W wielu miejscach się spotkałem z takim rozdziałem: "Originally, CQRS was called "CQS", too. But it was determined that the two are different enough for CQRS to have its own name. The main distinguishing feature is this: - CQS puts commands and queries in different methods within a type. - CQRS puts commands and queries on different objects." Czy też Bogard: "CQRS is just 2 objects for read/write where once there was one. CQS is about methods being either queries or commands - returning state or mutating state but not both." Także nie chodzi o modę a rozdział na metody/obiekty.
<hr />
#### 
[Arek Bal]( "arek_bal@wp.pl") - <time datetime="2016-02-11 02:10:00">Feb 4, 2016</time>

Nic sobie nie wymyśliłem: http://martinfowler.com/bliki/CommandQuerySeparation.html http://martinfowler.com/bliki/CQRS.html http://udidahan.com/2009/12/09/clarified-cqrs/ https://cqrs.wordpress.com/documents/cqrs-introduction/ https://msdn.microsoft.com/en-us/library/jj591573.aspx https://msdn.microsoft.com/en-us/library/jj554200.aspx http://cqrs.nu/Faq/command-query-responsibility-segregation http://www.codeproject.com/Articles/555855/Introduction-to-CQRS https://lostechies.com/gabrielschenker/2015/04/07/cqrs-revisited/ Generalnie chodzi o tego gościa(Greg Young) i jego "nowoczesne" spostrzeżenia w tej dziedzinie: https://www.youtube.com/watch?v=JHGkaShoyNs https://cqrs.files.wordpress.com/2010/11/cqrs\_documents.pdf https://github.com/gregoryyoung/m-r
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-11 11:27:00">Feb 4, 2016</time>

Dzięki za te artykuły :) część już znam, ale zapoznam się z resztą i odpiszę.
<hr />
#### 
[Michal Michal]( "misiekphp@wp.pl") - <time datetime="2016-02-11 18:25:00">Feb 4, 2016</time>

No dobrze - a co jesli mamy zapytanie, ktore jest wywolywane w roznych serwisach - umieszczenie go w repozytorium umozliwia to, ze to zapytanie nie bedzie zduplikowane w kazdym serwisie, ktory go potrzebuje - a skoro nie uzywasz repozytoriow to gdzie takie zapytania umieszczasz?
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-11 22:59:00">Feb 4, 2016</time>

Zależy jakie to jest zapytanie. Na pewno współdzielony query object da radę. Pomyślałbym także nad przemyśleniem czy naprawdę potrzebujemy takiego samego zapytania w kilku miejscach - widziałem wiele razy jak ludzie używali współdzielonych metod z repozytoriów by rezultaty rozwijać jakimiś dodatkowymi helperami. W takim miejscu rozbiłbym to na mniejsze obiekty ściśle zorientowane na daną domenę.
<hr />
#### 
[Krystian Czaplicki]( "krystianBizspark@outlook.com") - <time datetime="2016-02-11 23:18:00">Feb 4, 2016</time>

Uwagi wartę przemyślenia, sam bardzo często łapie się, że wykorzystuje wiele wzorców bądź znanych mi technologii wyłącznie dlatego, że je znam i wykorzystywałem we wcześniejszych projektach pomijając analizę czy naprawdę tego potrzebuje. Co do samego wzorca to staram się go wykorzystywać z prostego powodu, często występuje potrzeba pewnego filtrowania danych, która pojawia się w połowie projektu. Przykładowo długi czas operowałem na podstawowych rolach użytkowników, lecz później powstaje potrzeba dodania specjalnych mapowań rola - funkcjonalność, tak aby możliwe było dodawanie uprawnień wyłącznie do niektórych akcji rozszerzając tym samym podstawowe uprawnienia i w wypadku, gdybym operował na czystym kontekście to wszystkie zapytania musiałbym odnaleźć oraz odpowiednio rozszerzyć, natomiast w przypadku Repository mogę to zrobić już w samej klasie związanej z wzorcem. Oczywiście nie bez uwagi przechodzi fakt, że używanie tego wzorca znacznie zwiększa czytelność kodu, przynajmniej w moim wykonaniu, lecz Twój tekst dał mi do myślenia i następnym razem dwa razy się zastanowię zanim go zastosuję.
<hr />
#### 
[Michal Michal]( "misiekphp@wp.pl") - <time datetime="2016-02-13 18:12:00">Feb 6, 2016</time>

Czy masz na mysli query object z architektury CQRS?
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-16 09:42:00">Feb 2, 2016</time>

Tak, chociaż nie trzeba wcale używać całego stacku CQRS by mieć Query Objecty: http://martinfowler.com/eaaCatalog/queryObject.html https://lostechies.com/jimmybogard/2012/10/08/favor-query-objects-over-repositories/
<hr />
#### 
[Hryniewski.NET | Wzorzec Repozytorium i Unit of Work](http://hryniewski.net/post/wzorzec-repozytorium-i-unit-of-work "") - <time datetime="2016-03-08 23:24:46">Mar 2, 2016</time>

\[…\] Kilka linków:http://radblog.pl/2016/01/wzorzec-repository-kilka-slow-przeciwko/ \[…\]
<hr />
