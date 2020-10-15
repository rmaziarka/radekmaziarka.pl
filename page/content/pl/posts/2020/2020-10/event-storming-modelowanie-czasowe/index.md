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
Przeprowadzając ostatnie [warsztaty zdalne](/szkolenia-i-warsztaty/event-storming) zauważyłem poraz kolejny, że makiety nie działają tak jak powinny. Proste scenariusze biznesowe są świetnie zwizualizowane, z kolejnymi ekranami do przeklikania. Przechodzisz przez taki system i masz wrażenie, że wszystko działa jak powinno.

Niestety makiety rzadko kiedy biorą pod uwagę czas i jego sposób oddziaływania na system:
- procesy mogą się dziać równolegle
- proces A może trwać tak długo, że wpłynie to na proces B
- proces A może trwać tak szybko, że proces B go nie zauważy
- proces A może wystąpić na różnych etapach procesu B inaczej na niego oddziaływując
 
Najczęściej tego rodzaju sytuacje **wyłapujemy dopiero na produkcji - gdy koszt ich obsługi jest olbrzymi** i powoduje poważne problemy dla naszych klientów.

Problemem nie są tutaj poszczególne makiety a właściwie same makiety jako sposób opisu systemu. Tego rodzaju scenariusze są prawie nie do zrealizowania w narzędziach graficznych. Wobec czego **pracując w oparciu o makiety nie zauważymy tych sytuacji**. A w taki sposób jest przygotowywanych większość spefycikacji systemów.

## Proces oparty na makietach

![Śrubki](screws-1.jpg)
Załóżmy, że naszym obszarem biznesowym jest produkcja śrubek. Mamy następujące procesy:

- Dział sprzedaży tworzy potrzebę produkcyjną np. 10 000 śrubek dziennie od 1 października do 30 listopada
- Te potrzeby tworzą nam dzienne partie do wyprodukowania
- Osobno zarządzamy maszynami produkcyjnymi - ich mocą produkcyjną, rodzajem śróbek i czasami przerw lub przezbrojenia
- Na podstawie partii do produkcji i maszyn tworzymy i akceptujemy plan produkcyjny

Dalej możemy mieć procesy planowania zakupów półproduktów i wysyłki.

Makiety dla tego procesu mogą wyglądać następująco:

![Makieta potrzeby produkcyjnej](makieta-potrzeba-produkcyjna.jpg)
![Makieta maszyny](makieta-maszyna.jpg)
![Makieta planu produkcyjnego](makieta-plan-produkcyjny.jpg)

Dwie pierwsze makiety są dość oczywiste - określamy naszą potrzebę produkcyjną i parametry maszyny. Na ostatniej makiecie dzieje się nieco więcej. Potrzebujemy zaplanować pracę maszyn w taki sposób, aby wspólnie wyprodukowały śróbki określone przez potrzeby produkcyjne. Do każdej maszyny możemy przydzielić partie produkcyjne. Pomiędzy partiami dla różnych śróbek widzimy czas wymagany na przezbrojenie maszyny.

## Problemy makiet
Dość oczywisty problem, który nie wynika z makiet, to jak zmiana potrzeby produkcyjnej wpływa proces planowania produkcji:
- Czy w ogóle można takie potrzeby produkcyjne modyfikować po zaplanowaniu produkcji? 
- W którym momencie istnienia planu możemy to zrobić? 
- Jeśli zezwalamy na zmianę to czy usuwamy cały plan czy go inteligentnie zmieniamy?

![Śrubki](screws-2.jpg)

Dalej mamy kwestie samych maszyn. Makieta nie pokazuje jak modyfikacja parametrów maszyny oddziaływuje na produkcję. A możemy tutaj znaleźć kolejne problemy. Na przykład:
- Czy można zmienić moc produkcyjną maszyny lub rodzaj produkowanych produktów? Jak to wpływa na nasz plan? 
- Co jeśli maszyna nie może produkować rodzaju śróbek, które są juz zaplanowane?
- Czy zmiana przerwy maszyny powinna być realizowana natychmiastowo (bo inaczej mamy większą szansę na awarię) czy jednak wymusić to tylko dla nowych planów (bo nie jest to zmiana kluczowa)? 
- Kto podejmuje taką decyzję?

Dla czytelności pominę kolejną warstwę pytań o wpływie zmiany potrzeby produkcyjnej czy maszyny na plan zakupowy i wysyłki. Problemy stają się coraz trudniejsze do rozwiązania. Najgorsze zaś jest to, **że makiety nie pozwalają łatwo odkrywać takich problemów.** Patrząc na system przez makiety nie widać złożoności procesów, różnych zapętleń, sprzeczności.

Moją hipotezą jest, że **makiety nie są pierwszą techniką jaką powinniśmy wybierać** pracując nad przenoszeniem procesów biznesowych do systemów informatycznych. Makiety są z natury statyczne. Nie pomagają nam zadawać kluczowych pytań o procesy biznesowe, które są oparte o czas. A to te procesy później kształtują działanie systemu.

## Modelowanie czasowe
O wiele łatwiej jest tego rodzaju problemy odkryć wcześnie stosując Event Storming i modelowanie czasowe. Opowiadał o tym Mathias Verraes w swojej post-itowej prezentacji na konferencji GOTO:
{{< youtube KNqOWT0lOYY >}}

Mając nasze procesy na tablicy możemy połączyć równoległe procesy by wzbudzić kolejne pytania:
- Czy proces A może wystąpić równolegle do B?
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
    - jak zmiana planowania pracy wpływie na potrzebę produkcyjną?

Co więcej, możemy się zapytać bardziej dokładnie:
- karteczki z procesem planowania pracy i edycją potrzeby produkcyjnej na etapach 
    - stworzono plan
    - wysłano plan do zatwierdzenia
    - zatwierdzono plan

Nagle te sytuacje stają się widoczne dla uczestników warsztatu i możemy zastanowić się nad rozwiązawaniem:
- karteczki z opisanymi rozwiązanami

## Modelowanie procesów niewidocznych dla użytkowników
Event Storming świetnie się również sprawdza w modelowaniu procesów przy których nie ma styku człowiek. A te są coraz częstsze w naszych systemach. Mamy coraz więcej systemów, które muszą się natychmiastowo kontaktować i uwspólniać informacje.

Załóżmy, że chcielibyśmy codziennie uruchomić pobieranie danych o planowanej produkcji z dodatkowego systemu. **Makiety nie pomogą nam zamodelować takiego procesu.** Moglibyśmy się uciekać do diagramów BPMNa, ale to dodatkowa notacja do nauczenia. Z Event Stormingiem jest prościej:

- karteczki z procesem importu 
    - nastąpiła 24
    - zapytano zewnętrzny system o planowaną produkcję
    - zewnętrzny system
    - odebrano informacje o planowanej produkcji 
    - zaplanowano produkcję
    - powiadomiono inżynierów produkcji o nowych zleceniach

Dzięki temu możemy również obsłużyć negatywne ścieżki związane z kontaktem z systemem zewnętrznym
- brak odpowiedzi od zewn. systemu
- powiadom inżynierów produkcji o problemie z synchronizacją

