---
title: 'How2Product - architektura produktów cyfrowych'
url: '/2020/08/20/how2product-architektura-produktow-cyfrowych/'
date: Tue, 20 Aug 2020 14:56:35 +0000
draft: false
images: ['images/2020/08/how2product-architektura.jpg']
description: "Nagranie z webinaru How2Product o architekturze produktów cyfrowych."
category: 'Wystąpienia publiczne'
tags: ['archiktektura', 'ewolucyjna architektura', 'drivery architektoniczne']
---

Zostałem zaproszony by porozmawiać o architekturze produktów cyfrowych w ramach cyklu spotkań [How2Product](https://www.facebook.com/how2productPL). Wyszła z tego naprawdę przekrojowa rozmowa, którą możecie posłuchać na Spotify:

[![Spotify](spotify.png)](https://open.spotify.com/episode/4V4CcR6uZkLxRYzbjxjcVb?si=NrRp5Bc6QqO6zTMI3nIdrg)

Rozmawialiśmy, między innymi, tematy:
- definicje architektury
- drivery architektoniczne
- rola architekta w zespole
- ewolucyjna architektura i jak ja osiągnąć


Na prośbę prowadzących odpowiedziałem również pytania, które się pojawiły na chacie - macie je dostępne poniżej 😊

### Pytania

**Gdzie Twoim zdaniem przebiega granica między architektem a product ownerem?**

Product Owner nadaje kierunek danemu produktowi – definiuje wymagania, funkcjonalności, rozmawia z interesariuszami o ich potrzebach i problemach. Architekt przekuwa te informacje w spójną realizację produktu, która spelni opisane potrzeby.

**Kiedy z klientem powinien rozmawiać product owner, a kiedy architekt?**

Nawiązując do poprzedniej wypowiedzi – PO rozmawia badając potrzeby i problemy, a architekt klaryfikując je by na ich podstawie wypracować najlepsze rozwiązanie.

**Z jakich narzędzi korzystasz na warsztatach z klientem (zarówno on premise, jak i zdalnie)?**

W zasadzie korzystam z takich samych narzędzi, różnią się tylko formą wykorzystania – na miejscu robi się to z ścianą i karteczkami, zdalnie wykorzystuję Miro.

Narzędzia wykorzystywane opisałem w moim cyklu artykułów o narzędziach pracy architekta (https://radekmaziarka.pl/2020/02/04/narzedzia-pracy-konsultanta-podsumowanie/), bardzo dobrym zbiorem jest również DDD Starter (https://github.com/ddd-crew/ddd-starter-modelling-process)

**Czy jako PO albo architekt uważasz, że powinieneś zawsze robić "dobrą architekturę" czy jest gdzieś granica, gdzie akceptujesz wymagania pt. "klient słabo wymyślił, ale się uparł, więc niech będzie"**

Architektura powinna być dostosowana do naszych możliwości biznesowo-technicznych. Niestety, niekiedy klient może być nieprzekonany do naszej wizji, z różnych powodów. W takiej sytuacji uważam za ważne opisanie powodów podjęcia odmiennej decyzji jako konkretnego rekordu decyzji architektonicznej (ADR). Na tej podstawie możemy określić w którym momencie ponownie dokonany analizy sytuacji. Wtedy, mając więcej informacji o konsekwencjach, możemy spróbować zmienić tą decyzję.

**Czy architekt musi mieć wcześniej doświadczenie jako programista? Czy droga z analityka biznesowego z dużą wiedzą techniczną (ale właśnie bez praktycznej w programowaniu) do architekta to dobry pomysł? Jeśli tak, to jakieś wskazówki może bys miał?**

Wydaje mi się, że powinien mieć takie doświadczenie – na podstawie wiedzy o niskopoziomowej pracy systemów lepiej rozumiemy rezultaty swoich wysokopoziomowych decyzji. Bez takiego doświadczenia łatwo jest lekceważyć konsekwencje podejmowanych wyborów.

Co nieznaczy, że analityk biznesowy nie może mieć szerokiej wiedzy w konceptach architektonicznych by na ich podstawie budować potencjalne możliwości systemów. Kilku znanych mi analityków chmurowych świetnie radzi sobie z propozycjami rozwiązań mając wiedzę o ofercie chmurowej.

**Czy jest miejsce w Agile (np. Scrum) na rolę Solution Architekta? Czy tłumaczenie biznesu do zespołu i technikaliów biznesowi nie należy do PO?**

Zwinność wcale nie przekreśla planowania architektury i jej istotności. Każe się jedynie zastanowić nad tymi aspektami architektury, które muszą być określone już na początku, a tych, które możemy stopniowo określać w trakcie postępu prac.

W mojej ocenie nie wszyscy PO mają wiedzę o aspektach technicznych by móc tutaj podejmować prawidłowe decyzje. Często jednak rolę architekta w zespołach przemują bardziej doświadczeni programiści, którzy projektują takie rozwiązanie.

**W wielu firmach "Architekt" jest tylko kolejnym szczebelkiem w karierze programisty. Zakładają one, że architekt powinien być "guru" danej technologii. Czy się zgadzasz z tym podejściem? Czy raczej uważasz, że architekt wskazuje kierunek technologiczny, a już do programistów należy przełożenie tego na kod?**

Niestety, ale nie rozumiem opisanej przez Ciebie dychotomii – czym się różni „guru” danej technologii od osoby wskazującej kierunek. Architekt powinien wskazać pewien kierunek techniczny i wypracować z zespołem realizację tej koncepcji w konkretne rozwiązanie. W niektórych zespołach będzie się to równało np. z pair programmingiem z developerem by stworzyć komponent wykorzystujący serwisy chmurowe, a w innych tylko krótkim brainstormingiem by określić cele. Wszystko zalezy od umiejętności członków tego zespołu.

**Lepiej być PO czy architektem? Gdzie jest więcej "branie"?**

Nie umiem odpowiedzieć na to pytanie – staram się realizować podejście Simona Wardley’a: „I optimise my life for happiness. That's what motivates me.” (https://twitter.com/swardley/status/1293500393108967427) więc robię to w życiu co mnie uszczęśliwia, a nie to na co jest branie. 

**Kiedy warto w architekturze uwzględniać "nowinki", np. nowe frameworki, narzędzia cloudowe, a kiedy bezpiecznie skorzystać z "klasycznych" rozwiązań (web-servery, vanilla JS, etc.)?**

Odpowiednio zdefiniowane drivery architektoniczne pozwolą odpowiedzieć na to pytanie – określą:
- czy mamy przestrzeń do eksperymentów
- kim będziemy mieli je wykonać 
- jak się zachowamy gdy eksperyment się nie powiedzie

**Czy w jednym projekcie PO i architekt mogą być tą samą osobą?**

Przedefiniowałbym twoje pytanie jako „Jakie są przeciwskazania by PO i architekt byli tymi samymi osobami”. Odpowiedzią tutaj jest głównie czas – zwykle nie mamy przestrzeni na łączenie tych dwóch ról. Czasami może również być trudno znaleźć osoby na tyle kompetentne by działały naraz w tych 2 obszarach.

**Co powinniśmy wziąć pod uwagę, budując produkt, który ma być częścią większego ekosystemu?**

Najważniejszym aspektem wspólne zrozumienie kierunku w jakim ma się rozwijać dany ekosystem. Tak, by zarówno nasz produkt wpasowywał się do ekosystemu, jak i rozwijał go o kolejne funkcje.

Dodatkowo polecałbym zdefiniować odpowiednie kontrakty z pozostałymi częściami tego ekosystemu:
– za co odpowiada nasza część, za co pozostałych
- jak długo musimy dotrzymywać nasze konktrakty
- jaki jest czas utrzymywania kontraktów przez nas używanych
- jak zarządzać kontraktami by były widoczne i modyfikowalne dla zespołów 
To buduje transparencję wewnątrz ekosystemu i ułatwia wprowadzanie zmian.

**Kiedy powinniśmy rozmawiać o takich rzeczach jak ograniczenia technologiczne? Na samym początku czy pod koniec aby nie ograniczać się na początku?**

Zależy co rozumiemy przez początek i koniec. W chwili samej dyskusji o danym pomyśle najprawdopodobniej nie ma takiej potrzeby – dyskutujemy na temat potrzeb lub spójnej wizji. Ale w chwili posiadania czegoś bardziej ustrukturyzowanego dobrze jest to zderzyć z możliwościami technologicznymi by szybko dostać feedback o tym co jest realne w realizacji, a co już mniej.

**Po stronie klienta/interesariusza, czy architekt powinien koniecznie mieć kogoś technicznego do rozmowy?**

Nie wydaje mi się. Często klienci nie posiadają osób technicznych po swojej stronie i zwracają się do nas o pomoc własnie by im taką pomoc techniczną zapewnić.

**Jak wygląda praca architekta, gdy występuje on w roli zewnętrznego konsultanta?**

Zwykle skupiamy się na dobrym zrozumieniu konkretnego problemu i wypracowania struktury pewnego rozwiązania. Chcemy zmaksymalizować dany nam czas by zapewnić jak największą ilość wsparcia. Z mojej perspektywy ważnym jest znalezienie wąskiego gardła bo to ono zwykle jest podstawą występowania problemów u klienta.

Następnie, nasza aktywność zamienia się w dłuższą współpracę, albo przenosimy prace finalizaciji tego rozwiązania na inny zespół. 

**Z  twojego doświadczenia, na co powinni architekci występujący w takiej roli (zewnętrznego konsultanta) powinni zwracać szczególną uwagę?**

Uważam, że często pomijamy uwarunkowania socjotechniczne – strukturę zespołów i organizacji, role zespołowe, przepływ informacji, wykorzystywane procesy i narzędzia. To wszystko ma wpływ na wypracowywane rozwiązania, a jest trudniejsze do zdefiniowania niż aspekty czysto techniczne.

**Czy da się zaprojektować architekturę systemu, która mogłaby by się łatwo zaadaptować do zmienionej sytuacji? Może jakieś moduły plug&play?**

Myślę, że w tym temacie mogę polecić książkę Building Evolutionary Architectures (https://evolutionaryarchitecture.com/) ponieważ nie da się na to pytanie odpowiedzieć w jednym zdaniu. Ale siląc się na odpowiedź – Tak, da się 😉

**Gdzie warto szukać wiedzy na tematy związane z projektowaniem architektury systemu/pracy jako Solution Architect? Czy są jakieś miejsca w sieci/kursy/książki, które polecasz?**

- świetny kurs zrobili chłopaki z Bottegi: https://droganowoczesnegoarchitekta.pl/
- polski podcast https://patoarchitekci.io/
- polski podcast https://bettersoftwaredesign.pl/
- książki ogólnie o architekturze (np. „Just Enough Software Architecture”)
- książki opisujące wzorce architekturalne aplikacji (np. „Patterns of Enterprise Application Architecture")
- książki opisujące wzorce architekturalne systemów (np. „Cloud Native Patterns”)
- książki z obszaru Domain-Driven Design (np. „Patterns, Principles, and Practices of Domain-Driven Design”)
- książki opisujące sposoby pracy baz danych (np. „Designing Data-Intensive Applications”)

**Kogo warto śledzić na Social Media jeśli chodzi o tematykę pracy Solution Architecta?**

Polecam:
- Mariusz Gil - https://www.instagram.com/mariuszgil_dev/
- Nick Tune - https://twitter.com/ntcoding
- Ruth Malan – https://twitter.com/ruthmalan
- Simon Brown – https://twitter.com/simonbrown
- Simon Wardley - https://twitter.com/swardley
