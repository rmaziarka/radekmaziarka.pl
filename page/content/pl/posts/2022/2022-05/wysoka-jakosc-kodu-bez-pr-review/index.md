---
title: "Wysoka jakość kodu bez PR Review"
date: 2022-01-27T09:59:30+01:00
draft: true
---

Pull Request Review  wydaje się być bardzo głęboko zakorzeniony w procesie wytwarzania oprogramowania. Większość artykułów o pracy zespołów programistycznych zawiera taki PR Review. Również jest on obecny w domyślnych szablonach pracy w narzędziach CI/CD.

Ja osobiście stoję po stronie barykady, która twierdzi, że **PR Review jest zabójcze dla szybkości dostarczania**. I chciałbym w tym artykule dostarczyć remedium na te problemy.

Jednak aby właściwie zaadresować problemy, najpierw warto przedstawić po co robimy PR Code Review. 

##  Powody posiadania PR  Review

Wykorzystałem kilka artykułów z internetu i zebrałem poniższą listę powodów posiadania PR Review (dorzućcie w komentarzach, jeśli jeszcze macie jakiś przykład):

- Sprawdzanie spełnienia wymagań biznesowych
- Zapewnienie spójnego kodu z resztą systemu, pod względem architektury,
- Spełnienie wymogów Compliance jaki [PCI DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard)
- XYZ

Problem w tym, że w większości artykułów autorzy mylą cel z rozwiązaniem. 

// wizualizacja



## Dlaczego robić inaczej?

Otóż PR Code Review jest zabójcze dla prędkości dostarczania. 

Aby to pokazać może pomóc przykład z innej branży - instalowania hydrauliki w budynku:
- Ugadujemy się bazowo na to jakie rury gdzie chcemy mieć
- Ktoś pracuje solo przez tydzień. Następnie pokazuje kolegom jakie rury zamontował
- Brygadzista mówi że część rur trzeba wymienić z stalowych na miedziane. Jednak ich akurat nie ma na stanie. Czekamy tydzień na ich odbiór.
- Rury przyszły więc wymieniamy przez dzień. Następnie zgadzamy nasza instalacje do odbioru.
- Któryś majster mówi, że w tym miejscu rury powinny iść w przeciwnym kierunku. Niezgadza się z tym inny majster. Dyskusja trwa przez tydzień. W końcu dochodzą do wniosku, że jednak jest trzeba to zmienić.
- Jednak malarze już zaczęli gładzić i malować ściany. Musimy zedrzeć cześć farby, wymienić rury, a potem powiedzieć malarzom że znów muszą to wymalować.
- Kończymy 3 tygodnie po terminie, mając równocześnie rozgrzebanych 5 równoległych instalacji. 
 
To brzmi absurdalnie. Jednak dzieje się codziennie w wielu firmach produktowych i software house'ach. Zmienny brygadzistę na team leadera, instalowanie hydrauliki na pisanie kodu, wymianę rur na redesign, malowanie ścian na kolejną aktywność w procesie developerskim. Gotowe.

W mojej ocenie PR Review jest:

- Przeprowadzane zbyt późno - koszt naprawy jest ogromny.
- Przeprowadzane dla zbyt dużych kawałków kodu - całą funkcjonalność jest bardzo trudno sprawdzić, koszt poznawczy jest wysoki.

Analogiczne zdanie na ten temat ma wiele osób z obszaru Continuous Delivery, jak Jez Humble (twórca książki [Accelerate](https://www.goodreads.com/en/book/show/35747076)) Thierry de Pauw 

https://twitter.com/jezhumble/status/1456100358762074120

https://twitter.com/tdpauw/status/1509031345904832516

- Więcej opisałem na ten temat w poście XYZ, więc nie będę tutaj się powtarzać.
  W tym artykule chciałbym zawrzeć kilka praktyk które w mojej ocenie mogą zapewnić jakość


- Cały poniższy wywód zakłada, że pracujesz w branchach których czas do merge jest dłuższy niż dzień. Jeśli pracujesz już w Trunk Based Development to cześć porad może nie byc aplikowalna.

###  Pair Programming / Mob Programming
- Praca razem jest dobrą przeciwwagą na pracę asynchroniczną samemu
- Siadamy obok drugiej osoby bądź zdzwaniamy się z nią
- Tam gdzie pracuje ziomek z Bottegi wszyscy muszą pracować w parach
- https://tanzu.vmware.com/developer/learningpaths/application-development/pair-programming/
- Jednak jest oczywiste że nie wszystkie firmy mogą pracować w ten sposób. Również trudne może być przez 100% czasu pracować w ten sposób. Możemy więc omówić inne sposoby.

Co więcej, code review wykonywany podczas pair programmingu spełnia wymogi instytucji finansowych czy PCI:
- https://twitter.com/wouterla/status/1163455000338739200

### Ad-hoc code review
- W Objectivity robiliśmy code review co każdy commit. Braliśmy osobę obok / zdzwanialo się osobę wolną. Wtedy dało się bardzo szybko zauważyć , że coś jest nie po naszej myśli.
- Może to być prowadzone również asynchronicznie. Zgłaszamy informacje o nowym commit do sprawdzenia na komunikatorze. Ktoś kto ma akurat wolna chwilę wskakuje i sprawdza nasz kod.

### Daily code review
- Jeśli pracujemy nad większymi funkcjami (co też jest w pewien sposób antypatternem) to możemy ustalić konkretny termin na to by sobie robić review.

Ciekawy przykład tutaj podał Maciej Jędrzejewski
https://twitter.com/mjjedmac/status/1523807732054507520

###  Limit dla otwartych zadań developerskich
- Ta porada nie dotyczy stricte pracy developerów . Jest to bardziej metoda aby zbudować system bodźców który zachęci do szybkiego kończenia zadań
- Ustalamy odgórny limit na liczbę zadań w ramach której będzie pracować zespół. Jeśli osiągamy limit otwartych zadan to nie bierzemy kolejnego
- Zamiast tego skupiamy się aby zakończyć istniejące zadania. Wchodzimy do zadania kolegi aby je szybciej zakończyć . Sami implementujemy zmiany z Code Review itd.
- To zachęca do współpracy międzyzespołowej - pracy wspólnej nad jedną funkcją, zamiast indywidualnej pracy nad wieloma.
###  Kolaboracyjnyc planowanie
Light weight design

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
- Ograniczanie zadań w toku - 
