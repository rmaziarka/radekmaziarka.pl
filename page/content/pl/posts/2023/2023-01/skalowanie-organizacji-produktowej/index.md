title: "Skalowanie organizacji produktowej za pomocą celów"
date: 2023-01-10T09:59:30+01:00
url: '/2023/01/11/skalowanie-organizacji-produktowej-za-pomoca-celow'
images: ['2023/01/11/skalowanie-organizacji-produktowej-za-pomoca-celow/main.jpg']
description: "W jaki sposób skalować swoją organizację produktową unikając typowych 'zwinnych' podejść."
category: 'Biznes w IT'
draft: true
---

Załóżmy, że mamy organizację produktową, której się powiodło. Mamy market-fit, kasa płynie zaczynamy się skalować. Dochodzimy do 50 osób technicznych i biznesowych. Powstaje wtedy pytanie:

- Jak sobie radzić wtedy z podziałem na zespoły?
- Jak ogarnąć procesy pomiędzyzespołowe?

Wiele firm rozgląda się wtedy za jakimiś frameworkami do skalowania się. Naturalnie trafiają na [LeSS](https://less.works/less/framework), [Nexus](https://www.scrum.org/resources/scaling-scrum) czy [Scrum at Scale](https://www.scrumatscale.com/scrum-at-scale-guide-online/). Frameworki skalujące pracę zwinną.

A gdybym wam powiedział, że jest inna droga?


## Miary skalowania

Dużo organizacji wybierając frameworki do skalowania nie zadaje sobie tego pytania - jak będzie mierzyć sukces takiego wdrożenia. I jak upewnić się, że mierzymy właściwą rzecz.

Bo jeśli coś już mierzymy to mierzymy proste rzeczy - np. jak dużo user story jest dowożonych. XYZ

Ja bym zacząć od myślenia tematami bardziej produktowymi:
- Time to Market - Szybkość dowożenia danej funkcji od początku zgłoszenia
- Liczbę eksperymentów - produkty nie żyją tylko funkcjonalnościami.
- Szybkość zmian, reakcji - jak długo potrwa zanim będziemy w stanie zmienić kurs?
- Product/feature adoption rate - jak bardzo funkcje od klientów produktu są odbierane.
- Koszt zmiany - na ile łatwo jest zmieniać sposób swojej pracy, swój proces
- Spełnianie potrzeb naszego klienta - to jest chyba najtrudniejsze do mierzenia.
- Zadowolenie pracy w zespole - aby w miarę rośnięcia nie ucierpiało zadowolenie pracowników.
- Bycie atrakcyjną firmą dla pracowników
- Liczba tematów które dzieją się w zespole vs liczba tych które wychodzą poza zespół. 
- XYZ

I na tej podstawie mierzył sukces wdrożenia metody skalowania.

## Frameworki "zwinne"
//Obrazek lessa huge
Zanim przejdziemy sobie do skalowania przez cele porozmawiajmy o franeworkach zwinnych. Na ile w podejściu wielu poziomów PO będziemy w stanie zachować obecne wskaźniki np. szybkość zmian, czy spełnianie potrzeb klienta. Kiedy duży PO posiada pod sobą kilka zespołów i kilkadziesiąt osób. Na ile można realnie przetwarzać feedback od klientów przy takiej skali. 
Czy ktoś sobie wyobraża że taki moloch jest w stanie się zwinnie dostosowywać do rynku? Na ile ludzie z góry drabinki nie staną się wąskim gardłem w podejmownaiu decyzji? Jaki będzie koszt zmiany tego behemota? 

//Fibit i jego porażka z SAF:
https://www.smharter.com/blog/the-mixed-results-of-companies-scaling-agile-with-a-scaled-framework/
Wydaje się, że powyższe metody skupiają się raczej na pracy top-down, niż bottom-up, w kwestii dostosowania do potrzeb klientów. 
Większość tych frameworków za miarę sukcesu uznaje liczbę "ticketów w Jirze" jaka została przeniesiona do kolumny Done. Czy to jest miara sukcesu organizacji produktowej?

Patrząc jeszcze z innej strony. Jako organizacja produktowa, chcemy wychodzić z jak najlepszymi pomysłami rozwiązywania problemów klienta. Marty Cagan na prezentacji  [Product San Francisco](https://www.youtube.com/watch?v=9dccd8lihpQ) wspomniał, że najlepszym źródłem pomysłów są inżynierowie oraz osoby, które na codzień pracują z danymi od klientów:
> Consistently the best single source of ideas it's your engineers. It's because they're working with the technology every day and they're in the best possible position to see what's just now possible.
>
> Another favorite source of ideas for me is data in the hands of the people doing the ideation. The executives maybe you know they see date a third hand but they're not inside the data every day.

Jaką szansę ma zwykły członek zespołu, w tym wielkim molochu procesowym, na zgłoszenie i implementację swojego pomysłu?

Wydaje się, że powyższe procesy skalowania są skupione raczej na fabrykach funkcjonalności (gdzie większość wymagań przychodzi z góry) niż dla organizacji produktowych. 

## Empowered teams

// pokazanie obrazka cutlera o empowered i feature teams 
XYZ proponuje inny sposób skalowania się - przez tworzenie Empowered Teams, które mają do osiągnięcia konkretne cele organizacyjne. Zespół (ew. 2-3 zespoły) pracują, aby zrealizować konretny cel biznesowy. Jednak to jak to osiągnąć jest już w gesti zespołu - wybór rozwiązania, wdrażania oraz zbieranie feedbacku. 

Głównie dlatego, że firmy technologicznie nie starają się skalować produktu. **One tworzą wiele różnych produktów, pod wspólną egidą.**

// obrazek od Orosza

Przede wszystkim prawie żadna z nich nie korzysta z frameworków zwinnych. Za Oroszem

> My personal view is that in organizations with empowered teams, objectives and key results (OKRs), key performance indicators (KPIs) and goals are far better tools for aligning teams, than rolling out a rigid methodology like Scrum for the sake of reporting.


//
![](scaling.png)

Można to porównać do skalowania systemu wertykalnie vs. skalowania systemu horyzontalnie i shardowania. Tworząc odpowiednio duży system w pewnym momencie nie wystarczy nam monolityczny kod i baza danych. Tworzymy osobne moduły, bądź mikroserwisy i dzielimy aplikację wszerz

## Skalowanie za pomocą celów
Ok, po tym długim wstępie

- OKR i KPI na poziomie organizacji
- OKR i KPI na poziomie zespołów/produktów
- Przekładanie tego na roadmapę
- Praca nad kolejnymi funkcjami
- Szybkie dostosowywanie do rynku danego produktu


## Jak sprawić by zespoły nie poszły do nikąd
Alignment vs autonomy
- Praca w ramach dowożenia celu
- Cel jako azymut
- Możemy eksperymentować dopóki dowozimy
- Współpraca pomiędzy zespołami

https://blog.agilityscales.com/can-big-consultancies-deliver-agile-transformations-56bd3c54c87f
- What I often hear from coaches and consultants is that the most successful transformations happen bottom-up, with top-down support. Pushing change onto people in a top-down manner rarely works.


## Dlaczego to nie jest proste

### Cele w organizacji
Rozmawianie o celach jest o wiele trudniejsze, niż rozmawianie o funkcjonalnościach. Funkcjonalności są namacalne, a cele nie są.

Przez co też łatwiej jest komuś powiedzieć "dowieź X" niż "osiągnij Y". Ponieważ na osiągnięcie Y wpływa o wiele więcej rzeczy + cele bardziej eksponują to co może pójść dobrze / nie dobrze. Przez co jeśli nie osiągniemy Y to także może być nasza wina [czy na pewno?]

### Podział produktu na mniejsze

Podział produktu na mniejsze to nie jest rzecz, na którą znajdziecie od razu najlepszą odpowiedź.

Przytoczę tutaj [artykuł](https://medium.com/nick-tune-tech-strategy-blog/aligning-teams-with-business-capabilities-to-improve-flow-why-you-shouldnt-b2996b959546) Nicka Tune'a o różnych sposobach dzielenia się. Możemy podzielić się wysokopoziomowo:
- Produkt
- Segment klientów
- Rodzaj rynku
- Urządzenia, doświadczenie klienta
- Region, kraj

A następnie bardziej niskopoziomowo:
- User Journey
- Business Capabilities
- Bounded Context

### Zaufanie 

W takim modelu trzeba o wiele bardziej ufać sobie wzajemnie. Trochę tak jak z kimś kto robi wam remont - łatwo jest oddelegować malowanie ścian, trudniej wybór rozwiązań czy XYZ. 

