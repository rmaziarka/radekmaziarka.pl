---
title: 'Event Storming  - dlaczego działa tak dobrze?'
url: '/2019/05/11/event-storming-dlaczego-dziala-tak-dobrze/'
date: Sat, 11 May 2019 18:45:03 +0000
draft: false
featured_image: 'images/2018/05/eventstorming.logo_.png'
category: 'Event Storming'
tags: ['ddd', 'event storming']
---

Event Storming zdobywa coraz większą popularność w świecie informatycznym i poza nim. Opisywane są przypadki coraz to nowych pomysłów na wykorzystanie tych warsztatów: jako spis procesów firmy, retrospektywa projektu czy organizacja ślubu i wesela.

Powstaje więc pytanie – skąd taka popularność tego warsztatu? Co powoduje, że po zetknięciu się z tym warsztatem zaczynamy widzieć wartość z jego wykorzystywania w różnych dziedzinach swojej pracy lub życia? Dlatego ten warsztat jest taki efektywny?

# 1\. Czas przeszły

Gdy zastanawiamy się and jakimkolwiek procesem czy aktywnością mamy zwykle w głowie konkretne czynności, które muszą mieć miejsce. Jednak proste spisanie ich powoduje, że nie dostrzegamy czy przypadkiem nie mówimy tylko o „happy path”, nie wiemy jaka jest kolejność czynności, czy nie nakładają się one na siebie, czy są one wykywane równolegle czy nie. Powoduje to zamieszanie i ostatecznie mało zrozumiały proces. A ten przekształca się ostatecznie w mało zrozumiały i nieefektywny kawałek systemu.

[![](/images/2018/12/1.jpg)](/images/2018/12/1.jpg)

Użycie czasu przeszłego i skupienie się na zdarzeniach pozwala nam stworzyć klarowny przebieg danego procesu czy historii. Nie ma wtedy miejsca na niejasności – coś wydarzyło się wcześniej albo później. Zamiast listy czynności, która może być ułożona dowolnie, mamy jasny plan wykonanych aktywności.

To sprawia, że łatwiej jest znaleźć luki czy niejasności w naszym procesie. Widzimy, że nie jesteśmy w stanie czegoś zakończyć odpowiednio szybko by rozpocząć nową aktywność. Zauważamy, że pewnych elementów nie da się zrównoleglić. Przy takim podejściu łatwiej jest zwrócić uwagę na negatywne ścieżki.

W czasie przeszłym po prostu łatwiej się myśli. Zauważ, że 95% książek i opowiadań jest pisana w czasie przeszłym. A przed pismem wszystkie historie były przekazywane w taki sposób. **W czasie przeszłym trudniej jest kłamać** czy mieszać, bo historia nie będzie nam się zgadzać. My ludzie jesteśmy predysponowani by lepiej pracować działając w oparciu o zdarzenia „X się wydarzyło”, „zrobiłem Y”.

# 2 . Wizualizacja​

Człowiek jest istotą kierującą się głównie zmysłem wzroku. Colin Ware w [swojej pracy](http://www.ifs.tuwien.ac.at/~silvia/wien/vu-infovis/articles/book_information-visualization-perception-for-design_Ware_Chapter1.pdf) na temat wizualizacji pisał, że około 20% neuronów w naszym mózgu jest odpowiedzialne tylko i jedynie za przetwarzanie obrazu. Psycholog Linda Silverman, w książce [The Visual Spatial Learner](https://www.goodreads.com/book/show/673356.Upside_Down_Brilliance) przytacza badania, że 2/3 osób ma preferencje wizualno-przestrzenne.

Mając to na uwadze przypomnij sobie te wszystkie spotkania, gdzie prowadzący przez długi czas tłumaczył jakiś proces po prostu rzucając słowa w eter. Albo pokazywany był olbrzymi dokument Word na małym telewizorze. Takie spotkania są nie tylko nieefektywne – **słuchanie procesu powoduje, że każdy ma w głowie jego inną realizację**. W teorii wszyscy myślimy o tym samym – w praktyce rozbijemy się o kolejność czy zrozumienie co znaczą pojedyncze elementy.

[![](/images/2019/05/IMG_9424.jpg)](/images/2019/05/IMG_9424.jpg)

Event Storming pozwala dobrze zwizualizować proces, z którym się zmagamy. Dzięki niemu można jednocześnie zobaczyć całe spektrum sytuacji by w kilku krokach skupić się na małym jego wycinku. Widzimy, gdzie proces się zaczyna, gdzie rozgałęzia, gdzie są problemy, które zidentyfikowaliśmy. **Mając pełny ogląd sytuacji łatwiej zauważysz, że coś nie gra w procesie** – twój mózg nie będzie w stanie połączyć ze sobą kolejnych kropek.

Dodatkowo, podobnie jak papier - ściana przyjmie wszystko – w każdej chwili możemy dodać dowolną formę wizualizacji, jaka jest nam akurat potrzebna. Niekiedy warto jest pokazać miejsca styku z systemami zewnętrznymi, oznaczyć zdarzenia, gdzie zyskujemy bądź tracimy pieniądze, czy dodać metryki jakie chcemy zbierać. Każda taka informacja może być dla nas ważna, kiedy będziemy dalej pracowali nad naszym procesem.

# 3\. Błędy poznawcze

Mówi się, że [błędy poznawcze](https://pl.wikipedia.org/wiki/B%C5%82%C4%85d_poznawczy) to jeden z czynników, które powodują, że projekty nie są dowożone na czas, a komunikacja pomiędzy ludźmi szwankuje. Takie błędy jak [niechęć do straty](https://pl.wikipedia.org/wiki/Niech%C4%99%C4%87_do_straty), [efekt potwierdzenia](https://pl.wikipedia.org/wiki/Efekt_potwierdzenia), [błąd atrybucji](https://pl.wikipedia.org/wiki/Podstawowy_b%C5%82%C4%85d_atrybucji) sprawiają, że szukamy zbyt prostych rozwiązań bądź reagujemy w sposób instynktowny zamiast racjonalny. Niestety błędów poznawczych nie da się wyeliminować – są wpisane w sposób, w jaki działa ludzki organizm. Można za to niwelować ich skutki.

Warsztat pozwala mylić i następnie szybko uczyć się na swojej pomyłce:

 *   Niechęć do straty - Zrzucenie błędnej kartki na ziemie nie kosztuje nas wiele, a ułatwia podejmowanie decyzji i zachęca do poprawy wizualizacji naszego procesu.
 *   Efekt potwierdzenia / [zaprzeczenia](https://pl.wikipedia.org/wiki/Efekt_zaprzeczania) – Przez odpowiednie zadawanie sobie pytań typu „Co może pójść nie tak?”, „Czy możliwy jest inny scenariusz?” łatwiej jest wyprowadzić uczestników z własnej nieomylności.
 *   [Iluzja grupowania](https://pl.wikipedia.org/wiki/Iluzja_grupowania) – Wizualizując proces łatwiej zauważymy, że nie jest on taki powtarzalny / regularny jak nam się wydawało.
 *   [Efekt skupienia](https://pl.wikipedia.org/wiki/Efekt_skupienia) – Warsztat pozwala pokazać pełne spektrum problemu, przez co można uniknąć skupienia się na detalach ważnych tylko dla jednej osoby / grupy osób.
 *   [Heurestyka zakotwiczenia](https://pl.wikipedia.org/wiki/Heurystyka_zakotwiczenia_i_dostosowania) – Mając koło siebie grono osób z różnych obszarów łatwiej jest uniknąć zaczepienia tylko na jednej, pierwszej informacji.
 *   [Złudzenie planowania](https://pl.wikipedia.org/wiki/Z%C5%82udzenie_planowania) – Warsztaty obrazują prawdziwą, a nie kreowaną złożoność procesu (systemy zewnętrzne, persony, scenariusze, wąskie gardła) co pozwala zdać sobie sprawę ze skalą problemu, z którym się zmagamy.

[![](/images/2019/05/IMG_9432.jpg)](/images/2019/05/IMG_9432.jpg)Bardzo dobrym podsumowaniem, dlaczego błędy poznawcze są kosztowne, jest powyższe zdjęcie – **każda z tych kartek to błędna decyzja, którą odrzuciliśmy jeszcze na etapie analizy biznesowej**. Gdyby została ona zaimplementowana to koszt jej poprawy byłby 1000-krotnie większy niż zrzucenie kartki na ziemię.

# 4\. Praca równoległa i wspólna

W korporacjach bardzo często spotkania są synonimem tracenia czasu. Nie bez przyczyny. Niekończące się dyskusje, wymóg uzyskania konsensusu czy dominacja pewnych osób powoduje, że osiągane rezultaty nie są satysfakcjonujące. Często wchodzimy na spotkanie z celem omówienia potrzebnych dla nas kwestii, a wychodzimy z poczuciem, że zostaliśmy pominięci.

[![](/images/2019/05/gamestorming2.jpg)](/images/2019/05/gamestorming2.jpg)

Divergent / Emergent / Convergent - [http://timkastelle.org/blog/2010/10/two-ways-to-select-ideas/](http://timkastelle.org/blog/2010/10/two-ways-to-select-ideas/)

Warsztaty pozwalają zaadresować ten problem poprzez podział pracy nad procesem na 3 fazy:

 *   Divergent - Rozpoczynamy od fazy podziału danego procesu na mniejsze. Każdy opisuje co jest dla niego ważne w i czym się powinniśmy zająć.
 *   Emergent – Adresujemy rezultat poprzedniej fazy, poprzez odpowiednią strukturyzację i pracę w grupach. Jednak nie nad każdym elementem musi przystawać cała grupa – możemy podzielić się na mniejsze części i odpowiednio nad nimi pracować.
 *   Convergent – Na końcu, krok po kroku, coraz bardziej zawężamy rezultaty warsztatu. Ostatecznie wybieramy te, które są dla nas najważniejsze i od których chcielibyśmy rozpocząć dalszą pracę.

Taka formuła warsztatu jest bardzo efektywna – pozwala skupić się na tym, co jest dla nas ważne, ale jednocześnie inne osoby mogą pracować zupełnie oddzielnie. **Praca przyśpiesza, bo możemy pracować równolegle.**

Wartym wspomnienia faktem jest używanie różowej karteczki na wskazanie problematycznych miejsc. Dzięki czemu możemy kontynuować pracę, nawet jeśli się do końca nie zgadzamy z aktualnym stanem procesu.

# 5\. Na stojąco i rękoma

Spotkania mają jeszcze jedną dużą wadę – bardzo łatwo jest wprowadzić stan, gdzie czas wydaje się jakby płynął 1000 razy wolniej a wszyscy usypiają na swoich krzesłach. Nawet jeśli ludzie są aktywni to dłuższa praca siedząca jest mało efektywna. Opowiada o tym Marek Stój w swojej prezentacji Sitting Considered Deadly. Siedząc nasz mózg działa wolniej, trudniej nam się jest zaangażować a nasza kreatywność spada. Dodatkowo, porozumiewanie się jest bardzo utrudnione – osoby z drugiego końca stołu są dla nas prawie niedostępne. W takiej atmosferze osiąganie wysokich rezultatów będzie bardzo trudne.

Event Storming bardzo jasno określa, że warsztaty powinny się odbywać bez udziału krzeseł. Powinny być one umieszczone na tyle daleko, by uczestnicy na nich podświadomie nie siadali. Taki stan rzeczy wymusza stanie i ciągłą kolaborację pomiędzy uczestnikami. Wszyscy są obok siebie, więc łatwiej jest podejść do drugiej osoby i z nią rozwiązać dany problem. Stojąc łatwiej zaangażować się w dyskusję niż siedząc, a każdy może podejść do danego fragmentu i odczytać co jest na nim zapisane. **Czynniki psychoruchowe są niesamowicie ważne, bo przyśpieszają osiąganie rezultatów**.

Sławek Sobótka, w odcinku podcastu [DevTalk](https://devstyle.pl/2019/03/08/devtalk-trio-s02e09-co-to-jest-event-storming/), zwraca uwagę również na jeszcze jeden fakt. Opowiada, że przyklejanie karteczek na ścianie powoduje operowanie rękoma w przestrzeni. Ma to rezultat w lepszym dokrwieniu naszego mózgu, co sprawia, że więcej zapamiętujemy i lepiej pracujemy („jesteśmy bardziej inteligentni”).

# Podsumowanie

To co przedstawiłem powyżej to kilka elementów, które w mojej ocenie sprawiają, że warsztat Event Stormingowy jest naprawdę efektywny. Ja sam nie wyobrażam sobie teraz siedzenie przez 8 godzin na spotkaniu i dyskutowaniu jak po kolei ma wyglądać proces implementowany w naszym systemie. Ogromna strata czasu i niskie rezultaty, zmęczeni nasi pracownicy i klienci.

Chyba Event Storming za bardzo zawrócił mi w głowie 😉 Niech Event Storming będzie z Nami!

PS. Gdyby Cię interesował temat to polecam moje [szkolenie z Event Stormingu](/szkolenia-event-storming/) lub pozostałe posty z tego tematu:

 *   [Event Storming - Jak szybko odkrywać nieznane](/2018/12/06/event-storming-jak-szybko-odkrywac-nieznane/)
 *   [Event Storming – Narzędzie usprawniające pracę organizacji](/2018/12/10/event-storming-narzedzie-usprawniajace-prace-organizacji/)
 *   [Event Storming – Mapowanie ograniczeń](/2019/02/22/event-storming-mapowanie-ograniczen/)
 *   [Event Storming – Co dalej?](/2019/01/26/event-storming-co-dalej/)

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Event-Storming-dlaczego-dziala-tak-dobrze-Radek-Maziarka "") - <time datetime="2019-05-12 10:56:51">May 0, 2019</time>

**Event Storming - dlaczego działa tak dobrze? | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
