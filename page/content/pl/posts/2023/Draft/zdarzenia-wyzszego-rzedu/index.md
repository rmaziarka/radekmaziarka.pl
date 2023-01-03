---
title: "Zdarzenia wyzszego rzedu"
date: 2022-01-27T09:59:30+01:00
draft: true
---


Miałem teraz warsztat z jedną firmą, z obszaru zarządzania inwestycjami budowlanymi. Chcą tam zrobić system do ogarniania od A-Z obszar budowy – rozpoczynanie inwestycji / przetarg / przygotowanie do budowy / budowę / odbiory. Można założyć, że ta rozpiska wcześniej pokrywa się z modułami jakie byłyby w systemie.

Co tam jest ciekawe biznesowo:
•	W ramach danego modułu każda firma ma inny zestaw dokumentów, o różnym procesie zatwierdzania ich. To powoduje, że musimy napierw stworzyć „fabrykę dokumentów”, gdzie definiujemy proces i rodzaj dokumentu. Następnie na tej podstawie ludzie uruchamiają fabrykę tworząc konkretne dokumenty. Np. jedna firma dla obszaru przetargu będzie miała 2 rodzaje dokumentów, a druga 5 rodzajów.
•	Ale, ale. W ramach danego modułu konkretny rodzaj dokumentu jest dokumentem kończącym pracę w module. W zależności od firmy ten rodzaj dokumentu będzie różny, ale każda musi taki mieć. Wtedy taki rodzaj dokumentów ma wpływ na pracę kolejnych modułów – np. zamyka przetarg i otwiera przygotowanie do budowy.

Z perspektywy zdarzeniowej widzę tutaj ciekawy case:
•	Niskopoziomowo musimy mieć dość ogólne zdarzenia w stylu StworzonoDokument / ZmienionoStatusDokumentu / ZakończonoDokument.
•	Następnie jakiś byt wyżej będzie miał już bardziej wysokopoziomowe zdarzenia – na podstawie ustawień fabryki mapowałby on zdarzenie ZakończonoDokument z rodzaju ProtokółFinalnyPrzetargu na zdarzenie wysokopoziomowe ZakończonoPrzetarg. Wtedy takie zdarzenie ma już konkretną realizację w systemie i dalszy wpływ na system.

Widzę tutaj nawiązanie do Evansa 16 rozdziału i jego poziomów domeny biznesowej.

Daj znać jak to widzisz – czy to się wydaje sensowne i ciekawe 😉
