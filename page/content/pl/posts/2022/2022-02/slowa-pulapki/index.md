---
title: "Uważaj na słowa pułapki"
date: 2022-02-21T09:59:30+01:00
draft: 
url: '/2022/02/21/uwazaj-na-slowa-pulapki'
images: ['2022/02/21/uwazaj-na-slowa-pulapki/mouse-trap.jpg']
description: "Słowa pułapki to określenia, które wydają się, że prowadzą nas do rozwiązania. W rzeczywistości jednak utrudniają nam zrozumienie problemu."
category: 'Biznes w IT'
---

Podstawą komunikacji jest, że jedna i druga strona muszą używać wspólnego języka. Jeśli ja mówię po polsku, a mój klient po angielsku, to z oczywistych względów się nie dogadamy. Jednak sam fakt rozmawiania po polsku nie sprawi, że się dogadamy 😉

## Natychmiast

Załóżmy, że mamy taką sytuację:

- Tworzymy dla klienta platformę do sprzedaży nieruchomości. W tej platformie ma być bardzo funkcjonalna wyszukiwarka - klienci mogą wyszukać nieruchomość po dowolnych parametrach.
- Dodatkowo klient chce jednak umożliwić swoim menadżerom zmiany cen nieruchomości, gdy dana nieruchomość jest już na stronie.
- Zastanawiamy sie, w jaki sposób tego dokonać. Dobrym pomysłem jest, aby dla strony ofertowej wykorzystać osobną bazę, skoncentrowaną na szybkim wyszukiwaniu treści.
- To jednak może spowodować problem braku spójności - gdy manager zapisze zmiany, to najpierw pojawią się one w bazie głównej, a później w tej do wyszukiwania. Pomiędzy synchronizacją danych stan systemu będzie "niespójny" - możemy widzieć stare dane.
- **Pytamy się więc "Czy po zmianie cen powinny być one natychmiast widoczne na stronie ofertowej?"**
- Klient odpowiada, że tak. Wobec czego zostaje nam kombinowanie jak to zrobić w jednej bazie. Ale czy na pewno?

Słowo "natychmiast" jest tutaj słowem pułapką. **Dla różnych grup osób słowo "natychmiast" będzie miało inne znaczenie**:

- Osoby techniczne - spójność na poziomie systemu, tak aby nie było niespójności pomiędzy bazami.
- Menadżer nieruchomości - aby nie musiał czekać całego dnia by zobaczyć zmiany. Wystarczy, że dane będą widoczne, gdy wróci z kawą z kuchni.

## Słowa pułapki


[![](trap-box.jpg)](trap-box.jpg)

Sam fakt posługiwania się tymi samymi słowami, nie oznacza, że rozumiemy je w ten sam sposób. Szczególnie jeśli używamy słów, które nie mają stricte ilościowego odwzorowania. **Takie słowa mają dokładne znaczenie tylko w konkretnym obszarze (biznesowym).** "Natychmiast" dla [Handlu wysokich częstotliwości](https://pl.wikipedia.org/wiki/Handel_wysokich_cz%C4%99stotliwo%C5%9Bci) będzie czymś zdecydowanie innym niż dla branż, gdzie czas nie jest tak kluczowy.

Wobec czego, jeśli wykorzystujemy takie niejasne słownictwo w naszych rozmowach to naturalnie jesteśmy narażeni na problemy. **Wpadamy w pułapkę, którą zastawiliśmy sami na siebie.** Zadajemy pytanie, otrzymujemy odpowiedź, ale ona wcale nie przybliża nas do lepszego zrozumienia problemu. Wręcz przeciwnie - oddala nas od realizacji celu.

Dlatego też zwracaj uwagę na dokładność swojego słownictwa. Jeśli słyszysz niejasne słowa od swoich rozmówców to dopytuj o ich właściwe znaczenie. Pytaj o liczby, przypadki, scenariusze, konkretne sytuacje. Pozwoli to uniknąć przykrych rozmów, gdy przyjdzie do wdrażania docelowego rozwiązania.

## Inne słowa pułapki

Poniżej możesz przeczytać przykłady innych słów pułapek, wraz z ich różnym rozumieniem dla poszczególnych obszarów biznesowych.

### Dostępny

System ma być szeroko dostępny dla naszych użytkowników:

- Środowiska korporacyjne - Od 6 do 21, w dni powszednie. W innych godzinach problemy z dostępnością są akceptowalne.
- Rejestracja na studia - Od czerwca do października w każdych godzinach. Później mogą być dłuższe przerwy.
- Monitoring nieruchomości - System ma działać 24/7. Możemy zaplanować wcześniej okienka utrzymaniowe, ale najlepiej w godzinach dziennych.

### Bezpieczny

Bezpieczny - to jest słowo, które powinno określać nasz system:

- Finanse i płatności - Poszczególne operacje płatnicze powinny być potwierdzane przez aplikację / SMS-y, aby uniknąć nieautoryzowanego dostępu.
- Produkcja jedzenia dla dzieci - Musimy móc wyśledzić pochodzenie każdej partii produktu w przypadku zatrucia się dziecka.
- Oprogramowanie medyczne - System musi gwarantować, że maszyna zaaplikuje pacjentowi odpowiednią dawkę leku.

### Łatwy w obsłudze

Nasz system musi być łatwy w obsłudze, bezproblemowy.

- E-commerce - Proces zakupowy nie powinien rozpraszać klientów, tak aby zmniejszyć liczbę niezakończonych zakupów.
- Administracja nieruchomościami - Nie chcemy, aby nasi administratorzy musieli przeklikiwać się przez kilka stron by zobaczyć podsumowanie danego budynku.
- Zarządzanie produktami - Chcę mieć możliwość zmiany wszystkiego we wszystkim; nie chcę, aby system mnie ograniczał.

### Dużo / olbrzymi

Planujemy olbrzymi ruch w naszym systemie / dużą liczbę klientów.

- IoT urządzeń domowych - posiadamy kilkaset tysięcy małych urządzeń, z których każde wysyła po kilka KB danych na godzinę. 
- Platforma B2B - Mamy 100 klientów dziennie, ale zamówienia posiadające kilkaset / kilka tysięcy pozycji.
- Zamówienia w restauracjach - Gdy nadchodzi pora lunchu na naszą stronę wchodzi kilkaset tysięcy ludzi.

### Skalowalny

Nasz system musi być skalowalny, aby odpowiadać na potrzeby klientów:

- Rower miejski - Gdy ludzie jadą do pracy jest wynajmowane 10x tyle rowerów, ile w pozostałe godziny. 
- Analiza danych atmosferycznych - Nasze stacje monitorujące raz na godzinę wysyłają olbrzymie gigabajty danych, pomiędzy tymi okresami nic się nie dzieje.
- Sprzedaż biletów na koncerty - Gdy otwiera się sprzedaż na popularny koncert ruch potrafi być w granicach kilku tysięcy zapytań na sekundę. Nikt nie liczy, że uda się to obsłużyć, ale niech przynajmniej system nie upada.

## Pytanie na koniec


[![](question-mark.jpg)](question-mark.jpg)

Jakie Ty znasz słowa pułapki? Jak one wpłynęły na twój projekt / produkt / system? Daj znać w komentarzach 😀