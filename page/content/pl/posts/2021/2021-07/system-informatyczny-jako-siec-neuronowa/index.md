---
title: "System informatyczny jako układ nerwowy"
date: Fri, 02 Jun 2021 09:40:09 +0000
url: '/2021/07/02/system-informatyczny-jako-uklad-nerwowy'
images: ['2021/07/02/system-informatyczny-jako-uklad-nerwowy/neural-system.jpg']
description: "Czyli dlaczego systemy informatyczne są skomplikowane w budowie"
category: 'Biznes w IT'
tags: ['System nerwowy']
draft: true
---
Wiele napisano o tym dlaczego systemy informatyczne są trudne w budowie i utrzymaniu. Pozwólcie dołożyć do tego kilka słów ode mnie 😀 W mojej ocenie **ten problem wynika ze złej metafory**, jaką wykorzystujemy myśląc o systemach informatycznych.

// grafika mebla z ikei

Dla wielu osób system informatyczny to coś na kształt mebla z Ikei. Na początku dostajemy gotową paczkę elementów wraz z instrukcją. Składamy je razem i mamy system (plus kilka nadmiarowych śróbek 😉). Niestety tworzenie systemu informatycznego jest kompletnie przeciwne.

## Układ nerwowy

System informatyczny, jak wskazuje sama nazwa, operuje na informacjach. To znaczy, że to co płynie przez system informatyczny to są pojedyncze porcje informacji. Wygląda to np. tak:

- Klient wpisuje zamówienie do systemu, 
- system przerabia zamówienie na listę produktów do realizacji, 
- na końcu dostawca widzi tą listę na ekranie i wie co ma kompletować

Informacje są wkładane, transformowane, grupowane. Jest jakaś baza danych, gdzie informacje są trzymane, miejsca wyjścia i wejścia.

// grafika z porównaniem układu nerwowego i systemu informatycznego

Możesz to porównać do tego w jaki sposób informacje są transportowane przez nasze ciało - w układzie nerwowym :

- Receptory skóry odbierają informację, że temperatura się obniża,
- przesyłają tą informację do mózgu, który interpretuje to jako akcję do założenia dodatkowej odzieży
- ręce dostają informację, że powinny założyć ciepłą bluzę (prez głowę!)

W naszym ciele mamy centralne miejsce gromadzenia i analizy informacji, różne receptory zbierające i reagujące na informacje oraz nerwy które te informacje przesyłają dalej.

A teraz rzecz najważniejsza.

## Środowisko a układ nerwowy
// czy mozna tutaj miec lepszy tytul - bardziej chwytliwy?

// obrazek prezentujacy wplyw na system i na uklad nerwowy

Układ nerwowy bazuje na możliwościach i funkcjach danego gatunku. Te zaś bazują na otoczeniu, w którym się ten gatunek rozwija. Analogicznie jest z systemem informatycznym: mamy system informatyczny, który bazuje na funkcjach firmy, które bazują na jej otoczeniu biznesowym. Jeśli zaś porównamy dwa różne gatunki, żyjące w różnych otoczeniach to różni się praktycznie wszystko:

- od tego jak mózg jest zbudowany i zarządza systemem nerwowym,
- przez to w jaki sposób nerwy transportują informacje, 
- po możliwości organów odbierających sygnały nerwowe. 
 
Nawet w przypadku tego samego gatunku różnice mogą być duże.

## Dlaczego nie ma ludzi z nosami psów?

Weźmy na tapet najlepszego przyjaciela człowieka - psa. Pies posiada o wiele bardziej wyczulony węch niż człowiek. Jest to spowodowane nie tylko posiadaniem lepszego narzędu węchu, ale przede wszystkim bogatszą możliwością obróbki tych informacji przez mózg. Mózg rozpoznaje dziesiątki różnych bodźców z nosa i na ich podstawie wie jak zareagować. Funkcje nerwowe są przystosowane do możliwości i potrzeb psiego gatunku. To też uniemożliwia przenoszenie tych funkcji na inne gatunki.

Otóż aby człowiek mógł posiadać możliwości węchowe psa nie wystarczy mu tylko przestrzepić nosa. Potrzebujemy przeorganizować cały system nerwowy dotyczący węchu. Nerwy połączone do nosa musiałyby być dostosowane do większej ilości odbieranych bodźców, a mózg trzeba by nauczyć je interpretować. Co jest z obecnymi możliwościami bioinżynieryjnymi niemożliwe. I wyjaśnia dlaczego do tej pory do wykrywania narkotyków nie stosuje się ludzi z nosami psów

Niestety ale tworzenie systemu informatycznego to zawsze jest dopasowywanie komponentów informatycznych do innej dziedziny biznesowej. Wobec czego mamy inne cele, inne problemy a więc inne potrzeby przetwarzanie informacji kropka związku z czym sam system informatyczny mocno się różni. Nawet jeśli część informacji nie jest w systemie informatycznym to jej przetwarzaniem przenoszeniem dalej zajmuje się interfejs białkowy.

## Integracje

Kilka tygodni temu pojawił się świetny artykuł Martina Fowlera:
https://martinfowler.com/articles/cant-buy-integration.html
// czy mozna wrzucic miniaturkę?

Ciekawie też wygląda kwestia wykorzystywanie gotowych komponentów systemów informatycznych. W teorii jesteśmy w stanie wykorzystać na przykład bramkę strajk do zakupów. Jednak wiadomo że nie jest to operacja w stylu klik i gotowe tylko trzeba wykonać dodatkową pracę na podłączenie jej. Jest to podobne do tego w jaki sposób chcielibyśmy podłączyć rękę po jej odcięciu do właściwego ciała. Jak ktoś oglądał takie operacje to wie że najtrudniejszą rzeczą jest połączenie nerwów pauza aby informacje dobrze szły od mózgu do ręki. I tutaj jest największe wyzwania by to zrobić dobrze
