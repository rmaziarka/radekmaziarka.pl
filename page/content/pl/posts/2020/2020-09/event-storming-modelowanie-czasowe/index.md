---
title: 'Event Storming - modelowanie czasu'
url: '/2020/09/23/event-storming-modelowanie-czasu'
date: Tue, 23 Aug 2020 14:56:35 +0000
draft: true
images: ['images/2018/05/eventstorming.logo_.png']
description: "Modelowanie czasu z Event Stormingiem jako świetne remedium na dziury w makietach"
category: 'Event Storming'
tags: ['consulting', 'Event Storming']
---
Przeprowadzając ostatnio [warsztaty zdalne](/szkolenia-i-warsztaty/event-storming) zauważyłem poraz kolejny, że makiety nie działają tak jak powinny. Proste scenariusze biznesowe są świetnie zwizualizowane, z kolejnymi ekranami do przeklikania. Przechodzisz przez taki system i masz wrażenie, że wszystko działa jak powinno.

Niestety makiety rzadko kiedy biorą pod uwagę czas i jego sposób oddziaływania na system:
- procesy mogą się dziać równolegle
- proces A może trwać tak długo, że wpłynie to na proces B
- proces A może trwać tak szybko, że proces B go nie zauważy
- proces A może wystąpić na różnych etapach procesu B inaczej na niego oddziaływując
 
Najczęściej tego rodzaju sytuacje **wyłapujemy dopiero na produkcji - gdy koszt ich obsługi jest olbrzymi** i powoduje poważne problemy dla naszych klientów.

Problemem nie są tutaj poszczególne makiety a właściwie same makiety jako sposób opisu systemu. Tego rodzaju scenariusze są prawie nie do zrealizowania w narzędziach graficznych. Wobec czego **pracując w oparciu o makietu nie zauważymy tych sytuacji**. XYZ - jeszcze jedno zdanie by nie było pusto

## Proces oparty na makietach
Załóżmy, że naszą domeną biznesową jest produkcja chipsów. Mamy następujące procesy:

- Dział produktów tworzy potrzebę produkcyjną np. 1000 paczek dziennie od 1 stycznia do 30 czerwca
- Te potrzeby tworzą nam dzienne partie do wyprodukowania
- Osobno zarządzamy maszynami produkcyjnymi - ich mocą produkcyjną, rodzajem pracy i wymaganymi przestankami
- Na podstawie partii do produkcji i maszyn tworzymy i akceptujemy plan produkcyjny

Dalej możemy mieć procesy planowania zakupów półproduktów i wysyłki.

Makiety dla tego procesu mogą wyglądać następująco:
- ankieta potrzeby produkcyjnej
- makieta maszyny
- makieta pracy maszyny w danym dniu

## Problemy makiet
Dość oczywisty problem, który nie wynika z makiet, jak zmiana potrzeby produkcyjnej wpływa proces planowania produkcji. Czy można takie potrzeby produkcyjne modyfikować? W którym momencie istnienia planu możemy to zrobić? Jeśli zezwalamy na modyfikację to czy usuwamy cały plan czy go inteligentnie zmieniamy?

// zdjecie chipsów (ewentualnie produkcji ich jak znajde zdjecie)

Dalej mamy kwestie samych maszyn. Z makiet nie wynika nam, że można modyfikować maszyny w trakcie planowania produkcji. A to rodzi kolejne pytania np. Czy można zmienić moc produkcyjną maszyny lub rodzaj produkowanych produktów? Jak to wpływa na nasz plan? Czy zmiana odpoczynku maszyny powinna być realizowana natychmiastowo (bo inaczej mamy dużą szansę na awarię) czy jednak wymusić to tylko dla nowych planów (bo nie jest to zmiana kluczowa)? Kto podejmuje taką decyzję?

Dla czytelności pominę kolejną warstwę pytań o wpływie zmiany potrzeby produkcyjnej czy maszyny na plan zakupowy i wysyłki. Problemy stają się coraz trudniejsze do rozwiązania. **Najgorsze zaś, że nie mamy tutaj prostych odpowiedzi.** Każda jedna decyzja ma wpływ na X kolejnych miejsc w systemie.

Moją hipotezą jest, że **makiety nie są pierwszą techniką jaką powinniśmy wybierać** pracując nad przenoszeniem procesów biznesowych do systemów informatycznych. Makiety są z natury statyczne. Nie pomagają nam zadawać kluczowych pytań o procesy biznesowe, które są oparte o czas. A to te procesy później kształtują działanie systemu.

## Modelowanie czasowe
O wiele łatwiej jest tego rodzaju problemy odkryć wcześnie stosując Event Storming i modelowanie czasowe. Opowiadał o tym Mathias Verraes w swojej post-itowej prezentacji na konferencji GOTO:
{{< youtube KNqOWT0lOYY >}}

Mając nasze procesy na tablicy możemy je przesunąć obok siebie by wzbudzić kolejne porcje pytań o ich współdziałanie:
- Czy ten proces może wystąpić równolegle?
- Co się powinno dziać w takiej sytuacji?
- Jak system powinien to komunikować użytkownikowi?
- Czy pożądana zmiana powinna zachodzić automatycznie czy manualnie?

**Takie pytania będą się pojawiały naturalnie pracując przy pomocy Event Stormingu** ponieważ sama technika zachęca do ich zadawania. Stworzenie nowej sytuacji wymaga tylko przeniesienia kilku karteczek - jest to proste i szybkie. Czas jest tutaj bezpośrednio widoczny na tablicy co nam daje szersze spojrzenie na nasz proces.

To z kolei ułatwi nam zauważenie nowych problemów i nieobsługiwanych warunków. Sam system stanie się odporniejszy na przypadki brzegowe. Jesteśmy w stanie podjąć decyzję czy obsługujemy ten przypadek technicznie, czy rozwiążemy go na zasadzie białkowej "a tego nie klikaj" 😀

## Modelowanie czasowe w procesie produkcji
Załóżmy że mamy procesy biznesowe rozpisane w formie następujących karteczek:
- karteczki z procesem planowania produkcji
- karteczki z procesem maszyny
- karteczki z procesem planowania pracy

Możemy wtedy przesunąc poszczególne kartki obok siebie i zapytać się np.
- karteczki z procesem planowania pracy i edycją potrzeby produkcyjnej
Co więcej, możemy się zapytać bardziej dokładnie:
- karteczki z procesem planowania pracy i edycją potrzeby produkcyjnej na etapach 
    - stworzono plan
    - wysłano plan do zatwierdzenia
    - zatwierdzono plan

Nagle te sytuacje stają się widoczne dla uczestników warsztatu i możemy zastanowić się nad rozwiązawaniem:
- karteczki z opisanymi rozwiązanami