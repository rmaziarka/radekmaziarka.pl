---
title: 'Wzorzec Repository - kilka słów przeciwko'
url: '/2016/01/31/wzorzec-repository-kilka-slow-przeciwko/'
date: Sun, 31 Jan 2016 22:56:36 +0000
draft: false
images: []
category: 'Wzorce projektowe'
tags: ['']
---

Początki nowego projektu zawsze są interesujące - można posprzeczać się na tematy możliwych do użycia technologii / wzorców / planowanej architektury. Później, gdy już projekt zastyga i klepiemy tylko kolejne widoki każda kolejna próba takiej dyskusji kończy się tekstem typu: "Ale po co o tym gadać - i tak nic nie zmienimy bo trzeba by całą aplikację przepisywać".

I tak sobie rozmawiając trafiliśmy na wzorzec Repository. Ja objawiłem się tutaj jako duży przeciwnik tego wzorca, moi rozmówcy zaś byli za nim. Prowadząc dyskusję wyklarowałem kilka ciekawych argumentów którymi chciałbym się tutaj podzielić. Ta dyskusja była w internecie przeprowadzana już tysiąc razy, ale wyszło że trzeba ją przeprowadzić jeszcze raz.

Dla mnie wzorzec Repository, w obecnym kształcie w jakim jest on stosowany czyli [nakładka](http://blog.gauffin.org/2013/01/11/repository-pattern-done-right/) na Entity Framework / NHibernate, jest indoktrynacją jaką wtłaczały w w nas mądre głowy, szczególnie z [Microsoftu](http://www.asp.net/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application), stosując od lat te same wzorce w infrastrukturach które tych repozytoriów nie potrzebują. Repozytoria powstały w czasach kiedy stosowano je by ukryć zapytania SQLowe przed logiką biznesową. Aktualnie zaś sam EF'owy DbContext implementuje interfejs Repository, przez co tworzymy abstrakcję nad abstrakcją bazy danych:

> A DbContext instance represents a combination of the Unit Of Work and Repository patterns such that it can be used to query from a database and group together changes that will then be written back to the store as a unit. - [MSDN](https://msdn.microsoft.com/en-us/library/system.data.entity.dbcontext(v=vs.113).aspx)

Repozytoria promowane w obecnym kształcie mają swoje wady:

 *   Promują duże klasy które są agregatorami wszystkich metod nad daną encją. Nie jest ważne biznesowe użycie danej metody, mamy zbiór niepowiązanych ze sobą metod mających tylko wspólne źródło danych. Tworzy się później śmietnisko jednorazowych metod.
 *   Metody łączące ze sobą 2 lub więcej encji są umieszczane wg subiektywnej opinii w jednym z repozytoriów. W następstwie osoba uważająca inaczej albo straci czas szukając tej metody, lub stworzy jej odpowiednik w drugim repozytorium.
 *   Tworzymy opakowania na mechanizmy bazy danych, które uniemożliwiają nam skorzystanie z nich bez dodawania kolejnych metod. Lazy loading/eager fetching, cache 1/2 poziomu, transakcje i wiele innych.
 *   Repozytoria posiadające jednocześnie metody zapisu i odczytu łamią zasadę SRP - Bogard dobrze pokazał to na przykładzie dekompozycji wzorca Repository w swojej [prezentacji](https://vimeo.com/131633177).
 *   Repozytoria zachęcają do wprowadzania wyłomów tworząc metody zwracające IQueryable, metody pozwalające filtrować z przekazaniem funkcji filtrującej itd. Wszystko to by szybciej pisać i omijać problemy z dodawaniem kolejnych metod do repozytorium. Jednak tworzy to problem przenoszenia logiki wyciągania danych z bazy do użytkowników repozytorium.

Dużo osób wzbrania się przez użyciem bezpośrednio w kodzie kontekstu bazy przez opinię, że wtedy nie można poprawnie testować kodu ponieważ musimy zapewnić bazie dane na jakich ma kontekst operować. I wg mnie jest to niesłuszna obawa. Można sprawić by kontekt używał pod spodem listy encji / bazy in-memory, dzięki czemu testy będą przebiegały szybciej, a my będziemy mieli lepiej przetestowany kod. Robienie abstrakcji sprawi że napiszemy więcej kodu, a będziemy mieli mniejszą pewność że kod działa tak jak powinien.

Ja jako zamienniki repozytorium używałbym (w zależności od skomplikowania domeny):

 *   W prostych domenach (słowniki, listy) używanie wprost DbContextu lub prostego [interfejsu](https://dotnetfiddle.net/LIc6gn) na DbContext’cie który zwraca IDbSet danego typu. Mamy przez to możliwość mockowania i zachowaną prostotę.
 *   Można również wstrzykiwać bezpośrednio IDbSet i wtedy mamy jedynie możliwość robienia zapytań. Dla prostych przypadków np. zapytania po obiekt przez identyfikator to bardzo słuszna droga.
 *   [DataSourceResult](http://docs.telerik.com/kendo-ui/aspnet-mvc/helpers/grid/ajax-binding) od kendo które potrafi zwrócić dane z grida odpowiednio przefiltrowane / posortowane itd.
 *   [Query Objecty](https://lostechies.com/jimmybogard/2012/10/08/favor-query-objects-over-repositories/) które tworzymy dla bardziej skomplikowanego żądania danych. Dzieki temu mamy większą granulację i zachowaną zasadę SRP.
 *   AutoMapper i [ProjectTo](https://github.com/AutoMapper/AutoMapper/wiki/Queryable-Extensions), który zamienia mapowanie encji -> dto na kod SQL wykonywany w jednym zapytaniu.
 *   [Breeze](http://www.getbreezenow.com/breezejs) który pozwala wystawić interfejs IQueryable na zewnątrz i odpowiednio queryować zbiór danych. Są dodatki do prawie każdego języka i źródła danych.

Szczególnie ciekawa jest idea query objectów (finderów) - pisali o tym [Bogard](https://lostechies.com/jimmybogard/2012/10/08/favor-query-objects-over-repositories/) i [Ayende](https://ayende.com/blog/3955/repository-is-the-new-singleton). Tworzymy obiekt zapytania, która wystawia metodę Execute (tak jest u Bogarda) zwracającą dane odpowiednio przefiltrowane i zmapowane. Jest to świetny sposób by sprawić by nasz kod był bardziej zorientowany domenowo, nie łamał zasady SRP i był całkowicie testowalny. Używałem tego wzorca podczas pisania jednej z mojej aplikacji i kod był o wiele lepiej zrozumiały i rozszerzalny niż w przypadku użycia wzorca Repository. Każda domena aplikacji miała własne query, które mapowały dane z bazy do odpowiedników biznesowych używanych w danych domenach.

Wzorzec Repository ma sens jeśli będzie ukrywał pod sobą dodatkową logikę, która rozszerzy działanie ORM o niedostępną dla niego funkcjonalność. Taką logiką może być np. warstwa bezpieczeństwa, która do każdego zapytania doda warunki sprawdzające czy użytkownik ma prawo dostępu do wyszukiwanych danych. Ale w 95% przypadków tworzymy jedynie niepotrzebną przeplotkę nad ORM, która sprawia że tracimy czas i mamy coraz większe spaghetti w kodzie. Chcąc ułatwić sobie życie tworzymy tylko więcej problemów. Wzorzec Repository jest nienaturalnie nadużywany, co zauważyli już sami propagatorzy DDD. Ayende pisze w swoim artykule: _Quite frankly, and here I fully share the blame, the Repository pattern is popular. _Dlatego polecam go używać jedynie w przypadkach gdy widzimy realną potrzebę jego wykorzystania, a nie stoi za nami duch przeszłości, mówiący że skoro tak ludzie robili od zawsze to teraz też tak zróbmy. Wcale nie.

Na koniec zostawię zagregowaną listę artykułów / postów mających podobne uwagi w tym temacie. Na nich się wzorowałem pisząc ten artykuł i są one rozszerzeniem tego posta:

 *   [https://ayende.com/blog/3955/repository-is-the-new-singleton](https://ayende.com/blog/3955/repository-is-the-new-singleton)
 *   [http://www.ben-morris.com/why-the-generic-repository-is-just-a-lazy-anti-pattern/](http://www.ben-morris.com/why-the-generic-repository-is-just-a-lazy-anti-pattern/)
 *   [http://blog.sapiensworks.com/post/2012/03/05/The-Generic-Repository-Is-An-Anti-Pattern.aspx/](http://blog.sapiensworks.com/post/2012/03/05/The-Generic-Repository-Is-An-Anti-Pattern.aspx/)
 *   [https://lostechies.com/jimmybogard/2012/09/20/limiting-your-abstractions/](https://lostechies.com/jimmybogard/2012/09/20/limiting-your-abstractions/)
 *   [https://lostechies.com/jimmybogard/2012/10/08/favor-query-objects-over-repositories/](https://lostechies.com/jimmybogard/2012/10/08/favor-query-objects-over-repositories/)
 *   [http://rob.conery.io/2014/03/04/repositories-and-unitofwork-are-not-a-good-idea/](http://rob.conery.io/2014/03/04/repositories-and-unitofwork-are-not-a-good-idea/)
 *   [http://piotrgankiewicz.com/2016/03/05/repository-so-we-meet-again/](http://piotrgankiewicz.com/2016/03/05/repository-so-we-meet-again/)
 *   [http://codingtv.pl/repozytorium-stosowac-czy-nie/](http://codingtv.pl/repozytorium-stosowac-czy-nie/)
 *   http://commitandrun.pl/2016/05/11/Repozytorium_najbardziej_niepotrzebny_wzorzec_projektowy/
 *   [http://forum.4programmers.net/Inzynieria_oprogramowania/214921-wzorzec_repozytorium?p=940208#id940208 ](http://forum.4programmers.net/Inzynieria_oprogramowania/214921-wzorzec_repozytorium?p=940208#id940208)
 *   [http://devpytania.pl/questions/6427/repository-pattern-czy-uzywac/6433](http://devpytania.pl/questions/6427/repository-pattern-czy-uzywac/6433)
 *   [http://forum.4programmers.net/Inzynieria_oprogramowania/230646-testowanie_repository?p=1018514#id1018514 ](http://forum.4programmers.net/Inzynieria_oprogramowania/230646-testowanie_repository?p=1018514#id1018514)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Wzorzec-Repository-kilka-slow-przeciwko "") - <time datetime="2016-02-09 09:18:10">Feb 2, 2016</time>

**Wzorzec Repository – kilka słów przeciwko**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[Kamil Jóźwiak](http://www.kamiljozwiak.net "kamil@kamiljozwiak.net") - <time datetime="2016-02-09 10:33:00">Feb 2, 2016</time>

Pytanie czy zapis i odczyt w repo narusza SRP? pewnie tak ale czy stosowanie DbContext nie narusza DIP? Ja jednak będę bronił wzorca bo wg. mnie łatwiej jest zmokować repo niż je nastrzykiwać. 
Pytanie jak zastąpić brak repo w przykadku architektury ports and adapters?
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-09 11:21:00">Feb 2, 2016</time>

Nie za bardzo rozumiem jak DbContext ma naruszać DIP - wstrzykuje się go, czy same IDbSety identycznie jak repozytoria. 

Odnośnie mocków / wstrzykiwania to preferowałbym testy na danych, głównie in-memory, lub do cięższych rzeczy zastosowanie Query Objectów.

W architekturze heksagonalnej (wolę to określenie niż ports and adapters) mamy w centrum Application Domain. I tam zamiast Repository używamy jednego z wzorców opisanych powyżej.
#### 
[Assassyn](http://blog.sasin.eu "szymon@sasin.eu") - <time datetime="2016-02-10 11:18:00">Feb 3, 2016</time>

Zawsze mozesz uzyc CQRS (ktora wspiera SRP) i takze bardzo latwo to zastapic mockiem albo stubem.

No i nie ma problemow w P&A. U mnie przewaznie jeden modul wystawia interface do dostepu do danyc, a inny modul implmentuje dostep do bazy danych. Takie rozwiazanie pozwala takze na szybka podmiane bazy danych jesli potrzeba.
#### 
[Assassyn](http://blog.sasin.eu "szymon@sasin.eu") - <time datetime="2016-02-10 11:19:00">Feb 3, 2016</time>

Czy mi sie wydaje czy "idea query objectów (finderów)" to po prostu CQ(R)S?
#### 
[Grzegorz Morawski](http://moromind.pl/ "grzegorz.morawski.777@gmail.com") - <time datetime="2016-02-10 12:18:00">Feb 3, 2016</time>

Fajny post. Dobrze podsumowuje bolączki związane z repository. Takie "sprzeczki" w nowym projekcie są bardzo istotne i warto je kultywować. Najsłabszym podejściem jest zebranie kilku wzorców, ponieważ "w poprzednim projekcie działało", albo "tak się robi od lat". To, że wzorzec/technologia X był dobry do projektu Y nie oznacza, że warto go użyć w projekcie Z. Więcej! To że był dobry w projekcie Y nie musi oznaczać, że nadal byłby dobry gdybyśmy teraz zaczynali pisać projekt Y. Nie zawsze jesteśmy tego świadomi.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 13:18:00">Feb 3, 2016</time>

Nie do końca - CQRS to jest raczej o wiele szerszy temat. Query/finder jest jedynie pewną częścią tego wzorca i nie ma potrzeby stosowania całego CQRS w swojej aplikacji by używać Query.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 13:19:00">Feb 3, 2016</time>

Czym jest P&A? :)
#### 
[Kamil Jóźwiak](http://www.kamiljozwiak.net "kamil@kamiljozwiak.net") - <time datetime="2016-02-10 13:41:00">Feb 3, 2016</time>

Ports and Adapters :)
#### 
[Assassyn](http://blog.sasin.eu "szymon@sasin.eu") - <time datetime="2016-02-10 14:54:00">Feb 3, 2016</time>

nie zgodze sie z tym, CQRS ( czy tez CQS, bo to jest to samo) mowi tylko o podziale klasycznego "repozytorium" na dwa obiekty, teraz jak masz system ktory nie zapisuje i uzywasz Query/finder to nadal uzywasz CQRS tylko bez Commands.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 19:40:00">Feb 3, 2016</time>

Kłócimy się tutaj nad semantyką. IMO jak używam zamiennie IDbSet i Query to nie jest to CQRS, ale głupio tracić czas nad rozróżnianiem i jeśli uznajesz inaczej to to akceptuję.
#### 
[Arek Bal]( "arek_bal@wp.pl") - <time datetime="2016-02-10 21:47:00">Feb 3, 2016</time>

Może panowie rozjaśnię to za was:
- CQS to stary jak świat "programowania" concept podzielenia chociażby różnych metod/funkcji na te które tylko coś zwracają i nic nie modyfikują, od tych które coś zmieniają.
- CQRS można rozumieć na dwa sposoby, w pierwszym to to samo co powyższe, a w drugim to "nowożytna" "metodologia" budowania aplikacji oparta o CQS,  kolejkowanie wiadomości/zdarzeń(Rabbit MQ, NetBus, whatever) i bazę w stylu "Event Sourcing"(najmniej chętnie SQL)
Dlatego najlepiej używać CQS gdy mówimy tylko o rozdzieleniu odczytu od modyfikacji, "QueryObject" gdy mówimy o obiekcie opakowującym i reprezentującym zapytanie w trakcie, QueryBuilderze gdy mówimy o obiekcie składającym z kodu zapytanie np. (IQueryable i podobne). A CQRS gdy mówimy o tej "modnej" koncepcji.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-10 22:05:00">Feb 3, 2016</time>

To też bym nazwał jedną z wizji. W wielu miejscach się spotkałem z takim rozdziałem:

"Originally, CQRS was called "CQS", too. But it was determined that the two are different enough for CQRS to have its own name. The main distinguishing feature is this:
- CQS puts commands and queries in different methods within a type.
- CQRS puts commands and queries on different objects."

Czy też Bogard:
"CQRS is just 2 objects for read/write where once there was one. CQS is about methods being either queries or commands - returning state or mutating state but not both."

Także nie chodzi o modę a rozdział na metody/obiekty.
#### 
[Arek Bal]( "arek_bal@wp.pl") - <time datetime="2016-02-11 02:10:00">Feb 4, 2016</time>

Nic sobie nie wymyśliłem:
http://martinfowler.com/bliki/CommandQuerySeparation.html
http://martinfowler.com/bliki/CQRS.html
http://udidahan.com/2009/12/09/clarified-cqrs/
https://cqrs.wordpress.com/documents/cqrs-introduction/
https://msdn.microsoft.com/en-us/library/jj591573.aspx
https://msdn.microsoft.com/en-us/library/jj554200.aspx
http://cqrs.nu/Faq/command-query-responsibility-segregation
http://www.codeproject.com/Articles/555855/Introduction-to-CQRS
https://lostechies.com/gabrielschenker/2015/04/07/cqrs-revisited/

Generalnie chodzi o tego gościa(Greg Young) i jego "nowoczesne" spostrzeżenia w tej dziedzinie:
https://www.youtube.com/watch?v=JHGkaShoyNs
https://cqrs.files.wordpress.com/2010/11/cqrs\_documents.pdf
https://github.com/gregoryyoung/m-r
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-11 11:27:00">Feb 4, 2016</time>

Dzięki za te artykuły :) część już znam, ale zapoznam się z resztą i odpiszę.
#### 
[Michal Michal]( "misiekphp@wp.pl") - <time datetime="2016-02-11 18:25:00">Feb 4, 2016</time>

No dobrze - a co jesli mamy zapytanie, ktore jest wywolywane w roznych serwisach - umieszczenie go w repozytorium umozliwia to, ze to zapytanie nie bedzie zduplikowane w kazdym serwisie, ktory go potrzebuje - a skoro nie uzywasz repozytoriow to gdzie takie zapytania umieszczasz?
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-11 22:59:00">Feb 4, 2016</time>

Zależy jakie to jest zapytanie. Na pewno współdzielony query object da radę. Pomyślałbym także nad przemyśleniem czy naprawdę potrzebujemy takiego samego zapytania w kilku miejscach - widziałem wiele razy jak ludzie używali współdzielonych metod z repozytoriów by rezultaty rozwijać jakimiś dodatkowymi helperami. W takim miejscu rozbiłbym to na mniejsze obiekty ściśle zorientowane na daną domenę.
#### 
[Krystian Czaplicki]( "krystianBizspark@outlook.com") - <time datetime="2016-02-11 23:18:00">Feb 4, 2016</time>

Uwagi wartę przemyślenia, sam bardzo często łapie się, że wykorzystuje wiele wzorców bądź znanych mi technologii wyłącznie dlatego, że je znam i wykorzystywałem we wcześniejszych projektach pomijając analizę czy naprawdę tego potrzebuje. Co do samego wzorca to staram się go wykorzystywać z prostego powodu, często występuje potrzeba pewnego filtrowania danych, która pojawia się w połowie projektu. Przykładowo długi czas operowałem na podstawowych rolach użytkowników, lecz później powstaje potrzeba dodania specjalnych mapowań rola - funkcjonalność, tak aby możliwe było dodawanie uprawnień wyłącznie do niektórych akcji rozszerzając tym samym podstawowe uprawnienia i w wypadku, gdybym operował na czystym kontekście to wszystkie zapytania musiałbym odnaleźć oraz odpowiednio rozszerzyć, natomiast w przypadku Repository mogę to zrobić już w samej klasie związanej z wzorcem. Oczywiście nie bez uwagi przechodzi fakt, że używanie tego wzorca znacznie zwiększa czytelność kodu, przynajmniej w moim wykonaniu, lecz Twój tekst dał mi do myślenia i następnym razem dwa razy się zastanowię zanim go zastosuję.
#### 
[Michal Michal]( "misiekphp@wp.pl") - <time datetime="2016-02-13 18:12:00">Feb 6, 2016</time>

Czy masz na mysli query object z architektury CQRS?
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-16 09:42:00">Feb 2, 2016</time>

Tak, chociaż nie trzeba wcale używać całego stacku CQRS by mieć Query Objecty:
http://martinfowler.com/eaaCatalog/queryObject.html
https://lostechies.com/jimmybogard/2012/10/08/favor-query-objects-over-repositories/
#### 
[Hryniewski.NET | Wzorzec Repozytorium i Unit of Work](http://hryniewski.net/post/wzorzec-repozytorium-i-unit-of-work "") - <time datetime="2016-03-08 23:24:46">Mar 2, 2016</time>

\[…\] Kilka linków:http://radblog.pl/2016/01/wzorzec-repository-kilka-slow-przeciwko/ \[…\]
