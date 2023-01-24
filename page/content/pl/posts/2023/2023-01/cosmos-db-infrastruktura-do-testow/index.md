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

## Tworzenie infrastruktury

W tym momencie powstaje pytanie - jak tworzyć tą infrastrukturę?

Możemy po prostu przejść do tworzenia infrastruktury w panelu Azure. Niestety, **wyklikanie całego rozwiązanie to droga do nikąd**. Nie będziemy w stanie się upewnić, czy nasze infrastruktury są w rzeczywistości identyczne, kiedy tworzymy je manualnie. Dodatkowo jest to bardzo mozolny proces, w którym łatwo o pomyłkę.

**Tworzenie infrastruktury ze skryptów jest o wiele bardziej pewne.** A przy tym niewiele wolniejsze (pod względem pisania). Z racji, że nie piszemy tutaj aplikacji produkcyjnej, to nie musimy się silić na zaawansowane przekazywanie secretów czy rozwiązania w stylu [Terraform](https://www.terraform.io/) czy [Pulumi](https://www.pulumi.com/).

![](azcli.png)

Do automatyzacji tworzenia infrastruktury wykorzystamy Azure Command-Line Interface - w skrócie Azure CLI 😀

Aby tworzyć taką infrastrukturę należy przez to narzędzie potrzebujemy:

- [Zainstalować Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Zalogować się do chmury](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli)
- [Poznać składnię dotyczącą CosmosDB](https://learn.microsoft.com/en-us/cli/azure/cosmosdb?view=azure-cli-latest) 

## Skrypty tworzące bazę danych

Na obecnym poziomie nie da się dokładniej porównać kosztowności obu rozwiązań. Mamy konkurencyjne struktury, które na papierze wyglądają bardzo podobnie. Tylko bezpośrednie uruchomienie danej struktury może nam odpowiedzieć na pytanie jak ona się sprawdza.

```console

```


