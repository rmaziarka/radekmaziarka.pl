---
title: 'Dlaczego Bounded Contexty są ważne – parametry produktów'
slug: '/2018/11/26/dlaczego-bounded-contexty-sa-wazne-przyklad-3/'
date: Mon, 26 Nov 2018 21:35:38 +0000
draft: false
featured_image: 'images/2018/07/private-1665019_960_720.jpg'
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

// wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/). Po poprzednich, bardziej teoretycznych postach, nadszedł czas, by przejść do praktyki. W kilku następnych wpisach pokażę problemy, jakie powstały przez brak wydzielonych kontekstów w aplikacji. Wszystkie przytoczone przeze mnie przypadki braku kontekstów są realnymi przypadkami. Jedynie domena biznesowa została zmieniona na systemy zakupowe.

Sytuacja biznesowa
------------------

Firma posiada w sprzedaży szeroki pakiet produktów. Każdy z produktów ma zdefiniowanych część parametrów:

*   Waga – kg
*   Wymiary – cm x cm x cm
*   Zużycie energii - kWh

I jeszcze kilka dodatkowych – w sumie 10. Firma chciałaby móc zarządzać tymi parametrami w portalu administratora. Nastepnie na każdej stronie, gdzie wyświetlają się produkty, powinna się również wyświetlać część parametrów – na wyszukiwaniu, raportach, podsumowaniach, dashboardach, generowanych PDF’ach itd.

Rozwiązanie techniczne
----------------------

Aplikacja posiada moduł administratora, gdzie posiadamy formularz umożliwiający nam wpisanie wymaganych przez nas parametrów produktu. Następnie te dane są wykorzystywane w pozostałej części aplikacji. [![](https://radblog.pl/wp-content/uploads/2018/11/1.png)](https://radblog.pl/wp-content/uploads/2018/11/1.png) Niskopoziomowo, obie części korzystają z tego samego zbioru danych – modelu Product. Parametry są bezpośrednio wykorzystywane we wszystkich wyszukiwarkach, raportach, dashboardach itd.

Dynamiczne parametry
--------------------

Klient po zobaczeniu stworzonego rozwiązania postanowił zmienić nieco sposób działania parametrów. Od teraz powinniśmy móc je dynamicznie przypisywać – dla każdej kategorii osobno. Np.

*   Zużycie (farby) – ml / m2
*   Długość nogawki (spodnie) – cm

Część parametrów byłaby domyślna i niezmienna dla danej kategorii. Stworzone raporty / dashboardy powinny dalej korzystać z pre-definiowanych parametrów – chcemy mieć dokładnie to samo doświadczenie co poprzednio.

Dynamiczne parametry – rozwiązanie techniczne
---------------------------------------------

Stworzono system dynamicznych parametrów – na kształt [Entity-Attribute-Value](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model). Każdy parametr to osobny byt w bazie danych, który jest przypisany do danej kategorii. Następnie łączy się parametr i produkt, przez wartość parametru. [![](https://radblog.pl/wp-content/uploads/2018/11/2.jpg)](https://radblog.pl/wp-content/uploads/2018/11/2.jpg) Niestety wszystkie dotychczasowe miejsca korzystające z pre-definiowanych parametrów produktów musiały zostać przepisane. Postanowiono w każdym z miejsc analizować strukturę wartości parametrów i pobierać wartości. Każdy jeden moduł tworzący raporty zaczął w tym momencie rozwiązywać strukturę EAV.

System anglosaski
-----------------

Po pewnym czasie klient zgłosił potrzebę dodania do aplikacji obsługi systemu anglosaskiego. To znaczy, że zamiast dobrze nam znanych centymetrów, gramów czy litrów zaczynamy używać cale, funty czy pinty. Każdy parametr, który używał takich jednostek, mógł być zdefiniowany w jednym z tych systemów. Użytkownik korzystając z systemu mógł sobie zmieniać widok, tak by czasem widzieć parametry w systemie metrycznym, a czasem w imperialnym. Jednak wcześniej wspomniane raporty czy podsumowania musiały działać dalej na systemie metrycznym.

System anglosaski – rozwiązanie techniczne
------------------------------------------

Rozwiązaniem technicznym tego problemu było dodanie do struktury EAV definicji systemu miar. Następnie wartość parametru została wzbogacona o informację jakiego systemu dotyczy ten parametr. [![](https://radblog.pl/wp-content/uploads/2018/11/3.jpg)](https://radblog.pl/wp-content/uploads/2018/11/3.jpg) Niestety ta zmiana wpłynęła negatywnie na pre-definiowane parametry w starych częściach systemu. Do analizy struktury EAV została dodana kolejna funkcjonalność, pozwalająca pobierać zawsze jednostki metryczne.

Rezultat
--------

System posiada bardzo wiele miejsc zależnych od dynamicznej struktury parametrów produktów. Każde z nich analizuje tą strukturę by pobierać z niej odpowiednie dla siebie parametry. Spowodowało to dużą duplikację kodu i rozlewanie się logiki biznesowej parametrów na zewnątrz. Jakakolwiek zmiana w strukturze działania parametrów jest bardzo trudna i wymaga testów całego systemu. Już samo przygotowanie przypadków testowych do tak skomplikowanej logiki jest bardzo czasochłonne i obarczone sporym prawdopodobieństwem pominięcia jakiegoś przypadku.

Bounded contexts
----------------

Brakującym ogniwem, które pozwalałoby uprościć ten system, jest zrozumienie różnych funkcji produktu. Definiowanie, czym jest produkt a użytkowanie produktu to są 2 kompletnie różne cele. I do tego potrzebujemy różnych modeli. Produkt dla administratorów to byt dynamiczny, który w zależności od potrzeb się odpowiednio kreuje. Produkt dla klientów / odbiorców to byt statyczny ze zdefiniowanymi wcześniej parametrami. Nie można mu zmieniać informacji – mamy je jasno zdefiniowane i określone. Dlatego, o ile model EAV świetnie się sprawdza w stosunku do części administratorskiej, to kompletnie nie odpowiada potrzebom pozostałych części systemu. Zdecydowanie lepszym rozwiązaniem byłoby zdefiniowanie płaskiego modelu produktu jako naszego kontraktu z API kontekstu administratora. [![](https://radblog.pl/wp-content/uploads/2018/11/4.jpg)](https://radblog.pl/wp-content/uploads/2018/11/4.jpg) Takie działanie pozwalałoby nam chronić wewnętrzną strukturę parametrów, umożliwiając wprowadzanie wymaganych zmian. Jednocześnie pozostałe części systemu dostawałyby bardziej zrozumiały model, który nie narzuca na nich zrozumienie jak działają parametry.