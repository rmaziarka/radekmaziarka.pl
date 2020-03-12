---
title: 'Moduły jako działy w firmie'
slug: '/2018/10/19/moduly-jako-dzialy-w-firmie/'
date: Fri, 19 Oct 2018 10:26:15 +0000
draft: false
featured_image: 'images/2018/10/calculator-385506_1920.jpg'
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

Jak wytłumaczyć w prosty sposób czym są moduły w oprogramowaniu? Tworząc prezentację na [Kariera IT](https://careercon.pl/konferencja/kariera-it-wroclaw-06-10-2018/) wpadłem na ciekawe porównanie modułów  do działów firmy.

Załóżmy, że dostałeś podwyżkę. Podpisujesz aneks do umowy i następnie masz zanieść ten dokument do działu finansów.

**Z zewnątrz, jako pracownik (jako użytkownik modułu):**

 *   nikt Ci nie pozwoli samemu zmienić sobie informacji o pensji (brak możliwości modyfikacji bazy danych spoza modułu)
 *   nie masz również zielonego pojęcia w jaki sposób składowane są dane o Tobie (brak wiedzy o strukturze wewnętrznej modułu)
 *   na straży działu stoi pani Krysia (określone API)
 *   do niej składa się podpisany aneks umowy z podwyżką (żądanie HTTP do modułu)
 *   pani Krysia mówi że przyjęła aneks (odpowiedź HTTP 200 OK)
 *   po miesiącu pracy dostajesz wyższe wynagrodzenie (wiadomość asynchroniczna otrzymana z modułu)

**Z wewnątrz, jako dział finansów (konkretny moduł):**

 *   masz panią Krysię odpowiedzialną za kontakt z petentami (określone API)
 *   po złożeniu aneksu osoby z działu analizują umowę (wewnętrzna logika biznesowa)
 *   w następstwie pani Ania, główna księgowa, podwyższa pensję w systemie (aktualizacja bazy danych)
 *   gdy mija miesiąc to Ania wysyła odpowiednio wyższe wynagrodzenie (wiadomość asynchroniczna wysłana z modułu)

I teraz hipotetyczna sytuacja – chcemy zmienić system finansowy na inny. Z punktu widzenia pracownika to jego proces aktualizacji wartości pensji się nie zmieni. Zostanie zmieniony jedynie wewnętrzny sposób działania działu finansów. Pracownik będzie nieświadomy tych zmian – dla niego ważny jest rezultat końcowy.

Identycznie powinny działać nasze moduły. **Nie powinniśmy narzucać użytkownikom naszego modułu znajomości wewnętrznych detali** – oni nie są tym zainteresowani. Chcą z nami kontaktować się na pewnym poziomie abstrakcji, który pozwoli im jasne wykonywanie żądań i uzyskiwanie rezultatów.

Więcej o samych modułach w oprogramowaniu możecie przeczytać w moim cyklu o [Bounded Contextach ](https://radblog.pl/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/)🙂

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Moduly-jako-dzialy-w-firmie-Radek-Maziarka "") - <time datetime="2018-10-19 18:57:04">Oct 5, 2018</time>

**Moduły jako działy w firmie | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
