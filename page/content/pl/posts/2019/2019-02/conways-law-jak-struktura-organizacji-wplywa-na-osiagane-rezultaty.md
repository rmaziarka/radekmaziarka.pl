---
title: 'Conway''s Law - jak struktura organizacji wpływa na osiągane rezultaty'
url: '/2019/02/25/conways-law-jak-struktura-organizacji-wplywa-na-osiagane-rezultaty/'
date: Mon, 25 Feb 2019 20:58:01 +0000
draft: false
featured_image: 'images/2019/02/acropolis-2725918_960_720.jpg'
category: 'Różne'
tags: ['']
---

Temat [prawa Conwaya](http://www.melconway.com/Home/Conways_Law.html) jest od dawna przypominany i wraca w kolejnych potwierdzeniach o jego istotności i wagi przy naszej codziennej pracy.

> „Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure.”

Czyli organizacja będzie wytwarzała produkt, który będzie odwzorowaniem jej struktury komunikacyjnej.  Tylko co to znaczy i jak na nas wpływa? Samo prawo brzmi niestety nieco enigmatycznie. Ma jednak ogromne przełożenie na rezultaty pracy naszych zespołów.

## Prawo Conway’a – przypadek teoretyczny

Załóżmy, że mamy firmę, która ma działy skierowane na różne segmenty rynku samochodowego:

 *   samochodów osobowych
 *   samochodów dostawczych małych
 *   samochodów ciężarowych
 *   sprzętu budowlanego.

Działy pracują wewnątrz jednej firmy, ale mają osobne departamenty, zarządzanie, finansowanie i wskaźniki raportowe. Są skoncentrowane na rozwoju swojego segmentu, mają jasno opisane cele i zakres pracy.

Taka struktura będzie słabo rozwiązywała problemy lub wytwarzała rozwiązania wymagające kooperacji kilku działów (np. usprawnienie zwiększające efektywność silników). Zaplanowanie odpowiednich spotkań, definicja celów, angażowanie osób – to wszystko będzie o wiele trudniejsze, bo będzie wymagało synchronizacji grup, które mogą mieć odmienne inne cele, plany, możliwości.

Przy takiej strukturze pracy usprawnienia w ogóle nie będą zachodziły, lub nie będzie na nich kładziony odpowiedni nacisk.  Może dochodzić do „odkrywania koła na nowo” i narzekania na zbyt niską współpracę pomiędzy działami.  Każdy będzie bronił swojej odpowiedzialności i zwalał winę na innych.

## Prawo Conway’a – świat IT

Prawo Conway’a bardzo mocno wpływa na tworzone przez nas rozwiązania informatyczne. Eric Raymond, współzałożyciel Open Source Initiative, określił w [Jargon](http://catb.org/~esr/jargon/html/C/Conways-Law.html), że: „Jeśli masz 4 grupy pracujące nad kompilatorem, to dostaniesz 4-krokowy kompilator”. Jest to opisanie prostego spostrzeżenia:

 *   Mamy osobne grupy, które muszą ze sobą współpracować
 *   Synchronizując się ustalą parametry współpracy
 *   Te parametry przeniosą się na interfejsy współpracy ich modułów w kodzie.

Prawo Conway’a uzasadnia również nacisk na [cross-functional teams](https://agileforall.com/org-structure-software-architecture-and-cross-functional-teams/) i wspieranie trendu [DevOps](https://devops.com/what-can-conways-law-teach-us-about-devops/). Im większa ilość osób w zespole mogących przekrojowo rozwiązać problemy, tym mniej zależności od innych zespołów i niepotrzebych opóźnień / strat czasu. Wszystko może zamknąć się w „jednym pokoju” – analiza / zaimplementowanie / przetestowanie / wdrożenie.

[![](/images/2019/02/1.jpg)](/images/2019/02/1.jpg)

Dużo się mówi o prawie Conway’a w kontekście [mikroserwisów](https://martinfowler.com/articles/microservices.html#OrganizedAroundBusinessCapabilities). Nieprawidłowy podział osób będzie skutkował problemami komunikacyjnymi, które następnie przełożą się na tworzone rozwiązanie. Również zbyt słaba autonomia zespołów może być problemem. Każdy zespół będzie wpływać na siebie nazwajem, co zostanie skopiowane na architekturę – stworzony zostanie system mocno ze sobą związany (tightly-coupled).

## Prawo Conway’a – przypadki rzeczywiste

W literaturze możemy znaleźć 2 świetne materiały o działaniu tego prawa w praktyce.

[![](/images/2019/02/2.jpg)](/images/2019/02/2.jpg)

Microsoft w swojej [analizie](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2008-11.pdf) opisał w jaki sposób jego struktura organizacji wpłynęła na ilość błędów i jakość systemu Microsoft Vista. Na podstawie prawdziwych danych dokonano obliczeń, które jasno wskazały, że skomplikowana struktura i niejasny proces decyzyjny negatywnie wpłynęły na dostarczone rozwiązanie.

Jest również bardzo dobry [papier naukowy](http://www.hbs.edu/faculty/Publication%20Files/08-039_1861e507-1dc1-4602-85b8-90d71559d85b.pdf?lipi=urn:li:page:d_flagship3_pulse_read;Jt69%2BCqYSgSZqq23lkSrbA%3D%3D) z Harvard Business School opisujący jak struktura firm, wpłynęła na strukturę oprogramowania jakie te firmy tworzyły. Organizacje działająco open-source’owo miały architekturę bardziej „loosely-coupled” co pokrywało się w ich sposobie działania. Organizacje close-sourced pracowały bardziej zwarcie, przez co też tworzyły takie oprogramowanie – złączone, z dużą ilością powiązań.

Można też przytoczyć tutaj mniej oficjalne materiały jak [artykuł](https://www.dobreprogramy.pl/Microsoft-sie-zmienia-szef-Windowsa-nie-pasuje-do-inteligentnych-chmur,News,87205.html) Adama Golańskiego opisujący zmiany struktury Microsoftu podyktowane prawem Conway’a czy [dokument](https://assets.publishing.service.gov.uk/media/57a08da640f0b652dd001abc/Usability-issues-in-website-design.pdf) Nigela Bevana opisujący jak struktura organizacji wpływa na budowę strony internetowej tej firmy.

## Prawo Conway’a – mój przykład

Ja sam również bardzo mocno doświadczyłem działania tego prawa Conway'a. Stąd też moja inwestygacja na jego temat.

W jednym z moich poprzednich projektów była osoba, która posiadała w teorii niewielki wpływ na system – miała nam pomóc przy końcowej fazie wdrożenia systemu na produkcję. Niestety, była po za strukturą naszego projektu – miała innego przełożonego niż nasz Product Manager.  Nie mieliśmy więc jak wpłynąć na tą osobę i przekonać, by dostosowała swoją wizję do naszego rozwiązania.

Ta osoba wymusiła więc na nas wdrożenie swojego spojrzenia na to jak nasze rozwiązanie powinno być zbudowane. Nie byliśmy w stanie tworzyć systemu tak jak potrzebujemy – każda zmiana musiała być z nim konsultowana. Skończyło się na ogromnych problemach i dziesiątkach straconych godzin na rework i dostosowywania.

## Prawo Conway’a – wpływ na pracę organizacji

[![](/images/2019/02/3.jpg)](/images/2019/02/3.jpg)

Jeśli struktura organizacji spełnia potrzeby biznesowe tej organizacji to w teorii nie dzieje się żaden problem. Gorzej, jeśli struktura nie będzie dostosowana do problemu jaki ta organizacja chce rozwiązać, bo wtedy:

 *   Dokonanie jakiejkolwiek decyzji będzie wymagało bardzo wielu decyzji w bardzo wielu różnych grupach.
 *   Komunikacja przez wiele grup, warstw i hierarchii będzie bardzo wolna i nieefektywna. Będą występowały błędy w tłumaczeniach przez co właściwa wiadomość może w ogóle nie dotrzeć do adresata.
 *   Wszelkiego rodzaju reguły, polityki, procedury będą się stawały barierą do podejmowania decyzji i zmian strategicznych.
 *   Ludzie będą trwali w swoich nawykach obawiając się zmiany. W ich mniemaniu może ona doprowadzić do utraty władzy i pozycji w organizacji.

Struktura organizacji będzie raczej broniła sama siebie, zamiast wspierać dostosowywanie się do problemu jaki ma ona rozwiązywać.

## Prawo Conway’a – powody działania

[![](/images/2019/02/4.jpg)](/images/2019/02/4.jpg)

Prawo Conway’a nie jest prawem w sensie stricte – nie można udowodnić jego działania tak jak innych praw fizycznych. Ale jest wiele powodów, dlaczego ludzie mogą działać według tego prawa:

 *   Ograniczenia komunikacyjne – komunikowanie się ze sobą zbyt wielu osób naraz jest niemożliwe. Tworzymy abstrakcje, w postaci grup / zespołów które działają jako jedność.
 *   [Spójność grupy](https://pl.wikipedia.org/wiki/Sp%C3%B3jno%C5%9B%C4%87_grupy) i [syndrom grupowego myślenia](https://pl.wikipedia.org/wiki/Syndrom_grupowego_my%C5%9Blenia) – mechanizmy psychologiczne sprawiające, że grupy podejmują wspólne decyzje, czasami irracjonalne.
 *   [Trybalizm](https://en.wikipedia.org/wiki/Tribalism) – poczucie bliskości z grupą, którą się identyfikujemy. Ten wrodzony atawizm powoduje, że łatwiej akceptujemy rozwiązania bliskie naszemu otoczeniu i rywalizujemy z grupami przeciwnymi.
 *   [Teoria poznawczego obciążenia](https://en.wikipedia.org/wiki/Cognitive_load) – zgodnie z tą teorią porcja informacji, na której możemy naraz operować jest skończona. Pracując w grupie będziesz skupiał się na wiedzy wewnątrz niej i filtrował wiedzę spoza niej.
 *   Błędy poznawcze takie jak [nie wymyślono tutaj](https://en.wikipedia.org/wiki/Not_invented_here), [efekt IKEA](https://en.wikipedia.org/wiki/IKEA_effect), [stereotypowanie](https://pl.wikipedia.org/wiki/Stereotyp), [skrzywienie zawodowe](https://pl.wikipedia.org/wiki/Skrzywienie_zawodowe), [kolektywny narcyzm](https://en.wikipedia.org/wiki/Collective_narcissism)

Mechanizmy psychologiczne powodują, że łatwiej myśli nam się w kategoriach otoczenia, w którym pracujemy na co dzień. Nie wychodzimy i nie chcemy wychodzić na zewnątrz ram, w które jesteśmy wtłoczeni. Współpraca pomiędzy grupami / zespołami / działami wymaga od nas więcej wysiłku i zaangażowania.

To wszystko powoduje, że tworzenie i wdrażanie rozwiązań pomiędzy grupami jest o wiele trudniejsze niż by się mogło na samym początku wydawać.

## Jak uciec przed prawem Conway’a?

Nie można 😉, ale warto brać je pod uwagę przygotowując strukturę naszej firmy. Tak by działać razem z nim, a nie przeciwko niemu. To działanie jest nazywane również [odwrotnym manewrem Conway’a](https://www.thoughtworks.com/radar/techniques/inverse-conway-maneuver).

Manewr mówi, by przygotowywać tak strukturę organizacji, by odpowiadała potrzebom jakie ma spełniać. Czyli nie wymagać by różne grupy działały ze sobą – to się prawie na pewno nie uda, przez problemy opisane powyżej. Raczej powinniśmy tak wydzielić nasze grupy, by praca mogła przebiegać głównie wewnątrz nich.

Bardzo ciekawy przykład takiego manewru opisał Simon Wardley w swoim [cyklu tweetów](https://twitter.com/swardley/status/1087511545091899392?lang=en).

[![](/images/2019/02/5.jpg)](/images/2019/02/5.jpg)

Organizacja silosowa (departamentowa) miała problemy z dostosowywaniem się do zmian – część osób z silosu chciała wdrażać zmiany a część była bardziej oporna. Postanowiono więc podzielić organizację ze względu na poziom stabilności pracy. To pozwoliło grupom pracować w zespołach cross-funkcjonalnych, skupionych na swoich celach, realizujących je w taki sposób jaki był im najbardziej odpowiadający.

W organizacjach informatycznych taki podział może być realizowany np. przez wydzielenie [Center of Excellence](https://www.cio.com/article/3020409/business-process-management/7-it-centers-of-excellence-that-drive-organizational-productivity.html). Będzie on realizować politykę skoncentrowaną na testowaniu nowych rozwiązań, często jeszcze nie nadającym się do produkcyjnego wdrożenia. Następnie rezultatami swojej pracy będzie się dzielił z działami, którym zależy na bardziej stabilnym dostarczaniu wartości swoim interesariuszom.

## Zmiana, zmiana, zmiana

Niestety nawet najlepiej działająca struktura nie uchroni się przed zmianami jakie przynosi czas. Może zmienić się otoczenie biznesowe, sytuacja na rynku, pojawi się bądź ubędzie kolejny konkurent. Poza tym zmiana może pojawić się także wewnątrz – firma może zająć się inną niszą czy dodatkowymi praktykami lub po prostu powiększyć się poza swoje obecne możliwości. Każda taka sytuacja może sprawić, że struktura firmy z pożądanej i właściwej stanie się kontrproduktywna.

[![](/images/2019/02/6.jpg)](/images/2019/02/6.jpg)

GCHQ w swoim dokumencie [GCHQ: Boiling Frogs](https://github.com/gchq/BoilingFrogs/blob/master/GCHQ_Boiling_Frogs.pdf) opisują jak w dzisiejszych czasach ważne jest umiejętne dostosowywanie się do zmiennych realiów biznesowych. Należy odchodzić od zmian typu „Big Bang”**,** bo trwają one zbyt długo i nie dostarczają pokładanych w nich wartości. Trzeba szybko testować nowe pomysły, popełniać błędy i uczyć się na ich podstawie.

Zmiany zaczęły zachodzić tak szybko, że organizacje niepotrafiące się ewolucyjnie adaptować będą zbyt długo trwały w swojej niszy. A ta szybko wyparuje.

## Spotify Fallacy – czyli dlaczego nie kopiować struktury

Częstym problemem w budowie organizacji jest skopiowanie od innych istniejącej u nich struktury bez zastanowienia się jakie funkcje ona spełnia może ona powodować. A przede wszystkim z jakiej potrzeby biznesowej ona wychodzi i w jakiej kulturze działa.

[![](/images/2019/02/7.jpg)](/images/2019/02/7.jpg)

Wiele firm zaczęło kopiować sposób [organizacji pracy Spotify](https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf), nie patrząc w jakich realiach firmowych on działa. A jest bardzo wiele czynników, które sprawiają, że jest on możliwy do wdrożenia: [kultura społeczna Skandynawii](https://zenexmachina.wordpress.com/2017/07/25/why-spotifys-agile-patterns-work-and-why-you-shouldnt-copy-them/), [kultura pracy zwinnej](http://blog.kevingoldsmith.com/2014/03/14/thoughts-on-emulating-spotifys-matrix-organization-in-other-companies/), [otoczenie biznesowe](https://medium.com/the-ready/how-to-build-your-own-spotify-model-dce98025d32f). Sama zmiana trwała u nich 3 lata. A często kopiowanie struktury jest wdrażane w sposób automatyczny – wczoraj było po staremu, dziś już jest inaczej. To nie zadziała.

Praca w modelu macierzowym wymaga również klarownego i zdefiniowanego sposobu działania. W chwili, gdy jeden z wymiarów zaczyna przeważać nad drugim może dojść do kanibalizacji słabszego działu kosztem silniejszego.

## Zasady dobrej struktury

Poniżej przedstawiłem krótki spis elementów, które warto brać pod uwagę próbując tworzyć dobrą strukturę:

 *   Zakładany cel biznesowy
 *   Autonomia
 *   Ilość grup kontaktu / zależności
 *   Rodzaje grup społecznych / kulturowych
 *   Ogólna kultura organizacyjna
 *   Możliwe wąskie gardła
 *   Szansa na zmianę

Oczywiście nie jest to zbiór kompletny, raczej krótkie prześlizgnięcie się po temacie. Bardzo dużo o różnych heurystykach tworzenia struktury zespołów i ich organizacji wewnętrznej pisze na swoim [blogu](https://medium.com/nick-tune-tech-strategy-blog) Nick Tune. Celowo używa on słowa „heurestyka” – tutaj nie ma dobrych i złych wyborów. Wszystkie zasady są raczej wskazówkami, która mogą, ale nie muszą, przybliżyć nas do bardziej efektywnej struktury.

## Podsumowanie

Budowa i zarządzanie strukturą firmy jest zadaniem bardzo trudnym. Często spotyka się z oporem i każda zmiana dotkliwie wpływa na działanie firmy. Jednak należy pamiętać, że nie będziemy w stanie rozwiązać wszystkich problemów. Nie istnieje coś takiego jak struktura idealna. Wszystko się zmienia w czasie i trzeba aktualizować swoje rozwiązanie do problemów z jakimi się obecnie zmagamy.

To taki pobieżny opis danego tematu, który jest o wiele bardziej głęboki. Ale mam nadzieję, że przekonałem was by samemu zainteresować się tym obszarem wiedzy 😊