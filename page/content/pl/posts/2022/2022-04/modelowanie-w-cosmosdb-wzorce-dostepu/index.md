---
title: "Modelowanie w Cosmos DB - wzorce dostępu"
date: 2022-04-17T09:59:30+01:00
url: '/2022/04/17/modelowanie-w-cosmos-db-wzorce-dostepu'
images: ['2022/04/17/modelowanie-w-cosmos-db-wzorce-dostepu/cosmos-modeling.jpg']
description: "Kolejny odcinek o modelowaniu w Cosmos DB - przedstawienie tablicy wzorców dostępu"
category: 'Wzorce projektowe'
draft: true
---

Kontynuujemy cykl o modelowaniu w Cosmos DB. Skonczyliśmy analizę potrzeb biznesowych. Teraz trzeba sie zastanowić się nad potrzebami bazy danych. Wykorzystamy do tego **tablicę wzorców dostępu**.

W tym odcinku wam przybliżę tą technikę. W kolejnym odcinku zmapujemy cały obszar biznesowy na tą strukturę oraz zaproponujemy syntezę zgromadzonej wiedzy.

## Mapowanie potrzeb biznesowych na bazodanowe XYZ

U większości zespołów praca nad bazą danych przebiega następująco:

1. Zebraliśmy potrzeby biznesowe
2. Tworzymy model bazy danych

I jest to dobre podejście, jednak podskórnie robimy tutaj pewien krok, którego nie widać. Otóż same potrzeby biznesowe nie mapują się na bazę danych. To co się naprawdę dzieje to:

1. Zebraliśmy potrzeby biznesowe
2. **Mapujemy potrzeby biznesowe na potrzeby bazy danych**
3. Tworzymy model bazy danych na podstawie potrzeb bazodanowych

To dzieje się w naszych głowach. Tworzymy spis potrzeb bazodanowych. Problemem jest to, że to co w naszej głowie trudno jest pokazać drugiej osobie. Jeśli nie wynosimy tych potrzeb bazodanowych na zewnątrz to łatwo jest nam się pokłócić o detale modelu bazy danych.

## Wzorce dostępu - jak to robi Microsoft

Na stronie dokumentacji CosmosDB możemy znaleźć [artykuł](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/how-to-model-partition-example#identify-the-main-access-patterns) o optymalizacji zapytań do tej bazy. Autorzy na początku **określili wzorce dostępu do bazy danych** w swojej aplikacji. Następnie krok po kroku optymalizowali strukturę bazy danych pod te wzorce.

![](microsoft-wzorce-dostepu.jpg)

Jednak dla nas najwazniejsze z tego artykułu są wzorce dostępu - główny sposób pobierania danych. W tym podejściu podejściu **traktujemy bazę danych jako blackbox** - skupiamy się na jej obserwowalnych zachowaniach.

To jest świetne podejście by odczepić model bazy danych (a nawet silnik bazy danych) od rzeczywistych potrzeb dotyczących bazy danych. **Możemy najpierw zdefiniować wzorce dostępu do bazy a następnie porównywać propozycje struktury baz.** Dzięki temu sprawimy, że mamy obiektywny sposób oceny struktury względem potrzeb. 

## Tablica wzorców dostępu

Pomyślałem, że można rozwinąć powyższe wzorce o dodatkowe parametry. Na ich podstawie można jeszcze głębiej zastanowić się nad docelową strukturą:

Proponowana lista parametrów poniżej:

![](tablica-wzorcow-dostepu.png)

Przechodzimy po kolei scenariusze biznesowe. Na ich podstawie definiujemy poszczególne wzorce dostępu do bazy danych. Uzupełniamy kolejne kolumny:

- Nazwa - Musimy jakoś nazwać nasz wzorzec dostępu 😀
- Rodzaj - Czy to jest zapytanie o dane (Query), czy zmiana stanu (Command).
- Zbiór danych - O jakie dane się pytamy, jakie informacje chcemy pozyskać.
- Ilość zapytań / zmian - Jak wiele planujemy zapytań w naszym systemie.
- Jak duży jest zbiór - Jak wiele danych będzie w odpytywanym zbiorze.
- Czy zbiór rośnie (C) - W przypadku zmiany stanu chcemy zrozumieć czy zmieniany zbiór nam rośnie.
- Jak bardzo (C) - Jeśli nasz zbiór rośnie to określamy jak bardzo.

Nie musimy wpisywać dokładnych liczb, czy być super szczegółowi wobec zbiorów danych. **Skupiamy się na usunięciu z scenariuszy biznesowych całego szumu**. Zostawiamy tylko "mięso bazodanowe". 

Powyższe kolumny są tylko propozycją - jeśli macie sugestię jak usprawnić tą tabelę to dawajcie znać w komentarzach 💌

## Tablica wzorców dostępu - przykład

Pełny spis wzorców dostępu dla systemu wypożyczeń będzie w kolejnych odcinkach. Tutaj opiszę przykład na jednego scenariusza - [rezerwacji roweru wolnostojącego](/2022/01/30/modelowanie-w-cosmos-db-rezerwacje/). 
Pełny spis wzorców dostępu dla systemu wypożyczeń będzie w kolejnych odcinkach. Tutaj opiszę przykład na jednego scenariusza - [rezerwacji roweru wolnostojącego](/2022/01/30/modelowanie-w-cosmos-db-rezerwacje/). 

![](free-standing-bike.jpg)
![](tablica-wzorcow-dostepu-with-data.jpg)

To co wpisujemy bazuje na scenariuszach biznesowych poznanych wcześniej oraz na dalszych rozmowach z biznesem. Większość informacji tłumaczy się sama, ale warto poruszyć najwazniejsze kwestie:

- Biznes powiedział nam, że około połowa dziennych wypożyczeń dzieje się na podstawie rezerwacji. Mamy więc 500-20 000 rezerwacji.
- Każde wykonanie rezerwacji powoduje, że rośnie nam zbiór danych. Możemy kiedyś to zoptymalizować, ale domyślnie tak jest.
- Jednak wyłączenie roweru z dostępnych zachowuje się inaczej. Ilość rowerów jest stała (gdy modyfikujemy rowery) +/- stała (gdy dodajemy i usuwamy rowery).

Tak prosty przykład a już widzimy, że:

- Podczas jednego scenariusza dotykamy różnych zbiorów danych.
- Mamy wzorce, które różnią się docelowymi danymi oraz sposobem działania.
- Mamy silnie rosnący zbiór Rezerwacji, który potencjalnie może utrudnić nam model bazy danych.

## Jak tablica wzorców dostępu nam pomaga

XYZ obrazek jakichs zyskow

Cała tabelka pozwala nam:

2. Widzimy co jest odpytywane wspólnie, co rozdzielnie
3. Zauważyć gdzie musimy szczególnie zadbać o odpowiednie modele bazy danych, a gdzie możemy nieco odpuścić.

Zobaczycie na samym końcu jak wiele mamy informacji widocznych.

## Komentarze do komentarzy

Dostałem parę komentarzy odnośnie tej tablicy. Pomyślałem, że odniosę się do nich od razu.

### Nie mamy przypadków biznesowych

To oznacza, że nie przeszliśmy przez poprzednie kroki naszego cyklu. Bez przypadków biznesowych trudno jest zaplanować kształt systemu i bazy danych. Musimy wrócić do początku i zrozumieć potrzeby biznesowe. Na tej podstawie rozpisać scenariusze biznesowe. Wtedy będziemy gotowi by zając się wzorcami dostępu 😊

### Nie wiemy jakie liczby wpisywać

Jeśli nic nie wiemy, to trudno jest zaplanować system. Zapytajmy się więc naszego biznesu. 

> A co jeśli biznes również nie wie jakie jest / powinno być wykorzystanie?

Biznes wie, chociaż na swój sposób. Jeśli zadamy mu pytanie o dokładną wartość to bardzo możliwe, że wiedzieć nie będzie. **Biznesu należy pytać o wartości które zna i rozumie.** Możemy nie mówić w ogóle o zapytaniach, a skupić się na klientach (i założyć jakieś mapowanie klient -> liczba zapytań):

- 1 klient na dzień
- 1 klient na godzinę
- 1 klient na sekundę

Możemy również poprosić o jakieś statystyki (np. z Google Analytics), jeśli jakiś system już istnieje.

> A jeśli naprawdę nie wie, albo mówi o zakresie 1 - 1 000 000 zapytań dziennie?

To musimy się skupić nad zawężeniem tego zakresu, zanim zaczniemy tworzyć wzorce dostępu do bazy danych. Dalsza praca nie ma sensu, ponieważ:

- Jeśli stworzymy system dla 1 zapytania dziennie a będziemy mieli  1 milion to system wywali się w sposób arcyspektakularny 🔥
- Jeśli stworzymy system dla 1 miliona zapytań dziennie to system będzie przepalał pieniądze aż miło 💰

### To nie jest zwinne

Jak pisałem w [artykule](https://radekmaziarka.pl/2022/01/21/architektura-ewolucyjna-z-perspektywy-organizacji/#wzorce-ewolucyjne-dla-poszczeg%C3%B3lnych-obszar%C3%B3w) "Architektura ewolucyjna z perspektywy organizacji" nie wszystkie obszary biznesowe są identyczne pod względem zwinności. Część potrzebuje bardziej up-front podejścia aby dobrze rozwiązać jego potrzeby. **Wyobrażasz sobie, że w wersji pierwszej zrobimy wypożyczenie, ale nie zrobimy oddania roweru?** Ja też nie 😉

Ogólnym moim zarzutem jest to, że w mojej ocenie jest to bardzo zwinne podejście. Jak mówił na jednej prezentacji [Tomek Nurkiewicz](https://www.linkedin.com/in/tomasz-nurkiewicz-80513b92/?originalSubdomain=pl): 

> "Pięć dni kodowania pozwoli nam zaoszczędzić kwadrans analizy"

Wolę więc najpierw zwinnie zrozumieć potrzeby, a później usiąść do kodzenia.  

### A co jeśli pojawi się nowe wymaganie

To je dodajesz do tabelki. Jeśli realnie zmienia twoją strukturę, to musisz się zastanowić jak w takim raize zmienić twoją strukturę.

Jednak masz opisane wszystkie wzorce dostępu, wobec czego wiesz czy realnie potrzebujesz to zrobić. Ewentualnie czy nie możesz wykorzystać już obecnych wzorców i wykonać kilka dodatkowych akcji.
