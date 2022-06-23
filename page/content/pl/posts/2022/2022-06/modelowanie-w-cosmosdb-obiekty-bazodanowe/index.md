---
title: "Modelowanie w Cosmos DB - obiekty bazodanowe"
date: 2022-06-22T09:59:30+01:00
url: '/2022/06/22/modelowanie-w-cosmos-db-obiekty-bazodanowe'
images: ['2022/06/22/modelowanie-w-cosmos-db-obiekty-bazodanowe/cosmos-modeling.jpg']
description: "Kolejny odcinek o modelowaniu w Cosmos DB - obiekty bazodanowe"
category: 'Wzorce projektowe'
draft: true
---

Kontynuujemy cykl o modelowaniu w Cosmos DB. W [poprzednim odcinku](/) opisaliśmy wzorce dostępu do bazy wymagane do spełnienia potrzeb biznesowych.

W tym odcinku określimy obiekty bazodanowe. Chciałbym tutaj przedstawić podejście, które pozwoli nam uniknąć głównych problemów związanych z takim modelowaniem.

## Problem z modelowaniem obiektów

Zwykle jak modelujemy obiekty w kodzie, to skupiamy się na aspektach fizycznych modelowanego obiektu. Staramy się odwzorować czym jest dana rzecz - np. jakie cechy ma nasz klient. Niestety, to działa tylko na początku.

**Gdy mamy bardziej złożony biznes modelowanie skupione na właściwościach prowadzi do spaghetti code.** Kończymy z olbrzymimi modelami, które robią wszystko. A więc nie robią nic dobrze.

Zobaczmy jak to wygląda na przykładzie modelu Klienta. Rozpoczynamy od prostego modelu skupionego na szukaniu klienta:

(imie, email / telefon / social media)

Mamy imię klienta + przynajmniej jeden kierunek w którym możemy się z tym klientem skontaktować.

Następnie podpisujemy umowę, a wtedy potrzebujemy dodatkowych danych.

(imię i nazwisko, email, adres do umowy, rodzaj umowy, data trwania umowy)

Tutaj jednak zaczyna coś nie grać. Nagle email staje się wymagany. Dodatkowo poza imieniem pojawia sie nazwisko. **W tym momencie pojawią się statusy.** Inaczej nie będziemy mogli sprawdzić jakie pola muszą być wymagane.

Kiedy pójdziemy dalej i uzupełnimy model Klienta o właściwości z obszaru Płatności i Wierzytelności

(XYZ, obecny dług, do kiedy ma zapłacić)

Tutaj już widzimy do jakiego piekła doszliśmy. Mamy masę informacji, ale one wszystkie średnio do siebie pasują. **Klient jest wszystkim i iniczym jednocześnie.** W naszym kodzie musimy wykorzystywać masę ifów by bronić się przed sytuacją, gdy dane nie są kompletne.

Z takim podejściem ucieka nam również część możliwości biznesowych:

- nie wiemy skąd przychodzą do nas klienci, bo część pól jest reużywanych
- mamy informację tylko o jednym zadłużeniu, poprzednie nam uciekają

## Being, behaving, becoming

Sławek Sobótka na swojej prezentacji "Co gryzie świadomego programistę" przedstawił remedium na taki stan rzeczy (a w zasadzie przytoczył pracę Gerrego Weinberga).

Sławek pokazał jak można lepiej modelować obiekty na podstawie podejścia Being / Behaving / Becoming:

(obrazek mój)

Jest to podejście, które każe nam wziąć pod uwagę również zachowanie i zmianę danego obiektu. **To sprawia, że zadajemy lepsze pytania przy modelowaniu obiektów.** Spojrzenie z innej perspektywy pogłębia nasz model i rozdziela odpowiedzialności. Trudniej jest wrzucić wszystko do jednego worka. 

Na podstawie analizy odpowiedzialności obiektu Klienta moglibyśmy dojść do następujących rezultatów:

(Poszukujący / Klient / Płatnik / Dłużnik, bez nazw)

Posiadamy obiekty, które odwzorowują zarówno stan faktyczny jak i działanie. Mamy bardziej detaliczne obiekty, które odpowiadają na konkretne potrzeby. Nie nazywamy ich od początku. **Chcemy to zrobić dopiero wtedy kiedy mamy pewność jaka jest ich odpowiedzialność.** To pozwala nam uniknąć błędu poznawczego - [zakotwiczenia](https://pl.wikipedia.org/wiki/Heurystyka_zakotwiczenia_i_dostosowania).


(Poszukujący / Klient / Płatnik / Dłużnik z nazwami)

Na tej podstawie osiągamy wymierne zyski:

- Możemy mieć różne scenariusze działania - Poszukującego i Klienta, lub samego Klienta
- Dany klient może być kilka razy Dłużnikiem
- XYZ

## Rozwiązanie w domenie rowerów

Ok, mamy ogólne zrozumienie jak stosować technikę Being / Behaving / Becoming. Wykorzystajmy ją na naszym przykładzie.

### Obiekty stałe

Zacznijmy od najprostszych obiektów. Będziemy mieli w systemie obiekty, które odwzorowują pewne stałe informacje. 

(City, Station, Bike)

To są informacje, które zmieniają się bardzo wolno. I przeważnie są planowane wcześniej. Nikt przecież nie doda nowego miasta z dnia na dzień - potrzeba tutaj głębszego planowania.

Takie obiekty można łatwo cache'ować w warstwie aplikacyjnej. Nawet jeśli się zmienią, to ich obsługa będzie relatywnie prosta.

### Obiekty przyrastające w czasie

Następnie możemy się zastanowić w jaki sposób odwzorować obiekty związane z akcjami użytkownika.

Tutaj możemy zapropowować 2 obiekty - Reservation i Rental:

(Reservation, Rental)

Pierwszy z nich odpowiada za wszystkie aspekty rezerwacji. Mamy zarówno wymagane informacje, jak i możliwe akcje. Oraz sposób przejścia do obiektu Rental.

Obiekt Rental jest niezależny od obiektu Reservation. Możemy mieć takie ścieżki:

(obrazek)
- [początek] -> Reservation -> [koniec] 
- [początek] -> Reservation -> Rental -> [koniec]
- [początek] -> Rental -> [koniec]

**Połączenie tych obiektów razem spowodowałoby niepotrzebną zależność pomiędzy dwoma potrzebami.** Lepiej jest je oddzielić od siebie, aby mogły niezależnie ewoluować.

W tym momencie może nam przyjść do głowy pytanie: 

> Czy nie potrzebowalibyśmy obiektu Zwrot? 
 
W tym przypadku oceniam, że nie - odpowiedzialność takiego obiektu byłaby minimalna. Gdy w przyszłości pojawią się dodatkowe wymagania możemy zrewidować naszą decyzję.

### Obiekty opisujące aktualną rzeczywistość

Na koniec brakuje nam jeszcze jednego obiektu. Takiego, który by opisywał rower, ale z perspektywy dostępności roweru dla klientów. Taki obiekt odpowiadałby na diametralnie inne pytania, niż wcześniej określony Bike. Spójrzmy jak to może wyglądać:

(BikeAvailability)

Widzimy, że pomimo bycia rowerem obiekty Bike i BikeAvailability różnią się wzajemnie. **Możliwość zadania sobie dodatkowych pytań pomaga nam znaleźć lepsze propozycje obiektów.** Dzięki temu odpowiedzialności zarządzania flotą rowerów i dostępnością rowerów nie przenika na siebie wzajemnie.

## Podsumowanie

(zdjęcie)

Dzięki zastosowaniu techniki Being / Behaving / Becoming możemy zaprojektować bardziej dopasowane modele. Złożoność nie przenika pomiędzy konceptami. Poszczególne odpowiedzialności obiektów są dobrze dopasowane do problemu.

**Takie podejście pozwala nam obsługiwać więcej przypadków biznesowych.** Łatwiej jest również wprowadzać zmiany. Wasz biznes będzie w długiej perspektywie zadowolony, że stosujecie takie podejście 😀