---
title: 'Boiling Frogs 2018 - gotowanie żaby po raz trzeci'
url: '/2018/03/26/boiling-frogs-2018-gotowanie-zaby-po-raz-trzeci/'
date: Mon, 26 Mar 2018 19:57:13 +0000
draft: false
images: ['images/2018/03/boilingfrog_logo_rgb.png']
description: "Zobacz dlaczego Boiling Frogs jest przez niektórych nazywane najlepszą konferencją w Polsce."
category: 'Recenzja'
tags: ['']
---

Po raz 3. spotkaliśmy się we Wrocławiu, by posłuchać najlepszych prelegentów z naszej branży na konferencji Boiling Frogs. Konferencji, która jest z nami od niedawna, ale od razu wzbudziła bardzo duży posłuch w środowisku programistycznym. Mogę ze szczerego serca powiedzieć, że tegoroczne wydarzenie było tak samo dobre jak poprzednie - a poprzednie było na najwyższym poziomie. Tematy, prelegenci, networking - wszystko zagrało koncertowo!

## Tomasz Kaczmarzyk - Wstęp

[![](/images/2018/03/DZCkUxuXkAABvgL-1.jpg "by Łukasz Dziedziul | https://twitter.com/ldziedziul/status/977461830246428673")](/images/2018/03/DZCkUxuXkAABvgL-1.jpg)

[Tomasz](https://twitter.com/tkaczmarzyk), jak co roku, w świetny sposób powitał gości. Muszę przyznać, że to sztuka - kolejny raz opowiadać o motywie [gotowania żab](https://krokdozdrowia.com/syndrom-gotujacej-sie-zaby-takiego/) i robić to w sposób interesujący. Opisywał brak rozwoju jako przyczynę przyszłych problemów i motywował uczestników do ciągłego dbania o własny rozwój. Bardzo trafił do mnie obrazek przedstawiający koło upadku oprogramowania - brak odpowiedzialności napędza brak zrozumienia, utratę jakości i w rezultacie problemy z utrzymywanym systemem.

## Mariusz Gil - Discovering unknown domain with Event Storming

[![](/images/2018/03/DZCqq38WAAU82hJ.jpg "by Robert Podsiadły | https://twitter.com/robert59p/status/97746879218292326")](/images/2018/03/DZCqq38WAAU82hJ.jpg)

To była prezentacja na którą najbardziej czekałem. I się opłaciło. W zasadzie, jakbym musiał po tej prezentacji opuścić konferencję to i tak byłbym szczęśliwy. [Mariusz](https://twitter.com/mariuszgil) w przystępny sposób wytłumaczył koncepcję [Event Stormingu](https://en.wikipedia.org/wiki/Event_storming), o której czytałem i słuchałem od dawna. Koncepcję, która łączy tzw. "biznes" ze światem programistycznym, pozwala wspólnie ugruntować wiedzę na temat projektu i pomóc dostarczyć go w takiej postaci, jakiej klient potrzebuje. Mariusz podrzucił nawet ciekawą historię użycia Event Stormingu w pracy z klientem - po jej zastosowaniu projekt został zatrzymany, ponieważ uświadomiono sobie jak bardzo realne potrzeby różnią się od planowanego oprogramowania. Prezentację Mariusza, powinni obejrzeć wszyscy, którzy współpracują z klientem.

Z Mariuszem porozmawiałem później jak ten koncept przekazać dalej - już od dawna nosiłem się z zamiarem Lightning Talka o ES i ta prezentacja dała mi moc argumentów.

## Jakub Kubryński - Engineering architecture

[![](/images/2018/03/DZC6G-HXkAALv9E.jpg "by Adam Wiciak | https://twitter.com/adwiciak/status/977485761619644417")](/images/2018/03/DZC6G-HXkAALv9E.jpg)

Kolejna świetna prezentacja. [Jakub](https://twitter.com/jkubrynski) opowiadał o dobrej architekturze i wzorcach, jakie powinniśmy wprowadzać by tak wysoką jakość osiągnąć. Przypomniał istotność bazowania na metrykach i danych, by móc sprawdzać czy wciąż jesteśmy na dobrej drodze. Mocno zaznaczył, że dobra architektura to architektura zmian i adaptacji - błędy będą się zdarzały, ale trzeba dbać o to, by jak najszybciej sobie z nimi radzić, a nie koncentrować się na by było ich jak najmniej. Analogicznie mówił zresztą sam Sam Newman w swojej [książce o mikroserwisach](/2018/02/02/building-microservices-sam-newman-book-review/).

Duża dawka wiedzy dla każdej z osób zajmującej się tematyką architektur systemów. Slajdy z prezentacji Kuby możecie pobrać [tutaj](https://speakerdeck.com/jkubrynski/engineering-architecture).

## Łukasz Szydło – the final frontier

> "nie róbmy komuny w kodzie" -- [@lszydlo](https://twitter.com/lszydlo?ref_src=twsrc%5Etfw) at [#boilingfrogs18](https://twitter.com/hashtag/boilingfrogs18?src=hash&ref_src=twsrc%5Etfw) 😂 [pic.twitter.com/g1jTFUCvoL](https://t.co/g1jTFUCvoL)
> 
> — Filip Sergot (@fsergot) [March 24, 2018](https://twitter.com/fsergot/status/977513204430594048?ref_src=twsrc%5Etfw)

Prezentacja [Łukasza](https://twitter.com/lszydlo) to zawsze jest dla mnie must-see i także tym razem się nie zawiodłem. Łukasz niebywale lekko opowiadał o skomplikowanych konceptach związanych z modułowością aplikacji. Głosił, że przejście z monolitu do mikrousług musi iść przez stworzenie modularnego monolitu. W przeciwnym wypadku stworzymy rozproszony monolit, który skończy się deploy'em 36 różnych aplikacji naraz. Łukasz przekazał koncept prywatnych baz danych, różnych rodzajów serwisów aplikacyjnych, sposobów na komunikację pomiędzy serwisami. Ogrom wiedzy zgromadzony w 45 minutach prezentacji. I do tego świetnie przekazany - wszystkie analogie były niezwykle celne i pomagały zrozumieć zawiłe tematy prelekcji.

## Jarosław Pałka - Sagi, strumienie, reaktywność i inne buzzwordy

Główna sala miała niebywałe szczęście do dobrych prelekcji. Dużo prelekcji w tematach sag, strumieni i reaktywności jest mocno teoretyczna, przez co nie trafia do słuchaczy. [Jarek](https://twitter.com/j_palka) opowiedział jak dzięki tym konceptom w Allegro poradzili sobie z problemem analizy zachowań użytkowników w czasie rzeczywistym. Ich mocno techniczne rozwiązanie pozwoliło rozwiązać problem biznesowy w skali rzadko w Polsce spotykanym. Ta moc nawiązania do rzeczywistego problemu pozwoliła lepiej zwizualizować koncepcje opisywane przez Jarka - jasno było widać, dlaczego te wzorce są warte zainteresowania, gdy napotykamy na podobne problemy. Jarek opowiada niesamowicie lekko, wtrącając żarty i historie wyniesione z pracy w Allegro. Polecam tego allegrowicza 😉

## Michał Gruca - Być liderem, być liderem

Konferencję zakończyłem przy prelekcji [Michała](https://twitter.com/michalgruca?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor), który wprowadził nas w świat liderowania. Sam pracowałem jako team leader, więc prelekcja była mi bardzo bliska. Widać było, że Michał ma ogromne doświadczenie w prowadzeniu zespołu, ponieważ podrzucił bardzo wiele ciekawych informacji i porad, jak sobie radzić jako lider: dlaczego warto tym liderem być, jak sobie radzić w trudnych sytuacjach, na co zwracać uwagę. Po tej prezentacji każdy będzie wiedział z czym się wiąże praca lidera i dlaczego jest ona tak ważna. Aktualnie kończę pracę nad postem z poradami dla team leadera i prezentacja Michała podrzuciła mi dużo ciekawych przykładów.

## Pozostałe prezentacje

Nie sposób każdej prelekcji opisać tak dokładnie, ale na tej konferencji było naprawdę dużo wartych polecenia:

 *   Wiktor Sztajerowski - Polyglot persistence
 *   Piotr Stawirej - Modern agile retrospectives
 *   Mateusz Budzar - Profesjonalny developer. Kto to taki?
 *   Maciej Trojniarz - Upewnij się, że dostarczasz increment, a nie ekskrement produktu.
 *   Krzysztof Rakowski - Dziel się wiedzą i buduj swoją markę: 7 kroków do skutecznego pisania

## Networking

[![](/images/2018/03/DZDYWbSWAAUrZpD.jpg "by Paweł Klimczyk | https://twitter.com/pwlklm/status/977519001185193985")](/images/2018/03/DZDYWbSWAAUrZpD.jpg)[![](/images/2018/03/DZDGVLBXUAAQLH9.jpg "by Łukasz Pyrzyk | https://twitter.com/lukaszpyrzyk/status/977499268079607809")](/images/2018/03/DZDGVLBXUAAQLH9.jpg)[![](/images/2018/03/DZFK4Y-W0AEy2YH.jpg "by Ann | https://twitter.com/annbet_/status/977644937373249536")](/images/2018/03/DZFK4Y-W0AEy2YH.jpg)

Słyszałem parę razy, że prelekcje to tylko dodatek do konferencji. Tutaj ciężko o takie stwierdzenie, ale poziom networkingu na Boiling Frogs był naprawdę wysoki. Świetnie było spotkać te wszystkie osoby, które się na codzień followuje na Twitterze i czyta ich przemyślenia. Grono osób było naprawdę szerokie - przyjechały grupy programistyczne z całej Polski, prelegenci, dużo znajomych. Każdy był otwarty na dyskusję i wymianę doświadczeń. Rozmowy na after-party ciągnęły się bardzo długo i po nagłym ataku zmiany czasu wróciliśmy do domu lekko przed 4. Masa wiedzy, dobrych praktyk, pomysłów - tego nie da żadna prezentacja oglądana online.

## Podsumowanie

Ciężko zakończyć innym stwierdzeniem niż oświadczeniem, że Boiling Frogs 2019 to jeden z najważniejszych wydarzeń, jakie nas czeka w następnym roku. Tegoroczna edycja dorównała poziomowi poprzedniej - była niesamowicie dobra, za co należą się organizatorom ogromne podziękowania. Szerzcie dalej idee **Software Craftsmanship**!

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Boiling-Frogs-2018-gotowanie-zaby-po-raz-trzeci-Radek-Maziarka-Blog "") - <time datetime="2018-03-26 21:05:25">Mar 1, 2018</time>

**Boiling Frogs 2018 – gotowanie żaby po raz trzeci | Radek Maziarka Blog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
