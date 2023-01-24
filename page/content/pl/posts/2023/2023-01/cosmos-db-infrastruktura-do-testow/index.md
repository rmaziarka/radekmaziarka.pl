---
title: "Modelowanie w Cosmos DB - struktury bazy do testów"
date: 2023-01-24T09:59:30+01:00
url: '/2023/01/24/cosmos-db-infrastruktura-do-testow'
images: ['2023/01/24/cosmos-db-infrastruktura-do-do-testow/cosmos-modeling.jpg']
description: "Kolejny odcinek o modelowaniu w Cosmos DB - infrastruktura do testów"
category: 'Cosmos DB'
---

Kontynuujemy cykl o modelowaniu w Cosmos DB. W [poprzednim odcinku](/2022/12/14/cosmos-db-struktury-bazy-do-testów/) wybraliśmy 2 docelowe struktury bazy danych do testów.

W tym odcinku utworzymy infrastrukturę, którą będziemy testować w kolejnych odcinkach.

{{< advertisement type="Cosmos">}}

## Infrastruktura chmurowa

Poniżej pokażę jak krok po kroku stworzyć testową infrastrukturę. Cały kod jest dostępny na [**moim GitHub**](https://github.com/rmaziarka/BikeSharing/tree/master/BikeSharing.Infrastructure) w repozytorium BikeSharing.

Aby przetestować nasz scenariusz stworzymy następującą architekturę:

[![](infrastructure.jpg)](infrastructure.jpg)

Skoro testujemy bazę danych, to nasza infrastruktura będzie zawierała:

- **Konto Azure Cosmos DB**. Nazwa zawiera w sobie dynamiczny identyfikator, który wyjaśnię poniżej. 
- **Bazę danych**. Tutaj faktycznie będą umieszczone nasze kontenery. Nazwa wskazuje na scenariusz biznesowy, który testujemy.
- **Kontenery** - Availability i Rentals. Tutaj będą umieszczone dane.

Dodatkowo, na potrzeby analizy ruchu, wykorzystamy **Log Analytics Workspace**. Nie jest to kluczowy element do naszych testów wydajności. Jednak testy wydajności wygenerują wykorzystanie bazy danych, które pokażę jak analizować w podsumowaniu serii. 

Zauważcie, że **nie mamy tutaj żadnego serwisu compute**. Jest to celowe - aby uruchomić testy wydajności bazy danych nie musimy do tego posiadać dodatkowej infrastruktury. Wystarczy nam nasz prywatny komputer.

## Skrypty tworzące bazę danych

Na obecnym poziomie nie da się dokładniej porównać kosztowności obu rozwiązań. Mamy konkurencyjne struktury, które na papierze wyglądają bardzo podobnie. Tylko bezpośrednie uruchomienie danej struktury może nam odpowiedzieć na pytanie jak ona się sprawdza.

```console

```


