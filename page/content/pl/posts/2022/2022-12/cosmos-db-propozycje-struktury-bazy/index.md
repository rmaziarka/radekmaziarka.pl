---
title: "Modelowanie w Cosmos DB - struktury bazy do testów"
date: 2022-12-14T09:59:30+01:00
url: '/2022/12/14/cosmos-db-struktury-bazy-do-testów'
images: ['2022/12/14/cosmos-db-struktury-bazy-do-testów/cosmos-modeling.jpg']
description: "Kolejny odcinek o modelowaniu w Cosmos DB - struktury bazy do testów"
category: 'Cosmos DB'
draft: true
---

Kontynuujemy cykl o modelowaniu w Cosmos DB. W [poprzednim odcinku](/2022/08/08/cosmos-db-propozycje-struktury-bazy/) określiliśmy kilka propozycji struktury bazy daych. Następnie wykonaliśmy ich ewaluację, odrzucając nieefektywne modele.

W tym odcinku zastanowimy wybierzemy 2 struktury do dalszych testów . Tak, 2 struktury 😀 - dalej nie będziemy mieli jednego rozwiązania docelowego. Poniżej dowiecie się dlaczego!

{{< advertisement type="Cosmos">}}

## Jakie mamy wynikowe struktury danych?

Podczas analizy wyszło nam, że dla przetrzymywania obiektu Bike Avaiability mamy w zasadzie tylko jedną opcję - partycjonowanie po CityId.

Z drugiej strony dla obiektów Reservation i Rental możemy mieć dwie opcje:
1. Partycjonować po UserId
2. Partycjonować po CityId i dniu - wykorzystując [klucz syntetyczny](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/synthetic-partition-keys) 

// zdjęcie

Każda z opcji posiada swoje plusy i minusy. Wszystkie one są umieszczone pod linkami - obrazki analiz nie zmieściłyby się na blogu 😅:
- Analiza - opcja 1
- Analiza - opcja 2

## Dlaczego wybieramy dwie struktury danych?

Na obecnym poziomie nie da się dokładniej porównać kosztowności obu rozwiązań. Mamy konkurencyjne struktury, które na papierze wyglądają bardzo podobnie. Tylko bezpośrednie uruchomienie danej struktury może nam odpowiedzieć na pytanie jak ona się sprawdza.

W świecie drogich zasobów musielibyśmy aktualnie podjąć arbitralną decyzję. Wybralibyśmy jeden model kosztem drugiego. Zaczęlibyśmy tworzyć rozwiązanie produkcyjne, które ostatecznie mogłoby się nie sprawdzić.

Ale nie jesteśmy w świecie drogich zasobów 💪 Możemy niskim kosztem stworzyć naszą bazę następnie ją usunąć, kiedy nie jest już potrzebna. Nic nie stoi na przeszkodzie, by przetestować kilka opcji na rzeczywitych przypadkach. Wtedy sprawdzimy, która z nich jest rzeczywiście lepsza. 

Takie podejście  bazuje na modelu Cynefin Dave'a Snowdena:
// cynefin

Mówi on, aby w obszarach dużej niepewności wykorzystywać bezpieczne ekspermenty ([safe-to-fail probes](https://cynefin.io/wiki/Safe_to_fail_probes)), aby sprawdzić jak dany scenariusz sprawdza się w praktyce.

## Scenariusz testowy

A więc jak może wyglądać nasz scenariusz testowy?

1. Stwórz strukturę bazodanową odpowiednią na podstawie prostych skryptów CLI.
2. Zapełnij bazę przykładowymi, ale rzeczywistymi danymi.
3. Sprawdź kosztowność zapytań przechodząc przez wzorce dostępu.
4. Porównaj rezultaty dla obu sturktur.

Co będzie dla nas głównym elementem porównania? Koszty RU.

## Request Unit - koszty zapytań

Z racji wykorzystania bazy Cosmos DB wymaga nieco opowiedzenia co będziemy opowiadania.


