---
title: 'Genetyka a stabilność systemów informatycznych'
url: '/2020/11/25/miro-wprowadzenie-do-tablicy-wirtualnej/'
date: Wed, 25 Nov 2020 18:40:09 +0000
draft: true
images: ['2020/11/25/miro-wprowadzenie-do-tablicy-wirtualnej/miro-featured-image.jpg']
description: 'W ramach cyklu szkoleń "Poradnia Lidera" przeprowadziliśmy wprowadzenie do tablicy wirtualnej Miro.'
category: 'Różne'
tags: ['Miro']
---

Ten wpis jest krótki spostrzeżeniem po świetnej książce Dawida Myśliwca ["Przepis na człowieka"](https://lubimyczytac.pl/ksiazka/4917880/przepis-na-czlowieka-czyli-krotki-wstep-do-odpowiedzi-na-pytanie-dlaczego-jestesmy-jacy-jestesmy). Opisuje on w przystępny w jaki sposób geny wpływają na nasze życie, i jak to wszystko pod spodem działa.

Jest tam ciekawy fragment odnośnie kopiowania DNA, który może wydać Ci się interesujący kontekście stabilności systemów informatycznych.

// obrazek kopiowania DNA - https://courses.lumenlearning.com/ivytech-bio1-1/chapter/reading-major-enzymes/

Otóż podczas kopiowania DNA mogą zachodzić błędy i uzyskana kopia może nie być idealnie identyczna. Przynajmniej **raz na 10 mln par** element po drugiej stronie może się nie zgadzać z swoim bazowym kolegą. Jednak nie jest tak, że twój organizm zostawi nić DNA w takim stanie.

Istnieją dodatkowe mechanizmy naprawy źle sparowanych elementów (jak np. [MMR](https://en.wikipedia.org/wiki/DNA_mismatch_repair)), które pozwalają wyłapać błędy i je naprawić. Na tym etapie **99% błędów w twoim DNA zostanie wyłapane**. Koniec końców szacuje się, że pomyłki w wynikowym DNA nie zdarzają się częściej niż 1 na miliard. I tutaj przychodzi nam efekt skali...

Otóż podczas kopiowania pojedynczej komórki w twoim organizmie dochodzi do przynajmniej 2-3 mutacji (błędów kopiowania), które nie są naprawiane przez organizm. Samych czerwonych krwinek tworzy się u Ciebie od 173 miliardów do 259 mld dziennie ([źródło](https://www.healthline.com/health/number-of-cells-in-body#daily-production)). Efekt jest taki, że **w zasadzie wszystkie komórki zawierają mutacje**. I co najlepsze - dalej jesteś w stanie egzystować.

## Porównanie do systemów informatycznych
Możesz się teraz zastanowić co to ma wspólnego z systemami informatycznymi? Spójrz na z perspektywy SLA:

- Podstawowy proces kopiowania DNA ma "dostępność" na poziomie 99,9999%
- Przy skali działania błędy były zbyt częste
- Stworzony został dodatkowy mechanizm kontroli, który zwiększał "dostępność" na 99,9999999%
- To zaś nie dało rady wyeliminowało problemów - błędy dalej zachodzą
- Pomimo błędów, system (w znakomitej większości przypadków) dalej działa i jest w stanie odpowiadać

Taki "system" działa ponieważ **opiera się na bardzo zdroworozsądkowych założeniach**:
- nie da się stworzyć procesu, który będzie w 100% dobrze działający.
- dodatkowe procesy naprawiające błędy zwiększają szansę na uniknięcie problemów.
- dodatkowe procesy naprawiające błędy nie rozwiążą wszystkich sytuacji - **zawsze istnieje szansa na błędy**.
-  system nie powinien całkowicie przestawać działać gdy wystąpi błąd.

**I takie założenia warto przyjąć gdy tworzysz swoje systemy informatyczne.** - na przykładzie procesu zamówienia w sklepie:
- Proces zamówienia oprze się np. o kolejkę, której SLA jest na poziomie 99.99% - 1/10000 wiadomości się zgubi.
- Możesz dodać osobny proces, który będzie monitorować zamówienia i naprawi błąd gdy zamówienie gdzieś "utknie".
- To zaś nie uchroni Cię od błędów w samym "naprawiaczu" - podczas naprawiania proces może zostać "uśpiony" i błędne zamówienie zostanie pominięte.
- W takich sytuacjach zawsze warto zaplanować inne rozwiązanie problemu - np. twój klient może się z Tobą bezpośrednio skontaktować.

// w artykule pominąłem bardzo wiele elementów naszej biologii (jak np. niszczenie komórek), które pewnie byłyby ciekawe, ale utrudniłyby odbiór artykułu