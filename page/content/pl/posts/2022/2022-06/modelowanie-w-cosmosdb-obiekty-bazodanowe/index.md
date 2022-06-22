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

W tym odcinku określimy obiekty bazodanowe. Chciałbym tutaj przedstawić podejście, które pozwoli nam uniknąć głównych problemów.

## Problem z modelowaniem obiektów

Zwykle jak modelujemy obiekty w kodzie, to skupiamy się na właściwościach danego obiektu. Staramy się odwzorować stan faktyczny - np. jakie cechy ma nasz klient. Niestety, to działa tylko na początku.

**Gdy mamy bardziej złożony biznes modelowanie skupione na właściwościach prowadzi do spaghetti code.** Kończymy z olbrzymimi modelami, które robią wszystko. A więc nie robią nic dobrze.

Zobaczmy jak to wygląda na przykładzie modelu Klienta. Rozpoczynamy od prostego modelu skupionego na szukaniu klienta:

(imie, email / telefon / social media)

Mamy imię klienta + przynajmniej jeden kierunek w którym możemy się z tym klientem skontaktować.

Następnie podpisujemy umowę, a wtedy potrzebujemy dodatkowych danych.

(imię i nazwisko, email, adres do umowy, rodzaj umowy, data trwania umowy)

Tutaj jednak zaczyna coś nie grać. Nagle email staje się wymagany. Dodatkowo poza imieniem pojawia sie nazwisko. **W tym momencie pojawią się statusy.** Inaczej nie będziemy mogli sprawdzić jakie pola muszą być wymagane.

Kiedy pójdziemy dalej i uzupełnimy model Klienta o właściwości z obszaru Płatności i Wierzytelności

(XYZ, obecny dług, do kiedy ma zapłacić)

Tutaj już widzimy do jakiego piekła doszliśmy. Mamy masę informacji, ale one wszystkie średnio do siebie pasują. W naszym kodzie musimy wykorzystywać masę ifów by bronić się przed sytuacją, gdy danych nie ma.

Dodatkowo tracimy również istotne dane:

- nie wiemy skąd przychodzą do nas klienci, bo część pól jest reużywanych
- mamy informację tylko o jednym zadłużeniu, poprzednie nam uciekają

## Being, behaving, becoming

Sławek Sobótka na swojej prezentacji "Co gryzie świadomego programistę" przedstawił remedium na taki stan rzeczy (a w zasadzie przytoczył pracę Gerrego Weinberga).

Sławek pokazał jak można lepiej modelować obiekty na podstawie podejścia Being / Behaving / Becoming

(obrazek mój)

Jest to podejście, które każe nam wziąć pod uwagę również zachowanie i zmianę danego obiektu. To pozwala nam zauważyć, że w rzeczywistości potrzebujemy 3 różnych konceptów aby spełnić te wymagania.

Na podstawie analizy odpowiedzialności obiektu Klienta moglibyśmy dojść do następujących rezultatów:

(Poszukujący / Klient / Płatnik / Dłużnik)

Posiadamy obiekty, które odwzorowują zarówno stan faktyczny jak i działanie. Na tej podstawie osiągamy wymierne zyski:

- Możemy mieć różne scenariusze działania - Poszukującego i Klienta, lub samego Klienta
- Dany klient może być kilka razy Dłużnikiem
- XYZ

## Rozwiązanie w domenie rowerów

### Obiekty stałe

### Obiekty klienta

### Obiekty opisujące stan

## Podsumowanie