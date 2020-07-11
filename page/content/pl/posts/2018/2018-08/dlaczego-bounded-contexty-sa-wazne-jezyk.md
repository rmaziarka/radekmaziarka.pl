---
title: 'Dlaczego Bounded Contexty są ważne – język'
url: '/2018/08/20/dlaczego-bounded-contexty-sa-wazne-jezyk/'
date: Mon, 20 Aug 2018 21:11:54 +0000
draft: false
images: ['images/2018/07/private-1665019_960_720.jpg']
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

 // wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/).

Mając już bazowe pojęcie, czym są konteksty i jak je zaimplementować warto pochylić się jeszcze nad jedną kwestią - języka używanego w danym kontekście. Na pierwszy rzut oka wydaje się to dziwnym pomysłem. Jednak, gdy zaczniemy implementować nasze konteksty, to nagle język może się stać dużą przeszkodą...

## **W czym problem?**

Załóżmy, że nasz system przetrzymuje dane odnośnie klienta kupującego produkty. Są one używane przez dział zamówień i dla nich napisaliśmy osobny kontekst, który gromadzi te dane. Następnie dział dostaw prosi, by dodać nowy moduł, który realizowałby wysyłkę towarów do odbiorców. Realizujemy tę prośbę tworząc listy klientów i produktów, które do nich wysyłamy. I nagle pojawia się problem:

"Czym jest niby ten klient, co go dodałeś do naszego modułu? Po co on ma jakieś dane płatności? W ogóle jak mamy wysłać mu te produkty, skoro kody towarów się nie zgadzają?" Niestety – to właśnie sygnał, że zderzyłeś się z barierą językową.

## **Ubiquitous** **Language**

Ubiquitous Language to zwrot wprowadzony w książce [Domain Driven Design](https://www.amazon.com/gp/product/0321125215?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0321125215) Erica Evansa. Na język polski jest tłumaczony różnie - [wspólny język](https://dddunveiled.wordpress.com/2016/03/29/ubiquitous-language-czyli-dlaczego-nie-lubie-kubusia-puchatka/), [wszechobecny język](https://sprawnainzynieriaoprogramowania.blogspot.com/2008/10/najpierw-dziedzina.html), [wszędobylski język](https://bottega.com.pl/pdf/materialy/sdj-ddd.pdf). Oznacza nacisk na używanie języka domenowego (problemu, który rozwiązujemy) w pracy z ekspertem domenowym oraz wewnątrz zespołu.

Używanie języka wewnątrz zespołu oznacza nie tylko używanie go w rozmowach, ale także wdrażanie tych nazw i wyrażeń do swojego kodu. Jest to ważne, by nie musieć za każdym razem tłumaczyć ich sobie w głowie. Takie tłumaczenia utrudniają skupienie się na logice biznesowej i dodają dodatkową warstwę złożoności do naszej aplikacji.

Na przykład, w kontekście zamówień mamy klienta, który posiada dane płatności. W naszym systemie nazwaliśmy go jednak jako **User** i **UserData**. Czytając później nasz kod będziemy musieli cały czas mieć w tyle głowy, że te 2 obiekty są w rzeczywistości naszym klientem i jego danymi płatności. O ile łatwiej byłoby mieć te informacje trzymane jako **Customer** I **CustomerPaymentInfo**?

Takie działania pozwalają lepiej rozumieć potrzeby i na nie reagować.

## **Bounded Contexty**

Jednak samo wykorzystywanie języka domenowego nie wystarcza. Okazuje się bowiem, że osoby np. z różnych działów będą się posługiwały różnym językiem, wskazując na “w teorii” te same rzeczy. **Zwroty, wyrażenia, słowa, slogany będą różne, bo różne jest postrzeganie tego, na co te wyrazy wskazują.** Osoby te mają inne potrzeby, przez co ich słownictwo jest inne.

To jest równocześnie bardzo silnym wyznacznikiem, że mamy do czynienia z różnymi problemami, a więc musimy tutaj zastosować inne rozwiązanie – konteksty. Bez takiego podziału nasza aplikacja będzie się starała posługiwać się naraz dwoma językami. A to będzie powodowało zamieszanie i zwiększy szansę na pojawienie się błędów.

Wracając do naszego przypadku sklepu internetowego. Pracownicy różnych działów mają inne wymagania i inaczej postrzegają to, co jest dla nich ważne. Przez to używają innego słownictwa:

 *   Zamówienia - klient (płatność) i produkty (cena)
 *   Dostawy - odbiorca (miejsce odbioru) i towary (gabaryty)

Chcąc te różnice poprawnie odwzorować w aplikacji trzeba się posłużyć tłumaczeniem zwrotów pomiędzy kontekstami. Np. przechodząc z kontekstu zamówień do kontekstu dostaw będziemy musieli przetłumaczyć obiekt **Customer** na **Recipient** i dodać odpowiedni adres dostawy – **RecipientAddress**. Dzięki temu w kontekście dostaw będziemy używali żargonu osób, które odpowiadają za dostarczanie towarów klientowi.

## **Dwa słowa o podstawach psychologicznych**

Ubiquituous Language ma bardzo duże poparcie w psychologii. Jest to dość szeroki temat, który dokładniej opiszę w osobnym poście, jednak sądzę, że warto tutaj o tym przynajmniej wspomnieć.

**Język bezpośrednio wpływa na sposób odbierania rzeczywistości, jaką widzimy.** Każde słowo ma dla nas konkretną wizualizację i elementy, do których pasuje. Używanie podobnego słownictwa może dla nas nie być problemem, ale dla osób niebędących z naszego kręgu kulturowego, te słowa mogą znaczyć coś kompletnie innego. Można o tym poczytać więcej na Wikipedii pod [Relatywizm językowy](https://pl.wikipedia.org/wiki/Hipoteza_Sapira-Whorfa).

## **Podsumowanie**

Posługiwanie się językiem domenowym sprawia, że łatwiej będzie nam znajdować błędy w naszym zrozumieniu potrzeb biznesowych i w naszym kodzie. Nie będziemy musieli się męczyć z tłumaczeniami zwrotów dwóch różnych kontekstów. Dodatkowo, nie będziemy używali innych zwrotów w aplikacji, a innych z klientem – wszystko będzie spójną logiką biznesową. Już w 2014 mówił o tym Sławek Sobótka w [Nie koduj, pisz prozę](https://www.youtube.com/watch?v=CKONKZLmMwk). **Dlatego tak ważne jest używanie w kontekstach języka dostosowanego do rozwiązywanego problemu.**

Dodatkowo, mając już odpowiednią płynność w potrzebach biznesowych, łatwiej nam będzie proponować prostsze rozwiązania, dodatkowe funkcjonalności albo inne obejścia problemów. Będziemy widzieć dodatkowe możliwości implementacji logiki biznesowej wewnątrz naszego kodu, odpowiednio rozumiejąc aktualną logikę biznesowa.

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Dlaczego-Bounded-Contexty-sa-wazne-jezyk-Radek-Maziarka "") - <time datetime="2018-08-20 22:19:19">Aug 1, 2018</time>

**Dlaczego Bounded Contexty są ważne – język | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
