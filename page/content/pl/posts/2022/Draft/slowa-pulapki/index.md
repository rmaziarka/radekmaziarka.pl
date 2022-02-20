---
title: "Uważaj na słowa pułapki"
date: 2022-01-27T09:59:30+01:00
draft: true
---

Podstawą komunikacji jest, że jedna i druga strona muszą używać wspólnego języka. Jeśli ja mówię po polsku, a mój klient po angielsku, to z oczywistych względów się nie dogadamy. Jednak sam fakt rozmawiania po polsku nie sprawi, że się dogadamy 😉

## Natychmiast

Załóżmy, że mamy taką sytuację:

- Tworzymy dla klienta platformę do sprzedaży nieruchomości. W tej platformie ma być bardzo funkcjonalna wyszukiwarka aby klienci mogli znaleźć tą nieruchomość w dowolny sposób.
- Klient chce umożliwić swoim menadżerom zmiany cen nieruchomości, aby zmiany tej ceny były pokazane na stronie ofertowej.
- Zastanawiamy sie w jaki sposób tego dokonać. Oczywistym pomysłem jest to, aby dla strony ofertowej wykorzystać bazę skoncentrowaną na odczycie np. Elastic Search.
- To jednak spowoduje problem tzw. ostatecznej spójności - najpierw będziemy mieli dane w głównej bazie, a dopiero później w bazie odczytowej. Pomiędzy synchronizacją danych stan systemu będzie "niespójny".
- **Pytamy się więc "Czy po zmianie cen powinny być one natychmiast widoczne na stronie ofertowej?"**
- Klient odpowiada, że tak. Wobec czego zostaje nam kombinowanie jak to zrobić w jednej bazie. Ale czy na pewno?

Słowo "natychmiast" jest tutaj słowem pułapką. **Dla różnych grup osób słowo "natychmiast" będzie miało inne znaczenie**:

- Osoby techniczne - spójność na poziomie systemu, tak aby nie było rozróżnienia pomiędzy ścieżką write / read.
- Menadżer nieruchomości - aby nie musiał czekać całego dnia by zobaczyć zmiany. Wystarczy, że dane będą widoczne gdy wróci z z kawą z kuchnii.

## Słowa pułapki

Sam fakt posługiwania się tymi samymi słowami, nie oznacza, że rozumiemy je w ten sam sposób. Szczególnie jeśli używamy słów, które nie mają stricte ilościowego odwzorowania. **Takie słowa mają dokładne znaczenie tylko w konkretnym obszarze (biznesowym).** "Natychmiast" dla [High-Frequency Trading](https://en.wikipedia.org/wiki/High-frequency_trading) będzie czymś zdecydowanie innym niż dla branż, gdzie czas nie jest tak kluczowy. 

Wobec czego, jeśli wykorzystujemy takie niejasne słownictwo w naszych rozmowach to naturalnie jesteśmy narażeni na problemy. **Wpadamy w pułapkę, którą zastawiliśmy sami na siebie.** Zadajemy pytanie, otrzymujemy odpowiedź, ale ona wcale nie przybliża nas do lepszego zrozumienia problemu. Wręcz przeciwnie - oddala nas od realizacji celu. 

Dlatego też zwracaj uwagę na dokładność swojego słownictwa. Jeśli słyszysz słowa pułapki od swoich rozmówców to dopytuj o ich właściwe znaczenie. Pozwoli to uniknąć przykrych rozmów, gdy przyjdzie do sprawdzenia docelowego rozwiązania.

## Inne słowa pułapki

Poniżej możecie przeczytać przykłady takich słów pułapek, wraz z ich różnym rozumieniem dla poszczególnych obszarów biznesowych.

### Dostępny

System ma być szeroko dostępny dla naszych użytkowników:

- Środowiska korporacyjne - Od 6 do 21, w poniedziałek i piątek. W innych godzinach problemy z dostępnością są akceptowalne.
- Rejestracja na studia - Od czerwca do października w każdych godzinach. Później mogą być dłuższe przerwy.
- Monitoring nieruchomości - System ma działać 24/7. Możemy zaplanować wcześniej okienka utrzymaniowe, ale najlepiej w godzinach dziennych.

### Bezpieczny

System musi być bezpieczny dla naszych klientów:

- Obracanie danymi medycznymi - Powinniśmy jak najbardziej zamknąć przetwarzanie danych medycznymi w niezależnym komponencie, aby uniknąć wycieku danych.
- Finanse i płatności - Poszczególne operacje płatnicze powinny być potwierdzane przez aplikację / SMSy aby uniknąć nieautoryzowanego dostępu.


### Łatwy w obsłudze

Nasz system musi być łatwy w obsłudze, bezproblemowy.

- E-commerce - Proces zakupowy nie powinien rozpraszać klientów, tak aby zmniejszyć liczbę niezakończonych zakupów.
- Administracja nieruchomościami - Nie chcemy, aby nasi administratorzy musieli przeklikiwać się przez kilka stron by zobaczyć podsumowanie danego budynku.

### Dużo / olbrzymi

Planujemy olbrzymi ruch na naszej stronie / dużą ilość klientów.

- Platforma B2B - 100 klientów dzienie, ale  zamówienia posiadające kilkaset / kilka tysięcy pozycji.
- 

### Wydajny

Chciałbym aby przyszłe rozwiązanie było bardziej wydajne niż obecne.

- Fabryka śrubek - Analiza danych z maszyny nie powinna zajmować całego dnia.
- 

### Skalowalny

Nasz system musi być skalowalny, aby odpowiadać na potrzeby klientów:

- Rower miejski - Gdy ludzie jadą do pracy jest wynajmowane 10x tyle rowerów ile w pozostałe godziny. 
- Analiza danych atmosferycznych - Nasze stacje monitorujące raz na godzinę wysyłają olbrzymie gigabajty danych, pomiędzy tymi okresami nic się nie dzieje.
- Sprzedaż biletów na koncerty - Gdy otwiera się sprzedaż na popularny koncert ruch potrafi być w granicach kilku tysięcy zapytań na sekundę. Nikt nie liczy, że uda się to obsłużyć, ale niech przynajmniej system nie upada.

## Pytanie na koniec

Jakie Ty znasz słowa pułapki? Jak one wpłynęły na twój projekt / produkt / system? Daj znać w komentarzach 😀