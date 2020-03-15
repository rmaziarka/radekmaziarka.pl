---
title: 'Dlaczego Bounded Contexty są ważne – produkty pojedyńcze i produkty grupowe'
slug: '/2018/09/17/dlaczego-bounded-contexty-sa-wazne-przyklad-2/'
date: Mon, 17 Sep 2018 18:49:32 +0000
draft: false
featured_image: 'images/2018/07/private-1665019_960_720.jpg'
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

 // wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/).

Po poprzednich, bardziej teoretycznych postach, nadszedł czas, by przejść do praktyki. W kilku następnych wpisach pokażę problemy, jakie powstały przez brak wydzielonych kontekstów w aplikacji.

Wszystkie przytoczone przeze mnie przypadki braku kontekstów są realnymi przypadkami. Jedynie domena biznesowa została zmieniona na systemy zakupowe.

Sytuacja biznesowa
------------------

Firma posiada dział administracji, który definiuje jakimi produktami obraca firma. Ustalają parametry, gabaryty, ilość.

Następnie istnieje kilka rodzajów klientów, którzy mogą rezerwować te towary, dokonywać zakupów, odsprzedawać produkty dalej (w formie partnerstwa), organizować transport. Możliwości wykorzystania tych produktów jest bardzo dużo.

Firma chciałaby, by dział administracji mógł w aplikacji zarządzać produktami, a klienci mogli dokonywać swoich transakcji.

Rozwiązanie techniczne
----------------------

Aplikacja powstała i podejmuje wszystkie opisane powyżej wymagania biznesowe. Administratorzy mają swoją część systemu, gdzie definiują produkty. Następnie klienci, w swojej części systemu, dokonują transakcji operując na tych produktach.

Niskopoziomowo, obie części korzystają z tego samego zbioru danych – modelu Product. Te informacje są wykorzystywane we wszystkich podstronach tworzenia rezerwacji, podsumowaniach transakcji itd. Produkt był tam widoczny jako miniaturka zdjęcia, nazwa, cena, krótki opis i odnośnik do strony produktu.

Zmiana biznesowa
----------------

Czym byłoby życie bez zmiany? Dział administracji potrzebował stworzyć produkty grupowe – agregujące pozostałe produkty. Czyli możemy stworzyć osobny produkt z własnym opisem, ceną i zdjęciem, który zawiera w sobie kilka innych produktów. Z poziomu takiego produktu zgrupowanego możemy zarządzać wewnętrzną listą produktów – dodawać je i usuwać. Taki produkt zgrupowany będzie miał również kilka własnych pól.

W części klienckiej produkt zgrupowany nie byłby jednak rozróżnialny od zwykłego produktu. Wszystkie widoki takiego produktu, używane na rezerwacjach i podsumowaniach, dalej miałyby taki sam kształt i informacje.

Jedyna różnica w części klienckiej leżała w zakupie produktu zgrupowanego – po jego zakupie powinna się zmniejszyć ilość wszystkich produktów wewnątrz grupy.

Problem
-------

Tylko jak to teraz zamodelować? Część osób pracująca nad częścią administratorską chciała stworzyć sobie odpowiednią strukturę, która dobrze odwzorowywałaby rzeczywistość. Mielibyśmy model GroupedProduct, który linkowałby do wszystkich pozostałych produktów.

Niestety programiści części klienckiej zaprotestowali – dla nich zmiana takiego modelu wymusiłaby bardzo duże zmiany w ich części aplikacji. Nagle musieliby w każdym miejscu, w którym używali modelu Product używać naprzemiennie modeli Product i GroupedProduct. Czyli dodaliby logikę na każdym jednym wykorzystaniu produktu przez klienta.

Rezultat
--------

Ostatecznie silniejszy okazał się dział kliencki – stamtąd pochodziły pieniądze. Narzucili oni części administratorskiej zmiany, które nie spowodowałyby tyle problemów w części klienckiej.

Na poziomie modelu dodano nadmiarowe pola do modelu Product, które były planowane dla produktów zgrupowanych. Dodatkowo do produktu dodano relację Parent-Child, co jeszcze bardziej skomplikowało dany model.

Długoterminowo, po kilku dalszych zmianach w produktach zwykłych i zgrupowanych, model Product bardzo się rozrósł. Zawiera różne pola niezwiązane dokładnie z samym produktem, a jedynie z jego różnymi konfiguracjami. Odczytanie i zrozumienie czym aktualnie jest dana informacja, jest skomplikowane i wymaga zagłębienia się w strukturę bazy danych i kod aplikacji.

Takie rozwiązanie spowodowało, że rozwijanie aplikacji jest bardzo problematyczne. Każdy z działów musi brać pod uwagę, że modyfikacja struktury produktu może spowodować błędy w praktycznie całej aplikacji. Nikt nie może być pewny stabilności systemu po dokonaniu zmian. Sam biznes jest niezadowolony, że dodanie nowych, teoretycznie prostych funkcjonalności, jest błędogenne.

Bounded contexts
----------------

Główny problem leży w rozumieniu czym jest produkt – **dla działów administracji i klientów to nie są te same rodzaje produktów**. Spełniają różne funkcje, mają inne cele, inaczej się o nich rozmawia i myśli. Przez co też potrzebują innych modeli, by móc realizować te cele. Rozwiązaniem powyższego problemu byłoby stworzenie oddzielnych kontekstów dla działu administracji i klientów.

Dział administracji posiadałby własny model produktów, dostosowany do ich potrzeb. Następnie dział klientów pobierałby dane o produktach przez ogólnodostępne API i na ich podstawie budował własny model produktów. Sam zakup odbywałby się jednak już po stronie administracji, by mieć pewność, że nie sprzedajemy towarów poniżej ich stanów.

[![](/images/2018/09/POWERPNT_2018-09-17_21-33-09.png)](/images/2018/09/POWERPNT_2018-09-17_21-33-09.png)

Jeśli pojawiłyby się jakieś zmiany w dziale administracji to zadaniem programistów byłaby taka praca, by nie naruszyć stworzonego już API. Ale wewnętrznie mogliby wypracowywać rozwiązanie, które jest dla nich najbardziej optymalne.

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Dlaczego-Bounded-Contexty-sa-wazne-przyklad-2-Radek-Maziarka "") - <time datetime="2018-09-18 08:21:52">Sep 2, 2018</time>

**Dlaczego Bounded Contexty są ważne – przykład 2 | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
