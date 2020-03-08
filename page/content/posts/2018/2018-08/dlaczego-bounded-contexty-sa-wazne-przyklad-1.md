---
title: 'Dlaczego Bounded Contexty są ważne – partie produktów a działy firmy'
slug: '/2018/08/28/dlaczego-bounded-contexty-sa-wazne-przyklad-1/'
date: Tue, 28 Aug 2018 20:33:44 +0000
draft: false
featured_image: 'images/2018/07/private-1665019_960_720.jpg'
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

// wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/).

Po poprzednich, bardziej teoretycznych postach, warto przejść do praktyki. W kilku następnych postach pokażę problemy, jakie powstały przez brak wydzielonych kontekstów w aplikacji.

Wszystkie przytoczone przeze mnie przypadki braku kontekstów są realnymi przypadkami. Jedynie domena biznesowa została zmieniona na systemy zakupowe.

Sytuacja biznesowa
------------------

Firma posiada sieć magazynów i sklepów. W całym procesie możemy wyodrębnić następujące działy (pozostałe działy zostały pominięte dla spójności opisu):

*   Dział Zakupów - kupuje produkty
*   Dział Magazynu - przyjmuje produkty do magazynu (partia przyjeżdza ciężarówką)
*   Dział Jakości - sprawdza produkty po przyjęciu do magazynu

Produkty są dzielone na partie - mogą mieć fabryczny numer produkcji (123) i przyjechać do magazynu na ciężarówce (ABC).

Rozwiązanie techniczne
----------------------

Aplikacja została napisana w taki sposób, że:

*   Dział Zakupów dodaje partie do aplikacji.
*   Dział Magazynu w swoim widoku magazynu przyjmuje daną partię.
*   Po przyjęciu partia wyświetla się w widoku działu Jakości, który dodaje dla niej raport jakościowy.

Każdy z działów używa zwrotu „partia produktów” w swoich codziennych rozmowach. Spowodowało to stworzenie takiego procesu w aplikacji, w którym model partii przechodzi bez zmiany kształtu od działu Zakupów przez Magazyn po Jakość.

Problem
-------

Osoby z działu Zakupów, myśląc o partii produktów, mają w głowie pojedynczy wiersz Excela – na tym codziennie operują. Przyjdzie tyle i tyle produktów, o numerze fabrycznym 123 na samochodzie ABC. Jeśli mamy produkty o różnych numerach, bądź podróżujące na różnych samochodach to były to dla nich osobne partie. Tak też partia produktów została zamodelowana w aplikacji.

Następnie produkty trafiają do magazynu, transportowane ciężarówką. I tam, dla magazynierów, partia produktów to wszystkie produkty w jednej ciężarówce, czyli często posiadające różne numery fabryczne. Zatem w rzeczywistości kilka różnych partii z działu Zakupów.

Później dział Jakości sprawdza jakość przywiezionych produktów. A robi to po fabrycznym numerze produkcji. Produkty o tym samym numerze często jechały na różnych samochodach i były składane jako jedna partia już po przyjęciu. Więc dla działu Jakości partia produktów są to wszystkie produkty z tym samym fabrycznym numerem produkcji.

[![](https://radblog.pl/wp-content/uploads/2018/08/POWERPNT_2018-08-28_22-26-51.png)](https://radblog.pl/wp-content/uploads/2018/08/POWERPNT_2018-08-28_22-26-51.png)

Okazało się, że ten sam zwrot jest kompletnie inaczej postrzegany w każdym z działów, przez co powinien zostać odmiennie zamodelowany.

Rezultat
--------

Aktualnie działy Magazynu i Jakości nie mają zgrupowanych partii według swoich potrzeb. Powoduje to, że muszą dokonywać kilku dodatkowych przyjęć / sprawdzeń jakościowych – na każdym pojedynczej partii z działu Zakupów. Co więcej, także każdorazowa modyfikacja już wprowadzonych danych wymaga kilku identycznych akcji.

Co gorsze, czasem się zdarza, że do magazynu przyjedzie partia z innymi numerami fabrycznymi niż zakładał dział Zakupów. W tym przypadku pracownicy Magazynu muszą nadpisywać poprzednie dane. Powoduje to stratę historii zakupów i trudności z odnalezieniem różnic pomiędzy zakupami a magazynem.

Bounded contexts
----------------

Rozwiązaniem problemu byłoby stworzenie oddzielnych kontekstów dla każdego z działów – Zakupów / Magazynu / Jakości. Każdy z nich miałby inny model „partii”:

*   Zakupy – PurchaseBatch
*   Magazyn – WarehouseBatch
*   Jakość – QualityBatch

Następnie przy przyjmowaniu partii do magazynu wykorzystywalibyśmy Anti-Corruption Layer, by przetłumaczyć obcy model na nasz własny. Mógłby on np. przyjmować kilka partii z działu Zakupów i tworzyć dla nich model odpowiedni dla działu Magazynu. Analogicznie sytuacja wyglądałaby przy kontroli jakości danej partii.

Dzięki temu magazynierzy i kontrolerzy jakości mieliby dane składowane w sposób dostosowany do ich potrzeb. Wszystkie operacje mogłyby być wykonywane jednostkowo, ponieważ dane w dziale nie byłyby duplikowane. Na potrzeby raportowe bylibyśmy w stanie dokonywać porówania danych pomiędzy działem Zakupów i Magazynem, by odnaleźć różnice.

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Dlaczego-Bounded-Contexty-sa-wazne-przyklad-1-Radek-Maziarka "") - <time datetime="2018-08-29 08:00:00">Aug 3, 2018</time>

**Dlaczego Bounded Contexty są ważne – przykład 1 | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
