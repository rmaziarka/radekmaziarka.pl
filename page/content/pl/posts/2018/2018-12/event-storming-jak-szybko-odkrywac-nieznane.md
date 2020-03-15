---
title: 'Event Storming - jak szybko odkrywać nieznane?'
slug: '/2018/12/06/event-storming-jak-szybko-odkrywac-nieznane/'
date: Thu, 06 Dec 2018 07:06:04 +0000
draft: false
featured_image: 'images/2018/05/eventstorming.logo_.png'
category: 'Event Storming'
tags: ['domain driven design', 'event storming']
---

[Event Storming](https://www.eventstorming.com/) to dość młoda, ale ciesząca się coraz większą popularnością metoda do zespołowego odkrywania i  modelowania procesów wewnątrz skomplikowanych domen biznesowych. Pokazuje ona jak za pomocą zdarzeń opisywać działanie naszego systemu.

Technika została opisana [pierwszy raz](https://ziobrando.blogspot.com/2013/11/introducing-event-storming.html) w 2013 roku przez Alberta Brandoliniego, bardzo szybko zdobyła serca osób związanych z Domain Driven Design. W najnowszym [Technology Radarze](https://www.thoughtworks.com/radar/techniques/event-storming) ThoughtWorks Event Storming został wskazany jako polecana metoda do modelowania domeny biznesowej w systemach informatycznych.

Warsztat ten jest skierowany i opisywany głównie na podstawie systemów informatycznych, i takie też przypadki będziemy opisywać w tym poście. Można ją również wykorzystywać do ogólnej strukturyzacji wiedzy o procesach w organizacji lub firmie – post na ten temat już wkrótce.

Przeprowadzenie warsztatów nie wymaga specjalistycznej znajomości opasłych ksiąg i dziesiątek video – wszystko zaczyna się od pomarańczowej karteczki.

Zdarzenie domenowe – serce warsztatu
====================================

Event Storming opiera się na zdarzeniach domenowych – faktach opisujących pracę naszego systemu. Każde zdarzenie zapisujemy na karteczce i umieszczamy na ścianie. Poniżej moje (lekko niestarannie napisane) zdarzenie- dodanie produktu do koszyka.

[![](/images/2018/12/1.jpg)](/images/2018/12/1.jpg)

Każda karteczka to istotna informacja o wydarzeniu jakie zaistniało w systemie. Wszyscy uczestnicy systemu (prawie), niezależnie od siebie, umieszczają swoje karteczki na wcześniej przygotowanej ścianie. W zależności od ilości zdarzeń ściana po tej fazie pracy może wyglądać np. tak:[![](/images/2018/12/6.jpg)](/images/2018/12/6.jpg)

Nawet jeśli na pierwszy rzut oka wydaje wam się to przytłaczające, uwierzcie mi - rezultat jest fenomenalny – w kilka chwil nasi koledzy i inni pracownicy są w stanie zrzucić prawie całą / dużą część wiedzy o swoim systemie na wspólną przestrzeń.

Dalej zaczyna się strukturyzacja powyższego rezultatu.

Strukturyzacja
==============

Po umieszczeniu wszystkich zdarzeń na ścianie zaczyna się porządkowanie i układanie powyższych karteczek, w taki sposób, by nasze zdarzenia połączyć we wspólne procesy biznesowe / przypadki użycia. Każdy taki proces możemy analizować osobno, przechodząc go chronologicznie od początku do końca, jak i odwrotnie, by zyskiwać coraz większą wiedzę jak nasz proces zachodzi.

[![](/images/2018/12/5.jpg)](/images/2018/12/5.jpg)

Aby bardziej uwidocznić prawidłowości zachodzące w analizowanym procesie przychodzą nam z pomocą karteczki w innych kolorach, których zadaniem jest zwizualizowanie dodatkowych informacji o systemie:

 *   Jasno-żółte – notatki, opisujące jakiś szerszy temat
 *   Różowe – problemy / niejasności / ryzyka
 *   Liliowy – zewnętrzne systemy
 *   Małe żółte – aktorzy / osoby / działy
 *   Zielone – szanse na rozwój / poprawę
 *   Niebieskie – komendy
 *   Inne

Nowe kolory wprowadzamy je do warsztatu stopniowo, kiedy potrzebujemy uzyskać daną informację od naszych kolegów.

Cele warsztatu
==============

Rezultatem dobrze przeprowadzonego warsztatu jest pełny widok naszego systemu, zarysowane procesy biznesowe i sposób ich interakcji z użytkownikami i zewnętrznymi systemami. Taka wiedza pozwala nam na:

 *   głębsze zrozumienie systemu nad którym pracujemy, ustalenie wspólnego postrzegania pomiędzy wieloma pracownikami / stakeholderami
 *   wizualizację sposobu pracy systemu, która pozwala np. podzielić go na mniejsze części / mikroserwisy
 *   odpowiednio szybką wymianę wiedzy, aby np. wdrożyć nowych programistów do pracy nad systemem
 *   analizę aktualnych problemów systemu wraz z pomysłami jak je naprawić
 *   stworzenie planu na dodanie nowej funkcjonalności do obecnego systemu
 *   predykcję możliwości rozwoju naszego systemu i osiągania większych zysków

Przykładowy rezultat warsztatu
==============================

Jeden wielu z takich warsztatów przeprowadziliśmy dla naszego klienta. Zadaniem było zrozumieć jak działa duży, monolityczy system i zaplanować podzielenie go na mniejsze części. Poniżej rezultat naszego warsztatu (zdjęcie z 1/2 całości):

[![](/images/2018/12/4.jpg)](/images/2018/12/4.jpg)

Warsztat trwał kilka godzin, a po skończeniu pracy byliśmy w stanie zrozumieć:

 *   Jakie części systemu są trywialne i nie musimy się nimi przejmować
 *   Jakie części systemy powinny zostać od siebie odseparowane do osobnych modułów / mikroserwisów
 *   Gdzie powinny leżeć granice takich modułów
 *   W jaki sposób powinny się te moduły komunikować
 *   Jak gromadzić dane pomiędzy modułami, by nie mieć zbyt częstej komunikacji
 *   Jakie mamy realne i potencjalne problemy z obecnym systemem, które musimy rozwiązać
 *   Które systemy zewnętrzne sprawiają problemy

Wszyscy uczestnicy warsztatów byli bardzo zadowoleni z rezultatów, ale jednocześnie zdumieni, że to wszystko udało się osiągnąć w ciągu jednego dnia.

Po takim zastrzyku wiedzy mogliśmy podzielić się dalszą pracą i zacząć implementować lepsze rozwiązanie dla naszego klienta.

Ogólne spojrzenie na Event Storming
===================================

Jak widać z przykładu, warsztaty Event Storming pozwalają w prostszy sposób zwizualizować sposób działania naszego systemu poprzez równoczesną i wspólną wymianę wiedzy między współpracownikami. Każda z osób jest zaangażowana, by dzieli się wiedzą o swoim obszarze prac, przekazując jak najwięcej informacji.

Ważne jest, że Event Storming ma bardzo niski próg wejścia, dzięki czemu każdy jest w stanie błyskawicznie rozpocząć w nim czynny udział. Wszystko opiera się na „zdarzeniach biznesowych”. Po krótkim wytłumaczeniu czym jest zdarzenie biznesowe jesteśmy gotowi, by działać.

Dodatkowym aspektem jest tutaj czas. Przez zrównoleglenie prac i podział grupy jesteśmy w stanie pracować efektywniej, dzięki czemu warsztaty są krótsze i dające wymierny efekt.

Jak przeprowadzić taki warsztat
===============================

Istnieje wiele materiałów opisujących warsztat Event Stormingu, zarówno w języku angielskim ([artykuł](https://buildplease.com/pages/fpc-2/) / [video](https://www.youtube.com/watch?v=04tGbixfGEY)) jak i polskim ([artykuł](https://rmakara.github.io/Event-Storming-Warsztaty-Agile-Wroclaw) / [video](https://www.youtube.com/watch?v=dhoXYRqghws)), nie wspominając już o tej najważniejszej [książce](https://leanpub.com/introducing_eventstorming). Bardzo ciekawy zbiór zawarł Mariusz Gil na GitHubie w repo [Awesome EventStorming](https://github.com/mariuszgil/awesome-eventstorming).

Także, do dzieła! Gdyby Cię interesował temat to polecam moje **[warsztaty z Event Stormingu](/szkolenia/event-storming)** lub pozostałe posty z tego tematu:

 *   [Event Storming – Narzędzie usprawniające pracę organizacji](/2018/12/10/event-storming-narzedzie-usprawniajace-prace-organizacji/)
 *   [Event Storming – Mapowanie ograniczeń](/2019/02/22/event-storming-mapowanie-ograniczen/)
 *   [Event Storming – Co dalej?](/2019/01/26/event-storming-co-dalej/)

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Event-Storming-jak-szybko-odkrywac-nieznane-Radek-Maziarka "") - <time datetime="2018-12-06 08:09:12">Dec 4, 2018</time>

**Event Storming – jak szybko odkrywać nieznane? | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
