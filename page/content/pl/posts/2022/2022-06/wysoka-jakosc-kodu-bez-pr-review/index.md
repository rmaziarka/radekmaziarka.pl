---
title: "Wysoka jakość kodu bez Pull Request Review"
date: 2022-01-27T09:59:30+01:00
draft: true
---

Pull Request Review  wydaje się być bardzo głęboko zakorzeniony w procesie wytwarzania oprogramowania. Większość artykułów o pracy zespołów programistycznych zawiera taki PR Review. Również jest on obecny w domyślnych szablonach pracy w narzędziach CI/CD.

Ja osobiście stoję po stronie barykady, która twierdzi, że w przeważającej liczbie przypadków **PR Review jest zabójcze dla szybkości dostarczania**. I chciałbym w tym artykule dostarczyć remedium na te problemy.

Jednak aby właściwie zaadresować problemy, najpierw warto przedstawić po co robimy PR Code Review. 

##  Powody posiadania PR  Review

Wykorzystałem kilka artykułów z internetu i zebrałem poniższą listę powodów posiadania PR Review (dorzućcie w komentarzach, jeśli jeszcze macie jakiś przykład):

- Sprawdzanie spełnienia wymagań biznesowych
- Zapewnienie spójnego kodu z resztą systemu, pod względem architektury
- Odnajdywanie błędów, zarówno biznesowych jak i technicznych, optymalizacyjnych i innych
- Spełnienie wymogów Compliance, jak np. [PCI DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard)
- Wymiana wiedzy w zespole lub organizacji
- XYZ


## Dlaczego nie robić PR Review?

Otóż PR Code Review jest zabójcze dla prędkości dostarczania. 

Aby to pokazać może pomóc przykład z innej branży - instalowania hydrauliki w budynku:
- Ugadujemy się bardzo ogólnie na to jakie rury gdzie chcemy mieć.
- Ktoś pracuje solo przez tydzień. Następnie pokazuje kolegom jakie rury zamontował.
- Brygadzista mówi że część rur trzeba wymienić z stalowych na miedziane. Jednak ich akurat nie ma na stanie. Czekamy tydzień na ich odbiór.
- Rury przyszły więc wymieniamy przez dzień. Następnie zgłaszamy naszą instalację ponownie do odbioru.
- Któryś majster mówi, że w tym miejscu rury powinny iść w przeciwnym kierunku. Niezgadza się z tym inny majster. Dyskusja trwa przez tydzień. W końcu dochodzą do wniosku, że jednak trzeba to zmienić.
- Jednak malarze już zaczęli gładzić i malować ściany. Musimy zedrzeć cześć farby, wymienić rury, a potem powiedzieć malarzom że znów muszą to wymalować.
- Kończymy 3 tygodnie po terminie, mając równocześnie rozgrzebanych 5 równoległych instalacji. 
 
**To brzmi absurdalnie. Jednak tak absurdalna praca dzieje się codziennie w wielu firmach produktowych i software house'ach.** Zmieńmy brygadzistę na team leadera, instalowanie hydrauliki na pisanie kodu, wymianę rur na redesign, malowanie ścian na kolejną aktywność w procesie developerskim. Gotowe.

W mojej ocenie PR Review:

- Jest przeprowadzane zbyt późno - koszt wprowadzania zmian na tym etapie jest ogromny. Bardzo często musimy zmienić całą architekturę rozwiązania.
- Jest przeprowadzane dla zbyt dużych kawałków kodu - całą funkcjonalność jest bardzo trudno sprawdzić, koszt poznawczy jest wysoki.
- Tworzy znaczne kolejki w zespole - jak opisałem w artykule XYZ.
- Tworzy opóźnienie w pętli zwrotnej uczenia się zespołu - przeskakujemy z tematu na temat.

Ale przede wszystkim **PR Review nie daje odpowiednich zysków w stosunku do kosztów jakie ponosimy**. Problem, że mało kto to liczy 🙄

Analogiczne zdanie na ten temat ma wiele osób z obszaru Continuous Delivery, jak Jez Humble (twórca książki [Accelerate](https://www.goodreads.com/en/book/show/35747076)) czy Thierry de Pauw:

{{< tweet user="jezhumble" id="1456100358762074120" >}}

{{< tweet user="tdpauw" id="1509031345904832516" >}}

## Co w zamian

Ok Radku, zrobiłeś taki pełny argumentów wywód przeciwko PR Code Review. Co masz do zaproponowania w zamian? 

Na dole przedstawiłem kilka propozycji, z różnych obszarów pracy zespołowej. Mają one na celu:

- Zwiększenie prędkości dostarczania dla całego procesu pracy zespołu.
- Zmniejszenie ilości reworku.
- Szybszą pętlę zwrotną dotyczącą błędów i ich poprawy.
- Łatwiejsze wprowadzanie nowych osób do zespołu, czy do nowych funkcjonalności.
- XYZ

Przy jednoczesnym zachowaniu wszystkich powodów posiadania PR Review opisanych wyżej.

(Celowo pomijam poniżej [Trunk Based Development](https://trunkbaseddevelopment.com/) - dla firm zmagających się z problemami wolnego PR Review podejście TBD będzie jednocześnie uznane za nieaplikowalne i wyśmiane przez zespół)

###  Pair Programming / Mob Programming

{{< tweet user="vincentdnl" id="1252628160111394817" >}}

Praca w parach / grupie jest dobrą przeciwwagą na PR Review. A to dlatego, że wykonujemy sprawdzenie kodu natychmiastowo jak pisze go druga osoba. Chyba nie da się szybciej 😂

Taką pracę w parach (a więc i sprawdzanie kodu) można robić również zdalnie. Dziś nawet posiadamy narzędzia, ze można pisać naraz w jednym IDE (jak [VS Code Live Share](https://code.visualstudio.com/learn/collaboration/live-share)).
 
Co jest nie zawsze oczywiste, code review wykonywany podczas pair programmingu spełnia wymogi instytucji finansowych czy PCI:

{{< tweet user="wouterla" id="1163455000338739200" >}}

{{< tweet user="seanjreilly" id="1163455556209795073" >}}

Są nawet firmy (jak np. [vmware](https://tanzu.vmware.com/developer/learningpaths/application-development/pair-programming/)), które z definicji pracują w ten sposób. Jednak jest oczywiste że nie wszystkie firmy mogą pracować w ten sposób. Również trudne może być przez 100% czasu pracować w ten sposób. Możemy więc omówić inne sposoby.

### Ad-hoc code review

Nikt nam nie broni robić sprawdzenia naszego kodu częściej, niż tylko na PR Review.

W jednej z firm, w której pracowałem, była praktyka robienia code review co każdy commit. Braliśmy osobę obok / zdzwanialo się osobę wolną. Wtedy dało się bardzo szybko zauważyć, że coś jest nie po naszej myśli.

Może to być prowadzone również asynchronicznie. Zgłaszamy informacje o nowym commit do sprawdzenia na komunikatorze. Ktoś kto ma akurat wolna chwilę wskakuje i sprawdza nasz kod.

XYZ

### Cadence-based code review

Jeśli zwykle pracujemy nad większymi funkcjonalnościami (co też jest w pewien sposób antypatternem) to możemy ustalić konkretny termin na to by sobie robić review. Dzięki temu będziemy mieli możliwość by sprawdzać nasz kod odpowiednio często.

Ciekawy przykład takiego spotkania podał Maciej Jędrzejewski:

{{< tweet user="mjjedmac" id="1523807732054507520" >}}

XYZ

###  Lekkie metody projektowania

XYZ

- Umożliwiają one głębsze zaplanowanie pracy systemu oraz ustalenie w jaki sposób obsłużymy sytuacje brzegowe
- Z racji że robimy to wspólnie to każdy ma zrozumienie jak dany kawałek powinien działać
- Np Event Modeling pracuje na slice'ach, które mają silnie określone punkty wejścia i wyjścia
- Nie musimy tego robić synchronicznie - opisałem w artykule jak przeprowadzać Event Storming asynchronicznie
- Wtedy mamy mniejsza szansę że napiszemy kod który znacznie łamie nasze wymagania architektoniczne.
- Nasze code review podczas pracy są o wiele szybsze i mniej jest tam konfliktów.

Ogólne zalety
- Niewątpliwą zaletą jest szybsze korygowanie kursu developmentu. Możemy na wczesnym etapie zauważyć że coś jest nie tak i
- Duża większą wymiana wiedzy -
- Wciąganie więcej ról w development
- Wbudowanie wysokiej jakości na wczesnym etapie

## Na koniec

Na koniec zapytam Ciebie - czy wiesz jak długo trwa u Ciebie zakończenie PR Review?

Wiele zespołów tego nie wie. A skoro nie wie, to nie może z tym nic zrobić. Praca idzie wolno, czas ucieka. 

XYZ