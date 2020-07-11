---
title: '"Nic nie wiem" - czyli dlaczego warto pytać'
url: '/2017/12/14/prezentacja-nic-nie-wiem-czyli-dlaczego-warto-pytac/'
date: Thu, 14 Dec 2017 14:37:13 +0000
draft: false
images: ['images/2017/12/ask-why-1.jpg']
category: 'Różne'
tags: ['Agile', 'BDD']
---

W listopadzie wygłosiłem prezentację o tajmeniczym tytule **"Nic nie wiem"**. Opowiedziałem w niej jak ważne w procesie tworzenia oprogramowania jest zrozumienie prawdziwych potrzeb naszych klientów / pracowników / kolegów. Prawdziwych - czyli ich, a nie naszych.

Wszystko rozbija się o **[projekcję](https://pl.wikipedia.org/wiki/Projekcja_(psychologia))**. Jest to termin zaczerpnięty z psychologii opisujący mechanizmy obronne, które sprawiają że przenosimy na innych nasze poglądy / zachowania / cechy. Przyczyną jest większa dostępność własnych poglądów niż cudzych, co powoduje łatwiejsze podciąganie infomacji pod swoją kategorię.

W naszym informatycznym świecie projekcja powoduje to, że realne potrzeby klientów są nadpisywane przez nasze wyobrażenia ich potrzeb, co skutkuje błędnie podjętymi decyzjami i niepotrzebnymi funkcjami w oprogramowaniu. Ponieważ łatwiej jest nam samemu decydować o wymaganiach, to zamiast konsultować się z osobami trzecimi, bezpośrednio przenosimy na nich nasze wybory. Mówiąc prościej - nie pytamy naszych klientów jakie wymagania powinien spełniać system - **zakładamy, że powinny być takie jak nam się wydaje**.

Sam pracowałem przy wielu systemach gdzie wystąpił ten problem np.:

 *   Platforma sklepów online - wdrożenie funkcjonalności promocji, podczas gdy klienci o nią nie prosili.
 *   System do zarządzania flotą samolotów - generowanie wykresów innego typu niż pracownicy potrzebowali.
 *   System do zarządzania dostawami towarów - dokładne odwzorowanie funkcji magazynu, gdy pracownicy chcieli jedynie import z Excela i edycję wielu wierszy.
 *   Platforma abonamentów online - skupienie się na klientach biznesowych, a tak naprawdę oni sami nie byli zainteresowani współpracą.

Niestety ten ostatni przykład związany jest moim wlasnym błędem. Poświęciłem naprawdę dużo czasu i pieniędzy na stworzenie czegoś, czego finalnie nawet nie udało się testowo wdrożyć. Zamiast programować platformę mogłem zapytać się klientów końcowych o ich potrzeby i na podstawie tej wiedzy zweryfikować i odpowiednio dostosować swój pierwotny pomysł.

## Koszt błędów

Ten teoretycznie prosty mechanizm, jakim jest projekcja, ma miażdżąco duże znaczenie finansowe w przypadku tworzeniu systemów informacyjnych. [IBM](ftp://ftp.software.ibm.com/software/rational/info/do-more/RAW14109USEN.pdf) opierając się o dane [National Institute of Standards & Technology](https://www.nist.gov/sites/default/files/documents/director/planning/report02-3.pdf) przeanalizowało jakie koszty generują błędy w każdej fazie projektu. Wyniki badania przedstawia wykres poniżej:

[![](/images/2017/12/POWERPNT_2017-12-14_00-19-20.png)](/images/2017/12/POWERPNT_2017-12-14_00-19-20.png)

Widać, że koszty naprawy błędów rosną wraz z kolejnymi fazami projektu. Im wcześniej zauważymy błąd wymagań lub nieścisłość, tym większą mamy efektywność finansową naszej produkcji software’u. **Każde 1000 złotych wydane** już na początku na dogłębną analizę potrzeb naszych klientów pozwala **zaoszczędzić nawet 30 tysięcy złotych** w fazie produkcji, dzięki uniknięciu różnego rodzaju re-worków, drastycznych zmian, niepotrzebnych funcjonalności. **30x mniej kosztów **\- ogromny mnożnik.

Świetnie przedstawił ten problem Greg Young w swojej prezentacji [Stop Over-Engenering](https://www.youtube.com/watch?v=GRr4xeMn1uU) - tworząc oprogramowanie warto się skupiać na dostarczaniu go użytkownikom jak najszybciej, by walidować czy wciąż jesteśmy na dobrej drodze. Sprawdzać czy funkcje, które dodajemy do systemu, mają sens w relacji zysków do kosztów, proponować prostsze rozwiązania. Takie zachowanie stoi mocno w opozycji do sprawdzonego w naszej branży wzorca [Big Requirements Up Front](http://agilemodeling.com/essays/examiningBRUF.htm), który przeważnie kończy się ogromną ilością funkcji kompletnie nieprzydatnych lub używanych bardzo rzadko.

## Programiści

Tutaj część osób mogłaby się zapytać co my programiści możemy zaproponować analitykom czy product ownerom w tej kwestii. Odpowiem cytatem, dość popularnym w naszym środowisku:

> Weeks of programming can save you hours of planning.

Gdy rozumiemy potrzeby biznesowe klienta to już podczas planowania pracy programistycznej jesteśmy w stanie:

 *   Prawidłowo określić sensowność danej funkcji i poprawić błąd analizy biznesowej.
 *   Na podstawie wiedzy o budowie systemu zaproponować tańsze rozwiązanie problemu.
 *   Zaplanować wykonanie funkcji najprostszym sposobem i ominąć czasochłonne działania, które nie są kluczowe dla całosci.

Nikt nam nie każe być maszyną przetwarzającą wymagania, kawę i pizzę w kod - powinniśmy pytać analityków czy product ownerów w jakim celu mamy wdrażać daną funkcję, jaką wartość z tego będzie miał klient, w czym mu ona pomoże. Takie podejście sprawi, że lepiej poznamy potrzeby stojące za wymaganiami i będziemy mogli mądrzej / wydajniej przełożyć te wymagania na kod systemu.

Warto precież pamiętać, że nie tworzymy systemów by spełniać się technologicznie - tworzymy systemy by dostarczać wartość klientowi, a techniki, wzorce i architektury mają nas wspierać by szybciej i lepiej dostarczać pożądane funkcje. Sebastian Gębski na ostatnim DevConf miał świetną [prezentację](https://www.youtube.com/watch?v=fJh___1qJA8), w której powiedział:

> W naszej branży nie ma czegoś takiego jak wygrana technologiczna - można tylko wygrać biznesowo

I każda rzecz, która jest nas w stanie do tego przybliżyć jest warta uwagi. Szczególnie tak prosta jak **zadawanie pytań.**