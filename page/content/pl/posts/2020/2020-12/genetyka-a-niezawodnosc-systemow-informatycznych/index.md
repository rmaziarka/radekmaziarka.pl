---
title: 'Genetyka a niezawodność systemów informatycznych'
url: '/2020/12/08/genetyka-a-niezawodność-systemow-informatycznych/'
date: Tue, 08 Dec 2020 18:40:09 +0000
draft: true
images: ['2020/12/08/genetyka-a-niezawodnosc-systemow-informatycznych/dna.jpg']
description: 'W jaki sposób można usprawnić stabilność systemów informatycznych? Odpowiedź tkwi w genach...'
category: 'Różne'
tags: ['Fault tolerance']
---

Ten wpis jest krótki spostrzeżeniem po świetnej książce Dawida Myśliwca ["Przepis na człowieka"](https://lubimyczytac.pl/ksiazka/4917880/przepis-na-czlowieka-czyli-krotki-wstep-do-odpowiedzi-na-pytanie-dlaczego-jestesmy-jacy-jestesmy). Opisuje on w przystępny w jaki sposób geny wpływają na nasze życie, i jak to wszystko pod spodem działa.

Jest tam ciekawy fragment o **procesie kopiowania DNA**, który może wydać Ci się interesujący kontekście stabilności systemów informatycznych.

[![](https://upload.wikimedia.org/wikipedia/commons/3/33/DNA_replication_split_horizontal.svg)](https://upload.wikimedia.org/wikipedia/commons/3/33/DNA_replication_split_horizontal.svg)

*By Madprime(wikipedia) ([DNA replication split horizontal](https://commons.wikimedia.org/wiki/File:DNA_replication_split_horizontal.svg?uselang=en)) CC BY-SA 2.0*

Otóż podczas kopiowania nici DNA zachodzą błędy na pojedynczych elementach (nukleotydach) i uzyskana kopia nie jest idealnie identyczna. Przynajmniej **raz na 10 mln par** element skopiowany może się nie zgadzać z swoim bazowym kolegą. Jednak nie jest tak, że twój organizm zostawi nić DNA w takim stanie.

Posiadasz dodatkowe mechanizmy naprawy nieprawidłowo skopiowanych elementów (jak np. [MMR](https://en.wikipedia.org/wiki/DNA_mismatch_repair)), które pozwalają wyłapać błędy i je naprawić. Na tym etapie **99% błędów w nowym DNA zostanie wyłapane**. Koniec końców szacuje się, że pomyłki w nie zdarzają się częściej niż 1 na miliard. I tutaj przychodzi nam efekt skali...

Otóż podczas kopiowania pojedynczej komórki w twoim organizmie dochodzi do przynajmniej 2-3 mutacji - nienaprawionych błędów kopiowania. Samych czerwonych krwinek tworzysz od 173 miliardów do 259 mld dziennie ([źródło](https://www.healthline.com/health/number-of-cells-in-body#daily-production)). Efekt jest taki, że **w zasadzie wszystkie twoje komórki zawierają mutacje**. I co najlepsze - dalej jesteś w stanie egzystować. Organizm toleruje błędy i działa pomimo ich występowania.

## Porównanie do systemów informatycznych
Możesz się teraz zastanowić co to ma wspólnego z systemem informatycznym? Spójrz na to z perspektywy SLA - **niezawodności pracy organizmu przy kopiowaniu DNA**:

- Podstawowy proces ma "niezawodność" na poziomie 99,9999%.
- Przy skali działania błędy były zbyt częste.
- Stworzony został dodatkowy mechanizm kontroli, który zwiększał "niezawodność" do 99,9999999%.
- To zaś nie dało rady wyeliminowało problemów - błędy dalej zachodzą.
- Pomimo błędów, organizm (w znakomitej większości przypadków) dalej działa.

Taki "system" działa ponieważ **opiera się na bardzo zdroworozsądkowych założeniach**:
- Stworzenie bardzo niezawodnego procesu jest skomplikowane i zwykle nieopłacalne.
- Dodatkowe procesy naprawiające błędy są tańszą metodą by zwiększyć ogólną niezawodność.
- Dodatkowe procesy naprawiające błędy nie rozwiążą wszystkich problemów - **zawsze istnieje szansa, że błąd się prześlizgnie**.
-  System nie powinien całkowicie przestawać działać gdy wystąpi błąd.

**I takie założenia warto przyjąć gdy tworzysz swój system informatyczny** - na przykładzie procesu zamówienia w sklepie:
- Proces zamówienia oprze się np. o kolejkę, której SLA jest na poziomie 99.99% - 1/10000 wiadomości się zgubi.
- Możesz dodać osobny proces, który będzie monitorować zamówienia i naprawi błąd gdy zamówienie gdzieś "utknie".
- To zaś nie uchroni Cię od błędów w samym "naprawiaczu" - np. podczas naprawiania proces może natrafić na nietypową wiadomość, która będzie nienaprawialna.
- W takich sytuacjach trzeba zadbać by ta sytuacja nie zablokowała pracy reszty systemy - błędną wiadomość lepiej pominąć i np. wrzucić na dead-letter queue niż bez przerwy ponawiać przetwarzanie. 

Ogólne wrażenie jest takie, że warto czytać książki spoza IT by zauważać więcej w IT 😉

*W artykule pominąłem bardzo wiele elementów genetyki, które może i pasowałyby do artykuły (np. niszczenie komórek jako metafora ubijania niedziałających podów w Kubernetesie), ale utrudniłyby ogólny odbiór artykułu. Less is more.*