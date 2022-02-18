---
title: "Uważaj na słowa pułapki"
date: 2022-01-27T09:59:30+01:00
draft: true
---

Podstawą komunikacji jest, że jednak i druga strona muszą używać wspólnego języka. Jeśli ja mówię po polsku, a mój klient po angielsku, to z oczywistych względów się nie dogadamy. Jednak sam fakt rozmawiania po polsku nie sprawi, że się dogadamy 😉

## Natychmiast

Załóżmy, że mamy taką daną sytuację:

- Klient chce przeprowadzić zmianę w XYZ a następnie ABC
- Zastanawiamy sie w jaki sposób tego dokonać. Oczywistym pomysłem jest to, żeby wykorzystać jakąś bazę skoncentrowaną na odczyt np. Elastic Search
- To jednak spowoduje problem tzw ostatecznej spójności czyli najpierw będziemy mieli dane w jednym miejscu, a dopiero później w drugim. Pomiędzy tym
- **Pytamy się więc "Czy po wprowadzeniu dane powinny być natychmiast widoczne dla użytkownika strony?"**
- Klient odpowiada, że tak. Wobec czego zostaje nam kombinowanie jak to zrobić w jednej bazie. Ale czy na pewno?

Słowo natychmiast jest tutaj słowem pułapką. **Dla różnych grup osób słowo "natychmiast" będzie miało inne znaczenie**:

- Osoby techniczne - dostępność na poziomie bazy danych tak aby nie było rozróżnienia pomiędzy write / read
- Użytkownik strony - aby nie musiał czekać kolejnego dnia do zobaczenia zmian, wystarczy jak dane będą widoczne gdy wróci z wypadu po kawę do kuchnii


## Słowa mają inne znaczenie

## Inne słowa pułapki

### Dostępny

### Bezpiecznie

Zawsze pytaj co to znaczy natychmiast. Czy inne słowa ogólne. Dla nas natychmiast to może być spójność na zasadzie bazy danych. Dla biznesu spójność w 15 minut, żeby po kawie dane się pokazały. Co zo znaczy że serwis musi być zawsze dostępny. Mu myślimy o SLA na poziomie 99.999. nasi klienci mogą chcieć mieć dostęp do danych pomiędzy 8-20, w pozostakych godzinach to nie ma znaczenia większego.